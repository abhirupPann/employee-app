-- CreateTable
CREATE TABLE `AllTasks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `s_date` DATETIME(3) NOT NULL,
    `e_date` DATETIME(3) NOT NULL,
    `em_name` VARCHAR(191) NOT NULL,
    `status` ENUM('on_going', 'completed') NOT NULL DEFAULT 'on_going',
    `action` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
