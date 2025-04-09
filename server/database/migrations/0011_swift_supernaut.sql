DROP TABLE `catalogTagsLine1`;--> statement-breakpoint
DROP TABLE `catalogTagsLine1ToItems`;--> statement-breakpoint
DROP TABLE `catalogTagsLine2`;--> statement-breakpoint
DROP TABLE `catalogTagsLine2ToItems`;--> statement-breakpoint
DROP TABLE `catalogTagsLine3`;--> statement-breakpoint
DROP TABLE `catalogTagsLine3ToItems`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_reitings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_item_id` integer,
	`value` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_reitings`("id", "catalog_item_id", "value", "created_at") SELECT "id", "catalog_item_id", "value", "created_at" FROM `reitings`;--> statement-breakpoint
DROP TABLE `reitings`;--> statement-breakpoint
ALTER TABLE `__new_reitings` RENAME TO `reitings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `catalogItems` ADD `tags` text DEFAULT '[]';