ALTER TABLE `faq_images` RENAME TO `images`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`refer_id` integer,
	`refer_type` text DEFAULT '' NOT NULL,
	`path` text DEFAULT '' NOT NULL,
	`is_title` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_images`("id", "refer_id", "refer_type", "path", "is_title") SELECT "id", "refer_id", "refer_type", "path", "is_title" FROM `images`;--> statement-breakpoint
DROP TABLE `images`;--> statement-breakpoint
ALTER TABLE `__new_images` RENAME TO `images`;--> statement-breakpoint
PRAGMA foreign_keys=ON;