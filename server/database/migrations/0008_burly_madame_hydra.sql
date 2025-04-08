ALTER TABLE `catalogItems` RENAME COLUMN "name" TO "title";--> statement-breakpoint
CREATE TABLE `catalogLinks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_item_id` integer,
	`img_path` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`link` text NOT NULL,
	`src_platform` text,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reitings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_item_id` integer,
	`value` integer,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
