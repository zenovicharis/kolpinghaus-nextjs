CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);

CREATE TABLE `food` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`price` varchar(255) NOT NULL,
	`info` varchar(255) NOT NULL,
	`subtype_id` int,
	`type_id` int,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `food_id` PRIMARY KEY(`id`)
);

CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);

CREATE TABLE `picklists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`delimeter` varchar(255) NOT NULL,
	`description` varchar(1000),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `picklists_id` PRIMARY KEY(`id`)
);

CREATE TABLE `slides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subtitle` varchar(255),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `slides_id` PRIMARY KEY(`id`)
);

CREATE TABLE `worktime` (
	`id` int AUTO_INCREMENT NOT NULL,
	`day` varchar(255) NOT NULL,
	`open` time NOT NULL,
	`close` time NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `worktime_id` PRIMARY KEY(`id`)
);

ALTER TABLE `food` ADD CONSTRAINT `food_subtype_id_picklists_id_fk` FOREIGN KEY (`subtype_id`) REFERENCES `picklists`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `food` ADD CONSTRAINT `food_type_id_picklists_id_fk` FOREIGN KEY (`type_id`) REFERENCES `picklists`(`id`) ON DELETE no action ON UPDATE no action;