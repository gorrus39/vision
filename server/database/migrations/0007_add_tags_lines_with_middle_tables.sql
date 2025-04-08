CREATE TABLE `catalogRewardsToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_reward_id` integer,
	`catalog_item_id` integer,
	FOREIGN KEY (`catalog_reward_id`) REFERENCES `rewards`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `catalogTagsLine1` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogTagsLine1ToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_tags_line_1_id` integer,
	`catalog_item_id` integer,
	FOREIGN KEY (`catalog_tags_line_1_id`) REFERENCES `catalogTagsLine1`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `catalogTagsLine2` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogTagsLine2ToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_tags_line_2_id` integer,
	`catalog_item_id` integer,
	FOREIGN KEY (`catalog_tags_line_2_id`) REFERENCES `catalogTagsLine2`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `catalogTagsLine3` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `catalogTagsLine3ToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_tags_line_3_id` integer,
	`catalog_item_id` integer,
	FOREIGN KEY (`catalog_tags_line_3_id`) REFERENCES `catalogTagsLine3`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
