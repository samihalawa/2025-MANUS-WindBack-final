ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `status_idx` ON `contactSubmissions` (`status`);--> statement-breakpoint
CREATE INDEX `createdAt_idx` ON `contactSubmissions` (`createdAt`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `newsletterSubscribers` (`email`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `newsletterSubscribers` (`status`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `subscriptions` (`userId`);--> statement-breakpoint
CREATE INDEX `stripeCustomerId_idx` ON `subscriptions` (`stripeCustomerId`);