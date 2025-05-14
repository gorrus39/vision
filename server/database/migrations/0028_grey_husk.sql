PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_faq_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text DEFAULT 'Uncategorized' NOT NULL,
	`title` text NOT NULL,
	`sub_title` text DEFAULT '' NOT NULL,
	`text` text NOT NULL,
	`order_index` integer NOT NULL,
	`priority` text NOT NULL,
	`lang` text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_faq_items`("id", "category", "title", "sub_title", "text", "order_index", "priority", "lang") SELECT "id", "category", "title", "sub_title", "text", "order_index", "priority", "lang" FROM `faq_items`;--> statement-breakpoint
DROP TABLE `faq_items`;--> statement-breakpoint
ALTER TABLE `__new_faq_items` RENAME TO `faq_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;