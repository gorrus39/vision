CREATE TABLE `catalogAdmins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`avatar_path` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`link` text NOT NULL
);
