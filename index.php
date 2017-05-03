<?php

require "vendor/autoload.php";

use Kolpinghaus\Application;
use Cicada\Routing\RouteCollection;
use Kolpinghaus\Middleware\Authentication;
use Kolpinghaus\Controllers\MainController;
use Kolpinghaus\Controllers\LogInController;
// use Kolpinghaus\Controllers\AdminController;
use Symfony\Component\HttpFoundation\Request;

function getProtocol()
{
    $isSecure = false;
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
        $isSecure = true;
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' || !empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on') {
        $isSecure = true;
    }
    return $isSecure ? 'https' : 'http';
}
// $app = new Application($_SERVER['HOME'], 'main', getProtocol().'://'.$_SERVER['HTTP_HOST'])
$app = new Application($_SERVER['HOME'], $_SERVER['HTTP_HOST'], getProtocol().'://');

// Controllers
$mainController = new MainController($app['twig'], $app['mainService']);

$logInController = new LogInController($app['twig'], $app['mainService']);
// /** @var RouteCollection $adminCollection */
// $logInCollection = $app['collection_factory'];
// $logInCollection->after([Authentication::class,'authenticate']);

//Log In Controller routes
$app->get('/login',         [$logInController, 'logIn']);
$app->get('/pannel',         [$logInController, 'pannel']);
// $logInCollection->post('/login',        [LogInController::class, 'checkCredentials']);

//Main Controller routes
$app->get('/',                          [ $mainController, 'index']);
$app->get('/call',                      [ $mainController, 'call']);
$app->get('/projects',                  [ $mainController, 'projects']);
$app->post('/mail',                     [ $mainController, 'sendMail']);

// //Admin Controller routes
// $app->post('/upload/{projectId}',       [AdminController::class, 'uploadPictures']);
// $app->post('/delete/{pictureId}',       [AdminController::class, 'deletePicture']);
// $app->post('/cancel',                   [AdminController::class, 'cancelUploads']);
// $app->post('/update-about/{projectId}', [AdminController::class, 'updateProjectAbout']);
// $app->post('/project',                  [AdminController::class, 'createProject']);
// $app->post('/project/{projectId}',      [AdminController::class, 'deleteProject']);

// $app->addRouteCollection($logInCollection);

$app->exception(function(Exception $e, Request $request) {
    print_r($e->getMessage());
    throw $e;
});


$app->run();