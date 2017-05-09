<?php

use Phinx\Seed\AbstractSeed;

class ScheduleSeeder extends AbstractSeed
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
                'time'    => '17:00 - 22:00',
                'day'   => 'Montag'
            ),
            array(
                'time'    => 'Ruhetag',
                'day'   => 'Dienstag'
            ),
            array(
                'time'    => '17:00 - 23:00',
                'day'   => 'Mittwoch'
            ),
            array(
                'time'    => '17:00 - 23:00',
                'day'   => 'Donnerstag'
            ),
            array(
                'time'    => '17:00 - 23:00',
                'day'   => 'Freitag'
            ),
            array(
                'time'    => '17:00 - 23:00',
                'day'   => 'Samstag'
            ),
            array(
                'time'    => '11:30 - 14:30 &nbsp; 17:00 - 22:00',
                'day'   => 'Sonntag'
            )
        );

        $schedule = $this->table('arbite_zeit');
        $schedule->insert($data)
              ->save();
    }
}
