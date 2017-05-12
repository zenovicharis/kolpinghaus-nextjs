<?php

namespace Kolpinghaus\Controllers;

use Kolpinghaus\Application;
use Kolpinghaus\Services\MainService;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class MainController
{
    /** @var \Twig_Environment $twig */
    private $twig;
    private $mainService;

    public function __construct($twigEnv, $mainService)
    {
        $this->twig = $twigEnv;
        $this->mainService = $mainService;
    }

    public function index(){
        $workingTime = $this->mainService->getWorkingTimeForDay(date('w'));
        $time = $workingTime->time;
        $pictures = $this->mainService->getSliderPictures();
        $galleryPictures = $this->mainService->getGalleryPictures();
        $meals = $this->mainService->getFoodFromDb();
        return $this->twig->render('index.twig', 
                                ['page' => 'index',
                                 'pictures' => $pictures,
                                 'galleryPictures' => $galleryPictures,
                                 'meals' =>  $meals,
                                 'workingTime' => $time,
                                 'time' => $workingTime]);
    }

    public function impressum(){
        $workingTime = $this->mainService->getWorkingTimeForDay(date('w'));
        return $this->twig->render('impressum.twig', [ 'page' => 'impressum', 'workingTime' => $workingTime]);
    }

    public function call(){
        $data = json_decode(file_get_contents('/uploads/data.json',true));
        $this->mainService->setJsonToDb($data);
    }
    public function sendMail(Application $app, Request $request){
        $content = $request->request->get('content');
        $clientMail = $request->request->get('mail');
        $clientName = $request->request->get('name');
        
        $isSent = $this->mainService->sendMail($clientMail, $clientName, $content);

        return new Response($isSent);
     }
}