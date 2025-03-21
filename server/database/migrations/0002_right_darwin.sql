PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`published_at` integer NOT NULL,
	`category` text DEFAULT 'Uncategorized' NOT NULL,
	`title` text NOT NULL,
	`image_paths` text DEFAULT '[null,null,null,null,null]',
	`sub_title` text,
	`text` text NOT NULL,
	`priority` text NOT NULL,
	`order_index` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_blog_items`("id", "published_at", "category", "title", "image_paths", "sub_title", "text", "priority", "order_index") SELECT "id", "published_at", "category", "title", "image_paths", "sub_title", "text", "priority", "order_index" FROM `blog_items`;--> statement-breakpoint
DROP TABLE `blog_items`;--> statement-breakpoint
ALTER TABLE `__new_blog_items` RENAME TO `blog_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;