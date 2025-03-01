PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "created_at") SELECT "id", "name", "created_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `users2_email_unique`;--> statement-breakpoint
ALTER TABLE `users2` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `users2` DROP COLUMN `username`;--> statement-breakpoint
ALTER TABLE `users2` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `users2` DROP COLUMN `password`;