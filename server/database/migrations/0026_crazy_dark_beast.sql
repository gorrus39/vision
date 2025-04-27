ALTER TABLE `catalogItems` ADD `is_top` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `catalogItems` DROP COLUMN `is_top_ru`;--> statement-breakpoint
ALTER TABLE `catalogItems` DROP COLUMN `is_top_en`;--> statement-breakpoint
ALTER TABLE `catalogItems` DROP COLUMN `is_top_cn`;