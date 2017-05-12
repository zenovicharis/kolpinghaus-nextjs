<?php

namespace Kolpinghaus\Services;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Kolpinghaus\Libraries\ImageManipulationLibrary;

class ImageStorageService
{
    private $domain;
    private $protocol;
    private $basePath;
    /** @var  ImageManipulationLibrary $imageManipulationLibrary */
    private $imageManipulationLibrary;

    public function __construct($domain, $protocol, $basePath, $imageManipulationLibrary)
    {
        $this->domain = $domain;
        $this->protocol = $protocol;
        $this->basePath = $basePath;
        $this->imageManipulationLibrary = $imageManipulationLibrary;
    }
   
     /**
     * @param $images UploadedFile[]
     * @return array
     */
    public function storeImages($images, $folderName){
        $urls = [];
        foreach($images as $image) {
            // Compose image name
            // until I come up with algorithm that generates unique names
            $imageName = str_replace("_", " ", $image->getClientOriginalName());

            // Resize
            // $image = $this->imageManipulationLibrary->resizePostImage(file_get_contents($image->getRealPath()));

            // Store to disk
            $path = $this->storeImageContents('/uploads'.'/'.$folderName.'/'.$imageName, file_get_contents($image->getRealPath()));
            $url[] = $path;
            // Add resized image to result set
        }
        return $url;
    }

    private function storeImageContents($path, $content){
        file_put_contents($this->basePath.$path, $content);
        return $path;
    }

    public function removeContent($url){
        $deleted = unlink($this->basePath.$url);
    }
}