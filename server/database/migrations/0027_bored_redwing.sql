CREATE TABLE `faq_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`path` text DEFAULT 'default' NOT NULL,
	`is_title` integer DEFAULT false NOT NULL,
	`faq_item_id` integer NOT NULL,
	FOREIGN KEY (`faq_item_id`) REFERENCES `faq_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `faq_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text DEFAULT 'Uncategorized' NOT NULL,
	`title` text NOT NULL,
	`sub_title` text,
	`text` text NOT NULL,
	`order_index` integer NOT NULL,
	`priority` text NOT NULL,
	`lang` text DEFAULT 'en' NOT NULL
);
