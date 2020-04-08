<?php

namespace Kolpinghaus;


class Configuration
{
    private $fullConfigPath;
    private $config;
    private $environment;

    public function __construct($configPath)
    {
        $this->fullConfigPath = $configPath."config.json";
        $this->config = json_decode(file_get_contents($this->fullConfigPath), true);
    }

    public function getDbConfig() {
        return $this->config['database'];
    }
    public function getPathToUpload(){
        return $this->config['path'];
    }

    public function getClient() {
        return (object)$this->config['client'];
    }

}