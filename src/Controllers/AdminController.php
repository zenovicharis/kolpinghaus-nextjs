<?php

namespace Kolpinghaus\Controllers;

use Kolpinghaus\Application;
use Kolpinghaus\Services\AdminService;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AdminController
{
    /** @var AdminService $adminService **/
    private $adminService;

    public function __construct($adminService){
        $this->adminService = $adminService;
    }
    public function uploadPictures(Application $app, Request $request){
        $images = $request->files->all();
        $images = $this->adminService->storeGalleryPictures($images);
        $imagesSerialized = [];
        foreach($images as $image){
            $imagesSerialized[] = $image->serializeThis(); 
        }
        return new JsonResponse($imagesSerialized);
    }

    public function deletePicture(Application $app, Request $request, $pictureId){
        $this->adminService->deleteGalleryPicture($pictureId);
    }

    public function uploadSliderPic(Application $app, Request $request){
        $images = $request->files->all();
        $urls = $this->adminService->storeSliderImage($images);
        return new JsonResponse($urls[0]);
    }

    public function unlinkSliderPic(Application $app, Request $request){
        $url = $request->request->get('url');
        var_dump($url);die();
    }

    public function createSlider(Application $app, Request $request){
        $title = $request->request->get('title');
        $about = $request->request->get('about');
        $url = $request->request->get('url');

        $slide = $this->adminService->storeSlider($title, $about, $url);
        return new JsonResponse($slide);
    }

    public function deleteSlide(Application $app, Request $request, $sliderId){
        $this->adminService->deleteSlide($sliderId);
    }

    public function updateSlide(Application $app, Request $request, $sliderId){

        $title = $request->request->get('title');
        $about = $request->request->get('about');
        $this->adminService->updateSlide($sliderId, $title, $about);
    }

    public function createNewFood(Application $app, Request $request){
        $name = $request->request->get('name');
        $info = $request->request->get('info');
        $price = $request->request->get('price');
        $mealTypeId = $request->request->get('meal_type_id');
        $food = $this->adminService->createFood($name, $info, $price, $mealTypeId);

        return new JsonResponse($food);
    }

    public function editFood(Application $app, Request $request, $foodId){
        $name = $request->request->get('name');
        $info = $request->request->get('info');
        $price = $request->request->get('price');

        $this->adminService->editFood($foodId, $name, $info, $price);

    }

    public function deleteFood(Application $app, Request $request, $foodId){
        $this->adminService->deleteFood($foodId);
    }
}