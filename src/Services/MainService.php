<?php

namespace Kolpinghaus\Services;

use PHPMailer;
use Kolpinghaus\Models\Meal;
use Kolpinghaus\Models\Food;
use Kolpinghaus\Models\MealType;
use Kolpinghaus\Models\ArbiteZeit;
use Kolpinghaus\Models\SliderPicture;
use Kolpinghaus\Models\GalleryPicture;

class MainService
{
    /** @var PHPmailer $mail**/
    private $mail;

    public function __construct(){

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

    public function getProjectPics(){
        /** @var ProjectPic $pictures **/
        $projectPics = ProjectPic::find('all');
        $pictures = [];
        foreach($projectPics as $picture){
            if($picture->type == 'normal')
            $pictures[] = $picture->serialize();
        }
        return $pictures;
    }

    public function sendMail($clientMail, $clientName, $content){
        $this->mail = new PHPMailer();
        $this->mail->SMTPDebug = 5;
        $this->mail->isSMTP();
        $this->mail->SMTPAuth = true;
        $this->mail->SMTPSecure = 'tls';
        $this->mail->Host = 'smtp.gmail.com';

        $this->mail->Username = 'zenovicharis@gmail.com';
        $this->mail->Password = 'Bostonseltiks';
        $this->mail->Port = 587;

        $this->mail->setFrom($clientMail, $clientName);
        $this->mail->addReplyTo($clientMail, $clientName);
        $this->mail->CharSet = 'UTF-8';

        $this->mail->isHTML();                                  // Set email format to HTML
        $mailContent = '<p style="text-align:center">'.htmlentities($content).'</p><br/><p> This mail has been sent from kolpinghaus.de contact form</p>';
        $this->mail->Subject = "Customers Review";
        $this->mail->Body    = $mailContent;
        $this->mail->AltBody = htmlentities($content);
        $this->mail->addAddress('zenovicharis@gmail.com', "Haris Zenovic");     // Add a recipient
        $isSent = $this->mail->Send();
         if(!$isSent) {
            return false;
         }
         return true;
    }

    public function getWorkingTimeForDay($day){
        $id = ((int)$day + 1);
        $day = ArbiteZeit::find($id);
        return $day;
    }
}