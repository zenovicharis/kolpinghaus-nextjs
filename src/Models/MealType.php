<?php

namespace Kolpinghaus\Models;

use ActiveRecord\Model;

class MealType extends Model
{
        static $has_many = [
        [   
            'food',
            'class_name' => 'Food'
        ]
    ];

    public function serialize(){
        return $this->to_array([
            'only' => ['id', 'name'],
                        'include' => [ 'food' =>
                                            ['only' =>  
                                                ['id', 'name', 'info', 'price']
                                            ]
                                    ]
                                ]);
    }
}