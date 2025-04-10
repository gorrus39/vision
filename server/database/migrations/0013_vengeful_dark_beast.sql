PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_catalogLinks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_item_id` integer,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`link` text NOT NULL,
	`src_platform` text NOT NULL,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_catalogLinks`("id", "catalog_item_id", "title", "description", "link", "src_platform") SELECT "id", "catalog_item_id", "title", "description", "link", "src_platform" FROM `catalogLinks`;--> statement-breakpoint
DROP TABLE `catalogLinks`;--> statement-breakpoint
ALTER TABLE `__new_catalogLinks` RENAME TO `catalogLinks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;