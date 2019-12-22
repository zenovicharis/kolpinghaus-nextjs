<?php

use Phinx\Seed\AbstractSeed;

class GalleryPictures extends AbstractSeed
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
                'url'    => '/uploads/gallerypictures/pic1.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic2.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic3.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic4.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic5.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic6.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic7.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic8.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic9.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic10.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic11.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic12.jpg',
                'type'   => 'normal'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic1.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic2.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic3.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic4.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic5.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic6.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic7.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic8.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic9.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic10.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic11.jpg',
                'type'   => 'thumb'
            ),
            array(
                'url'    => '/uploads/gallerypictures/pic12.jpg',
                'type'   => 'thumb'
            )
        );

        $users = $this->table('gallery_pictures');
        $users->insert($data)
              ->save();
    }
}
