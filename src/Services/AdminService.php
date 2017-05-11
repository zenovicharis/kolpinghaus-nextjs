<?php

namespace Kolpinghaus\Services;

use Kolpinghaus\Models\Meal;
use Kolpinghaus\Models\Food;
use Kolpinghaus\Models\MealType;
use Kolpinghaus\Models\SliderPicture;
use Kolpinghaus\Models\GalleryPicture;

class AdminService
{
    public $imageStorageService;

    public function __construct($imageStorageService)
    {
        $this->imageStorageService = $imageStorageService; 
    }

    public function storeGalleryPictures( $images ){
        $urls = $this->imageStorageService->storeImages($images,'gallerypictures');
        $images = [];
        foreach($urls as $url){
            $images[] = GalleryPicture::create(['url'=> $url,
                                                'type'=> 'normal']);
        }
        return $images;
    }

    public function deleteGalleryPicture($id){
        /** @var GalleryPicture $picture **/
        $picture = GalleryPicture::find($id);
        $this->imageStorageService->removeContent($picture->url);
        $picture->delete();
    }

    public function storeSliderImage($images){
        $urls = $this->imageStorageService->storeImages($images, 'sliderpictures');
        return $urls;
    }

    public function storeSlider($title, $about, $url){
        $slide = SliderPicture::create([
            'url' => $url,
            'title' => $title,
            'about' => $about
        ]);

        return $slide->to_array();
    }

    public function deleteSlide($id){
        $slide = SliderPicture::find($id);
        $this->imageStorageService->removeContent($slide->url);
        $slide->delete();
    }

    public function cancelImageUpload($images){
        foreach($images as $image){
            $img = json_decode($image);
            $this->deletePicture($img->id);
        }
    }

    public function updateAboutSection($id, $text){
        $project = Project::find($id);
        $project->about = $text;
        $project->save();
    }

    public function createNewProject($title, $about){
        $project = Project::create(['title' => $title, 'about' => $about]);
        
        return $project->serialize();
    }

    public function deleteProject($projectId){
        $project = Project::find($projectId);
        // ProjectPic::find('')
        $project->delete();
    }

    public function updateSlide($id, $title, $about){
        $slider = SliderPicture::find($id);
        $slider->title = $title;
        $slider->about = $about;
        $slider->save();
    }

    public function createFood($name, $info, $price, $mealTypeId){
        $food = Food::create([
            'name' => $name,
            'info' => $info,
            'price'=> $price,
            'meal_type_id' => $mealTypeId
        ]);

        return $food->to_array();
    }

    public function editFood($id, $name, $info, $price){
        $food = Food::find($id);
        $food->name = $name;
        $food->info = $info;
        $food->price = (int)$price;

        $food->save();
    }

    public function deleteFood($id){
        $food = Food::find($id);
        $food->delete();
    }
}