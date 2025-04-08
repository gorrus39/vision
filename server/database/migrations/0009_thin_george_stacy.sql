PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_catalogRewardsToItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`catalog_reward_id` integer NOT NULL,
	`catalog_item_id` integer NOT NULL,
	FOREIGN KEY (`catalog_reward_id`) REFERENCES `rewards`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`catalog_item_id`) REFERENCES `catalogItems`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_catalogRewardsToItems`("id", "catalog_reward_id", "catalog_item_id") SELECT "id", "catalog_reward_id", "catalog_item_id" FROM `catalogRewardsToItems`;--> statement-breakpoint
DROP TABLE `catalogRewardsToItems`;--> statement-breakpoint
ALTER TABLE `__new_catalogRewardsToItems` RENAME TO `catalogRewardsToItems`;--> statement-breakpoint
PRAGMA foreign_keys=ON;