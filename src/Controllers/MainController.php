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
        $pictures = $this->mainService->getSliderPictures();
        $galleryPictures = $this->mainService->getGalleryPictures();
        $meals = $this->mainService->getFoodFromDb();
        return $this->twig->render('index.twig', ['page' => 'index', 'pictures' => $pictures, 'galleryPictures' => $galleryPictures, 'meals' =>  $meals]);
    }
    public function call(){
        $data = json_decode(file_get_contents('/uploads/data.json',true));
        $this->mainService->setJsonToDb($data);
    }

    public function projects(){
        // $projects = $this->mainService->getProjects();
        return $this->twig->render('projects.twig',['page' => 'projects']);
    }

    public function sendMail(Application $app, Request $request){
        $subject = $request->request->get('subject');
        $content = $request->request->get('content');
        $clientMail = $request->request->get('senderEmail');
        $clientName = $request->request->get('name');
        
        // $isSent = $this->mainService->sendMail($clientMail, $clientName, $subject, $content);

        return ($isSent) ? "Thank you for contacting us will responed to you as soon as possible" : "Sorry we are having some issues with network please try again "; 
    }
}