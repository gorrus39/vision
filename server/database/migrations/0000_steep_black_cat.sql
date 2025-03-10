CREATE TABLE `blog_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`published_at` integer NOT NULL,
	`category` text DEFAULT 'Uncategorized' NOT NULL,
	`title` text NOT NULL,
	`img` text,
	`sub_title` text,
	`text` text NOT NULL,
	`priority` text NOT NULL,
	`order_index` integer NOT NULL,
	`modified` text
);
