<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Models\Folder;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchValue = $request->query('search');

        if ($searchValue) {
            $folders = Folder::where('name', 'like', '%' . $searchValue . '%')->get();
        } else {
            $images = Image::with('folder')->where('folder_id', null)->get();
            $data = ImageResource::collection($images);
            $folders = Folder::where('parent_id', null)->get();

            return response()->json([
                'folders' => $folders,
                'images' => $images,
            ]);
        }

        return response()->json($folders);
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
    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->get('parent_id')) {
            $isExisted = Folder::where([
                'parent_id' => $request->get('parent_id'),
                'name' => $request->get('name'),
            ])->exists();
        } else {
            $isExisted = Folder::where([
                'name' => $request->get('name'),
            ])->exists();
            $data['parent_id'] = null;
        }

        if ($isExisted) {
            return response()->json([
                'message' => 'Folder already exists',
                'status' => 400,
            ]);
            // throw new \Exception('Folder already exists', 400);
        }

        $name = $data['name'];
        Folder::create($data);

        $parentId = $request->get('parent_id');
        $folderId = Folder::find($parentId);

        if ($parentId) {
            $path = storage_path("app/public/images/$folderId->name/$name");
        } else {
            $path = storage_path("app/public/images/$name");
        }

        File::makeDirectory($path, $mode = 0777, true, true);
        return response()->json([
            'message' => 'Create Folder Success!',
            'status' => 200,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $folder = Folder::findOrFail($id);
        $folder->update($data);

        // $oldPath = storage_path("app/public/images/$folder->name");
        // $newPath = storage_path("app/public/images/$request->name");
        // File::moveDirectory($oldPath, $newPath, $mode = 0777, true, true);

        return response()->json([
            'message' => 'Update Folder Success!',
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $folder = Folder::findOrFail($id);
        $folder->delete();
        $path = storage_path("app/public/images/$folder->name");
        File::deleteDirectory($path);
        return response()->json([
            'message' => 'Delete Folder Success!',
            'status' => 200,
        ]);
    }
}
