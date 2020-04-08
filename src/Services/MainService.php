<?php

namespace Kolpinghaus\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;
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

    public function sendMail($clientMail, $clientName, $content, $client) {

        try {
            $this->mail = new PHPMailer(true);
            $this->mail->SMTPDebug = 1;
            $this->mail->isSMTP();
            $this->mail->SMTPAuth = true;
            $this->mail->SMTPSecure = 'ssl';
            $this->mail->Host = 'smtp.gmail.com';

            $this->mail->Username = $client->address;
            $this->mail->Password = $client->password;
            $this->mail->Port = 465;
            $this->mail->setFrom($clientMail, $clientName);
            $this->mail->addReplyTo($clientMail, $clientName);
            $this->mail->CharSet = 'UTF-8';
            $this->mail->isHTML();                                  // Set email format to HTML
            $mailContent = $this->generateContent($clientName, $clientName, $content);
            $this->mail->Subject = "Mail von der Website";
            $this->mail->Body    = $mailContent;
            $this->mail->AltBody = htmlentities($content);
            $this->mail->addAddress($client->reciever, $client->recieverName);     // Add a recipient

            return $this->mail->send();
        } catch (MailException $e) {
            return false;
        }
    }

    public function getWorkingTimeForDay($day){
        $id = ((int)$day + 1);
        $day = ArbiteZeit::find($id);
        return $day;
    }

    public function generateContent ($name, $email, $content) {
        return "
            <div>
                <p><strong>Name</strong>: ".(empty($name) ? 'Nije Popunjeno' : filter_var($name, FILTER_SANITIZE_STRING))."</p>
                <p><strong>E-Mail</strong>: ".(empty($email) ? 'Nije Popunjeno' : filter_var($email, FILTER_SANITIZE_STRING))."</p>
                <hr>	
                <p>
                ".filter_var($content, FILTER_SANITIZE_STRING)."
                </p>
                <hr>
                <small>Von der Website gesendete E-Mail https://www.restaurant-im-kolpinghaus.de</small>
            </div>";
    }
}