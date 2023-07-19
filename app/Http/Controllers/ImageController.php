<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\ImageResource;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id)
    {
        $searchValue = $request->query('search');

        if ($searchValue) {
            $images = Image::where('folder_id', $id)->where('name', 'like', '%' . $searchValue . '%')->get();
        } else {
            $images = Image::with('folder')->where('folder_id', $id)->get();
            // 10
            $data = ImageResource::collection($images);
            logger('IMAGWE', [$data]);
            return $data;
        }
        return response()->json($images);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $data = $request->all();
        $data['folder_id'] = $id;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            if ($file->isValid()) {
                $filenameWithExt = $request->file('file')->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('file')->getClientOriginalExtension();
                $fileNameToStore = $filename . '_' . time() . '.' . $extension;
                $path = $request->file('file')->storeAs('public/images', $fileNameToStore);
                logger($path);
                $data['name'] = $fileNameToStore;

                Image::create($data);
            }
        }
        return response()->json([
            'message' => 'Create Image Success!',
            'url' => asset('storage/images/' . $fileNameToStore),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image, $imageName)
    {
        $path = storage_path('app/public/images/' . $imageName);

        if (!Image::exists($path)) {
            abort(404);
        }

        $file = Image::get($path);
        $type = Image::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        $folders = Folder::all();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $image = Image::findOrFail($id);
        $data = $request->all();

        if ($request->image != null) {
            if ($request->hasFile('image')) {
                $filenameWithExt = $request->file('image')->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('image')->getClientOriginalExtension();
                $fileNameToStore = $filename . '_' . time() . '.' . $extension;
                $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
                $data['image'] = $fileNameToStore;
            }
            if ($image->image != null) {
                unlink(storage_path('app/public/images/' . $image->image));
            }
        } else {
            $data['image'] = $image->image;
        }
        $image->update($data);
        return response()->json('Update Image Success!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $delete = Image::findOrFail($id)->delete();
        return response()->json('Delete Folder Success!', 200);
    }
}
