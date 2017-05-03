<?php

namespace Kolpinghaus\Models;

use ActiveRecord\Model;

class Meal extends Model
{
    static $has_many = [
        [   
            'meal_types',
            'class_name' => 'MealType'
        ]
    ];

    public function serializeThis(){
        return $this->to_array([
            'only' => ['id', 'name'],
            'include' => [ 'meal_types' =>
                                ['only' =>  
                                    ['id', 'name'], 'include' => ['food' => ['only' => ['name', 'info', 'price']]]
                                ]
                        ]]);
    }
}