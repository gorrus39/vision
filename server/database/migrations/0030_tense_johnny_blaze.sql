CREATE TABLE `slug_assets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text DEFAULT '' NOT NULL,
	`title` text,
	`text_content` text
);
--> statement-breakpoint
DROP TABLE `slugAssets`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`published_at` integer NOT NULL,
	`category` text DEFAULT 'Uncategorized' NOT NULL,
	`title` text NOT NULL,
	`sub_title` text DEFAULT '' NOT NULL,
	`text` text NOT NULL,
	`order_index` integer NOT NULL,
	`priority` text NOT NULL,
	`lang` text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_blog_items`("id", "published_at", "category", "title", "sub_title", "text", "order_index", "priority", "lang") SELECT "id", "published_at", "category", "title", "sub_title", "text", "order_index", "priority", "lang" FROM `blog_items`;--> statement-breakpoint
DROP TABLE `blog_items`;--> statement-breakpoint
ALTER TABLE `__new_blog_items` RENAME TO `blog_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;