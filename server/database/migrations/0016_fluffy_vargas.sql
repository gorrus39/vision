PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_catalogItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`brief` text DEFAULT '{}' NOT NULL,
	`description_short` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_catalogItems`("id", "title", "tags", "brief", "description_short") SELECT "id", "title", "tags", "brief", "description_short" FROM `catalogItems`;--> statement-breakpoint
DROP TABLE `catalogItems`;--> statement-breakpoint
ALTER TABLE `__new_catalogItems` RENAME TO `catalogItems`;--> statement-breakpoint
PRAGMA foreign_keys=ON;