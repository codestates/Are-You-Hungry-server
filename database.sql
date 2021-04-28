CREATE TABLE `recipe` (
  `id` int,
  `food_id` int,
  `cooking_no` int,
  `cooking_dc` text,
  `step_image` url,
  `step_tip` text
);

CREATE TABLE `info` (
  `id` int,
  `food_name` varchar(255),
  `summary` text,
  `nation_id` int,
  `type_id` int,
  `cooking_time` varchar(255),
  `calorie` varchar(255),
  `qnt` varchar(255),
  `level` varchar(255),
  `IRDNT_code` varchar(255),
  `price` varchar(255),
  `img_url` url
);

CREATE TABLE `nation` (
  `id` int,
  `code` int,
  `name` varchar(255)
);

CREATE TABLE `food_type` (
  `id` int,
  `code` int,
  `name` varchar(255)
);

CREATE TABLE `ingredients` (
  `id` int,
  `igr_id` int,
  `food_id` int,
  `type_id` int,
  `cap_id` int
);

CREATE TABLE `igr` (
  `id` int,
  `name` varchar(255)
);

CREATE TABLE `igr_type` (
  `id` int,
  `type` varchar(255)
);

CREATE TABLE `igr_cap` (
  `id` int,
  `cap` varchar(255)
);

ALTER TABLE `recipe` ADD FOREIGN KEY (`food_id`) REFERENCES `info` (`id`);

ALTER TABLE `ingredients` ADD FOREIGN KEY (`food_id`) REFERENCES `info` (`id`);

ALTER TABLE `info` ADD FOREIGN KEY (`nation_id`) REFERENCES `nation` (`id`);

ALTER TABLE `info` ADD FOREIGN KEY (`type_id`) REFERENCES `food_type` (`id`);

ALTER TABLE `ingredients` ADD FOREIGN KEY (`type_id`) REFERENCES `igr_type` (`id`);

ALTER TABLE `ingredients` ADD FOREIGN KEY (`cap_id`) REFERENCES `igr_cap` (`id`);

ALTER TABLE `ingredients` ADD FOREIGN KEY (`igr_id`) REFERENCES `igr` (`id`);
