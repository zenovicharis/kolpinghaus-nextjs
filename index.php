<?php

require "vendor/autoload.php";

use Kolpinghaus\Application;
use Cicada\Routing\RouteCollection;
use Kolpinghaus\Middleware\Authentication;
use Kolpinghaus\Controllers\MainController;
use Kolpinghaus\Controllers\LogInController;
use Kolpinghaus\Controllers\AdminController;
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
$adminController = new AdminController($app['adminService']);
$logInController = new LogInController($app['twig'], $app['mainService'], $app['logInService']);
// /** @var RouteCollection $adminCollection */
// $logInCollection = $app['collection_factory'];
// $logInCollection->after([Authentication::class,'authenticate']);

//Log In Controller routes
$app->get('/login',                     [$logInController, 'logIn']);
// $app->get('/pannel',                    [$logInController, 'pannel']);
$app->post('/login',                    [$logInController, 'checkCredentials']);

//Main Controller routes
$app->get('/',                          [ $mainController, 'index']);
$app->get('/impressum',                 [ $mainController, 'impressum']);
$app->get('/call',                      [ $mainController, 'call']);
$app->get('/projects',                  [ $mainController, 'projects']);
$app->post('/mail',                     [ $mainController, 'sendMail']);

// //Admin Controller routes
$app->post('/gallery/upload/',                  [$adminController, 'uploadPictures']);
$app->post('/gallery/delete/{pictureId}',       [$adminController, 'deletePicture']);
$app->post('/slider/upload/',                   [$adminController, 'uploadSliderPic']);
$app->post('/slider/delete/',                   [$adminController, 'unlinkSliderPic']);
$app->post('/slider/create/',                   [$adminController, 'createSlider']);
$app->post('/slider/delete/{sliderId}',         [$adminController, 'deleteSlide']);
$app->post('/slider/update/{sliderId}',         [$adminController, 'updateSlide']);
$app->post('/food/create/',                     [$adminController, 'createNewFood']);
$app->post('/food/edit/{foodId}',               [$adminController, 'editFood']);
$app->post('/food/delete/{foodId}',              [$adminController, 'deleteFood']);

// $app->addRouteCollection($logInCollection);

$app->exception(function(Exception $e, Request $request) {
    print_r($e->getMessage());
    throw $e;
});


$app->run();
