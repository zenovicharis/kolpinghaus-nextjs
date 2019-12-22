<?php

namespace Kolpinghaus\Models;

use ActiveRecord\Model;

class Food extends Model
{
    static $table_name = 'food';
    static $belongs_to = array(
        [
            'meal_types',
            'class_name' => 'MealType'
        ]
    );

    public function serialize(){
        return $this->to_array();
    } 
}