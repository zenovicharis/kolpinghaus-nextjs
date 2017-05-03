<?php

namespace Kolpinghaus\Services;

use PHPMailer;
use Kolpinghaus\Models\SliderPicture;
use Kolpinghaus\Models\GalleryPicture;
use Kolpinghaus\Models\MealType;
use Kolpinghaus\Models\Meal;
use Kolpinghaus\Models\Food;


class MainService
{
    /** @var PHPmailer $mail**/
    private $mail;

    public function __construct(){
        // $this->mail = new PHPMailer(true);
        // $this->mail->SMTPDebug = 5;
        // $this->mail->Host = 'smtp.gmail.com';
        // $this->mail->SMTPAuth = true;
        // $this->mail->Username = 'contactformhcg@gmail.com';
        // $this->mail->Password = '';
        // $this->mail->SMTPSecure = 'tls';
        // $this->mail->Port = 587;
    }

    public function getSliderPictures(){
        /** @var SliderPicture[] $pictures **/
        $pictures = SliderPicture::all();

        return $pictures;
    }

    public function getGalleryPictures(){
        /** @var GalleryPicture[] $pictures **/
        $pictures = GalleryPicture::all();

        return $pictures;
    }

    public function getFoodFromDb(){
        $meals = Meal::find('all', ['include' => ['meal_types' => ['include' => 'food']]]);
        $serializedMeals = [];
        foreach($meals as $meal){
            $serializedMeals[] = $meal->serializeThis();
        }
        return $serializedMeals;
    }

    public function setJsonToDb($array){
        foreach($array as  $meal){
           $mealReal = Meal::create(['name' => $meal->name]);
            foreach($meal->types as $mealType){
                $mType = MealType::create(['name' => $mealType->name,
                                'meal_id' => $mealReal->id]);

                foreach($mealType->list as $food){  
                    $info = property_exists ( $food , "info" ) ? $food->info : " ";  
                    Food::create(['name' => $food->name,
                                'info' => $info,
                                'price' => floatval($food->price),
                                'meal_type_id' => $mType->id ]);
                }
            }

        }
    }

    // public function getProjectPics(){
    //     /** @var ProjectPic $pictures **/
    //     $projectPics = ProjectPic::find('all');
    //     $pictures = [];
    //     foreach($projectPics as $picture){
    //         if($picture->type == 'normal')
    //         $pictures[] = $picture->serialize();
    //     }
    //     return $pictures;
    // }

    // public function sendMail($clientMail, $clientName, $subject, $content){
    //     $this->mail->setFrom($clientMail, $clientName);
    //     $this->mail->addAddress('zenovicharis@live.com');     // Add a recipient
    //     $this->mail->addReplyTo($clientMail, $clientName);
    //     $this->mail->CharSet = 'UTF-8';

    //     $this->mail->isHTML(true);                                  // Set email format to HTML
    //     $mailContent = '<p style="text-align:center">'.htmlentities($content).'</p><br/><p> This mail has been sent from hcg.rs contact form</p>';
    //     $this->mail->Subject = $subject;
    //     $this->mail->Body    = $mailContent;
    //     $this->mail->AltBody = htmlentities($content);
        

    //      if(!$this->mail->Send()) {
    //          var_dump($this->mail->ErrorInfo);die();
    //         return false;
    //      }
    //      return true;
    // }
}