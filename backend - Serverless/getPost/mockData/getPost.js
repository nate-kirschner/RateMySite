const mockData = require("./mockData.js");

async function getPost(params) {
  const { startIdx, endIdx, sort, filters, searchString, postId } = params;
  let posts;
  if (sort === "search") {
    posts = getPostsByTitleOrURL({ searchString }, mockData.mockData);
  } else if (sort === "id") {
    posts = getPostById({ postId }, mockData.mockData);
  } else {
    posts = getPostsSorted(db, { startIdx, endIdx, sort }, mockData.mockData);
  }
  return posts;
}

function getPostsByTitleOrURL(params, data) {
  let { searchString } = params;
  const filteredPosts = data.filter(
    (post) =>
      post.isApproved === 1 &&
      (post.title.toLowerCase().includes(searchString.toLowerCase()) ||
        post.url.toLowerCase().includes(searchString.toLowerCase()))
  );
  const finalResult = filteredPosts.map(
    ({
      id,
      title,
      description,
      url,
      likes,
      comments,
      nextCommentId,
      numComments,
      hasCommentSection,
    }) => {
      return {
        id,
        title,
        description,
        url,
        likes,
        comments,
        nextCommentId,
        numComments,
        hasCommentSection,
      };
    }
  );
  return finalResult;
}

function getPostById(params, data) {
  const { postId } = params;
  const filteredPosts = data.filter((post) => post.id === postId);
  const finalResult = filteredPosts.map(
    ({
      id,
      title,
      description,
      url,
      likes,
      comments,
      nextCommentId,
      numComments,
      hasCommentSection,
    }) => {
      return {
        id,
        title,
        description,
        url,
        likes,
        comments,
        nextCommentId,
        numComments,
        hasCommentSection,
      };
    }
  );
  return finalResult;
}

function getPostsSorted(params, data) {
  const { startIdx, endIdx, sort } = params;
  const limit = endIdx - startIdx;
  const direction =
    sort.direction === "ASC" || sort.direction === "DESC" ? sort.direction : "";

  const filteredPosts = data.filter((post) => post.isApproved === 1);
  let sortedPosts = [];
  switch (sort.type) {
    case "likes":
      sortedPosts = filteredPosts.sort((a, b) => {
        if (direction === "ASC") {
          return a.likes - b.likes;
        } else {
          return b.likes - a.likes;
        }
      });
      break;
    case "time_created":
      sortedPosts = filteredPosts.sort((a, b) => {
        if (direction === "ASC") {
          return new Date(a.time_created) - new Date(b.time_created);
        } else {
          return new Date(b.time_created) - new Date(a.time_created);
        }
      });
      break;
    case "(likes + numComments)":
      sortedPosts = filteredPosts.sort((a, b) => {
        const likesCommentsA = a.likes + a.comments;
        const likesCommentsB = b.likes + b.comments;
        if (direction === "ASC") {
          return likesCommentsA - likesCommentsB;
        } else {
          return likesCommentsB - likesCommentsA;
        }
      });
      break;
    case "RAND()":
      sortedPosts = filteredPosts
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      break;
  }
  const slicedPosts = sortedPosts.slice(startIdx, startIdx + limit);
  return slicedPosts;
}

module.exports = { getPost };
