CREATE DATABASE IF NOT EXISTS `gpt-clone-final` 

USE `gpt-clone-final`;
DROP TABLE IF EXISTS conversations;
CREATE TABLE conversations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('user', 'assistant') NOT NULL,
    content MEDIUMTEXT NOT NULL,
    token_count INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_conversations_created_at (created_at)
);
