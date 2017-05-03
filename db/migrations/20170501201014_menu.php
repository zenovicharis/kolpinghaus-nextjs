<?php

use Phinx\Migration\AbstractMigration;

class Menu extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $table = $this->table('meals');
        $table->addColumn('name', 'text')
            ->create();

        $tableTypes = $this->table('meal_types');
        $tableTypes->addColumn('name', 'text')
            ->addColumn('meal_id', 'integer')
            ->addForeignKey('meal_id', 'meals', 'id', array('delete'=> 'NO_ACTION', 'update'=> 'NO_ACTION'))
            ->create();

        $tableTish = $this->table('food');
        $tableTish->addColumn('name', 'text')
            ->addColumn('price', 'decimal', ['precision' => 10, 'scale' => 2])
            ->addColumn('info', 'string', ['length' => 255, 'null' => true] )
            ->addColumn('meal_type_id', 'integer')
            ->addForeignKey('meal_type_id', 'meal_types', 'id', array('delete'=> 'NO_ACTION', 'update'=> 'NO_ACTION'))
            ->create();
    }
}
