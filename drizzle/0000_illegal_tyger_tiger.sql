CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `food` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`price` varchar(255) NOT NULL,
	`info` varchar(255) NOT NULL,
	`subtype_id` int,
	`type_id` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `food_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `picklists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`delimeter` varchar(255) NOT NULL,
	`description` varchar(1000),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `picklists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `slides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subtitle` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `slides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `worktime` (
	`id` int AUTO_INCREMENT NOT NULL,
	`day` varchar(255) NOT NULL,
	`open` varchar(255) NOT NULL,
	`close` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `worktime_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `food` ADD CONSTRAINT `food_subtype_id_picklists_id_fk` FOREIGN KEY (`subtype_id`) REFERENCES `picklists`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `food` ADD CONSTRAINT `food_type_id_picklists_id_fk` FOREIGN KEY (`type_id`) REFERENCES `picklists`(`id`) ON DELETE no action ON UPDATE no action;