<?php
namespace Kolpinghaus\Libraries;


use \Eventviva\ImageResize;

class ImageManipulationLibrary
{
    public function __construct()
    {

    }

    public function resize($binaryContents){
        $image = ImageResize::createFromString($binaryContents);
        $image->resizeToWidth(200);
        $resizedBinaryContents = $image->getImageAsString();
        return $resizedBinaryContents;
    }

    public function resizeImage($binaryContents, $width, $height){
        $image = ImageResize::createFromString($binaryContents);
        $image->crop($width, $height);
        $resizedBinaryContents = $image->getImageAsString();
        return $resizedBinaryContents;
    }
}