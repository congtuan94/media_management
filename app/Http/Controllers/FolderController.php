<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Carbon\Carbon;
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
            $folders = Folder::all();
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
        if (!$request->get('parent_id')) {
            $data['parent_id'] = null;
        }

        if ($request->get('parent_id')) {
            $isExisted = Folder::where([
                'parent_id' => $request->get('parent_id'),
                'name' => $request->get('name'),
            ])->exists();
        } else {
            $isExisted = Folder::where([
                'name' => $request->get('name'),
            ])->exists();
        }
        
        if ($isExisted) {
            return response()->json([
                'message' => 'Folder already exists',
                'status' => 'existed',
            ]);
            // throw new \Exception('Folder already exists', 400);
        }
        $name = $data['name'];
        Folder::create($data);
        $now = Carbon::now();
        $year = $now->year;
        $month = $now->month;
        $day = $now->day;
        logger('ddd', $data);

        $path = storage_path("app/public/images/$name");
        File::makeDirectory($path, $mode = 0777, true, true);
        return response()->json('Create Category Success!', 200);
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
        Folder::findOrFail($id)->update($data);
        return response()->json('Rename Folder Success!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Folder::findOrFail($id)->delete();
        return response()->json('Delete Folder Success!', 200);
    }
}
