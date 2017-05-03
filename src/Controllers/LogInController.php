<?php

namespace Kolpinghaus\Controllers;

use Kolpinghaus\Application;
use Kolpinghaus\Services\MainService;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;

class LogInController
{
    /** @var \Twig_Environment $twig */
    private $twig;

    /** @var MainService $mainService */
    private $mainService;
    // /** @var LogInService $logInService */
    // private $logInService;

    public function __construct($twig, $mainService)
    {
        $this->twig = $twig;
        $this->mainService = $mainService;
    }

    public function logIn(){
        return $this->twig->render('login.twig', ['page' => 'login']);
    }

    public function pannel(){
        $sliderPictures = $this->mainService->getSliderPictures();
        $galleryPictures = $this->mainService->getGalleryPictures();
        $meals = $this->mainService->getFoodFromDb();

        return $this->twig->render('admin-pannel.twig', ['page' => 'admin-pannel', 
                                                         'meals'=> $meals,
                                                         'galleryPictures' => $galleryPictures,
                                                         'sliderPictures' => $sliderPictures]);
    }

    public function checkCredentials(Application $app, Request $request){
        $username = $request->request->get('username');
        $password = $request->request->get('password');
        
        $user = $this->logInService->validateCredentials($username, $password);
        
        if(!empty($user)){
            $projects = $this->logInService->getProjects();
            /** @var $session Session **/
            $session = new Session();
            $session->start();
            $session->set('user',$user);
            $session->save();
            return $this->twig->render('admin-pannel.twig', ['page' => 'admin-pannel', 'projects' => $projects]);
        }

        return $this->twig->render('log-in.twig', ['page' => 'login']);
    }
}