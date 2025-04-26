PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_slugAssets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text DEFAULT '' NOT NULL,
	`title` text,
	`img_path` text,
	`text_content` text
);
--> statement-breakpoint
INSERT INTO `__new_slugAssets`("id", "slug", "title", "img_path", "text_content") SELECT "id", "slug", "title", "img_path", "text_content" FROM `slugAssets`;--> statement-breakpoint
DROP TABLE `slugAssets`;--> statement-breakpoint
ALTER TABLE `__new_slugAssets` RENAME TO `slugAssets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;