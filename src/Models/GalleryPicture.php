<?php

namespace Kolpinghaus\Models;

use ActiveRecord\Model;

class GalleryPicture extends Model
{
    static $table_name = 'gallery_pictures';

    public function serializeThis(){
        return $this->to_array();
    }
}