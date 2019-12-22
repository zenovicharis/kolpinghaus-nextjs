<?php

namespace Kolpinghaus\Services;

use Kolpinghaus\Models\User;
use Symfony\Component\HttpFoundation\Session\Session;

class LogInService
{
    public function __construct()
    {
    }
    public function validateCredentials($username, $password){
        $user = User::find('all', ['conditions' => ['username LIKE ? AND password_salt LIKE ?', $username, $password ]]);
        return $user;
    }

}