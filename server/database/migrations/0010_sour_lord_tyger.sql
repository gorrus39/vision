PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_catalogAdminsToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_admin_id` integer NOT NULL,
	`catalog_item_id` integer NOT NULL,
	FOREIGN KEY (`catalog_admin_id`) REFERENCES `catalogAdmins`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_catalogAdminsToItems`("id", "catalog_admin_id", "catalog_item_id") SELECT "id", "catalog_admin_id", "catalog_item_id" FROM `catalogAdminsToItems`;--> statement-breakpoint
DROP TABLE `catalogAdminsToItems`;--> statement-breakpoint
ALTER TABLE `__new_catalogAdminsToItems` RENAME TO `catalogAdminsToItems`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_reitings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_item_id` integer NOT NULL,
	`value` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reitings`("id", "catalog_item_id", "value", "created_at") SELECT "id", "catalog_item_id", "value", "created_at" FROM `reitings`;--> statement-breakpoint
DROP TABLE `reitings`;--> statement-breakpoint
ALTER TABLE `__new_reitings` RENAME TO `reitings`;