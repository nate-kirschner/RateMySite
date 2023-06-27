export const mockData = [
  {
    id: 99,
    title: "Nate Kirschner Personal Site",
    descrption: "",
    url: "https://natekirschner.com",
    edit_key: "XcKeQu9kvpgEL8Y",
    likes: 5,
    comments: "[]",
    nextCommentId: 0,
    numComments: 0,
    time_created: "2022-08-27 23:33:07",
    isApproved: 1,
    hasCommentSection: 0,
  },
  {
    id: 101,
    title: "Portfolio",
    descrption: "Portfolio",
    url: "https://kennethbass.com",
    edit_key: "OoVX0Nsa0n0EZxA",
    likes: 2,
    comments: "[]",
    nextCommentId: 0,
    numComments: 0,
    time_created: "2022-08-29 19:36:50",
    isApproved: 1,
    hasCommentSection: 0,
  },
  {
    id: 99,
    title: "My first static website!",
    descrption:
      "I made my first full static website, I would be very grateful if you could give me feedback on the first project I completed!",
    url: "https://fi-do-manin.neocities.org/",
    edit_key: "sfcbXRRN9MoENnw",
    likes: 1,
    comments:
      '[{"text":"Looks good!","date":"5/26/2023","likes":1,"comments":null}]',
    nextCommentId: 1,
    numComments: 1,
    time_created: "2022-12-13 23:37:24",
    isApproved: 1,
    hasCommentSection: 1,
  },
];

/**
 * Create statement for table
 * 
 * CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `description` text,
  `url` varchar(500) NOT NULL,
  `edit_key` varchar(20) DEFAULT NULL,
  `likes` int DEFAULT '0',
  `comments` json DEFAULT NULL,
  `nextCommentId` int DEFAULT '0',
  `numComments` int DEFAULT '0',
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `hasCommentSection` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
);
 *
 */
