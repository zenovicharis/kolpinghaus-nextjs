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

    public function resizeImage($binaryContents){
        $image = ImageResize::createFromString($binaryContents);
        $image->resizeToBestFit(300, 200);
        $resizedBinaryContents = $image->getImageAsString();
        return $resizedBinaryContents;
    }
}