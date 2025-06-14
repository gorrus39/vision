ALTER TABLE `images` ADD `size_type` text;--> statement-breakpoint
ALTER TABLE `catalogItems` DROP COLUMN `img_short_path`;--> statement-breakpoint
ALTER TABLE `catalogItems` DROP COLUMN `img_large_path`;