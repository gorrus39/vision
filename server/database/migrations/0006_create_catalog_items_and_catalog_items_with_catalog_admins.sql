CREATE TABLE `catalogAdminsToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_admin_id` integer,
	`catalog_item_id` integer,
	FOREIGN KEY (`catalog_admin_id`) REFERENCES `catalogAdmins`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `catalogItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
