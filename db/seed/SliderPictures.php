<?php

use Phinx\Seed\AbstractSeed;

class SliderPictures extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $data = array(
            array(
                'url'    => '/uploads/sliderpictures/slide1.png',
                'title' => 'Genießen Sie in unserer einzigartigen Rezepte',
                'about'    => 'Spüren Sie den echten Geschmack des Balkans',
            ),
            array(
                'url'    => '/uploads/sliderpictures/slide3.png',
                'title' => 'Immer Frisch',
                'about'    => 'Genießen Sie unser Essen hergestellt aus immer mit frischem',
            ),
            array(
                'url'    => '/uploads/sliderpictures/slide2.png',
                'title' => 'Herzlich Willkommen',
                'about'    => 'Begleiten Sie uns in den besten balkan und internationale Küche genießen',
            )
        );

        $users = $this->table('slider_pictures');
        $users->insert($data)
              ->save();
    }
}
