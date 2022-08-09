let config = {};

config.url = "http://localhost:3002/backend";

// config.makePostUrl = "http://localhost:3002/backend/make-post";
// config.getPostUrl = "http://localhost:3002/backend/get-posts";
// config.updatePostUrl = "http://localhost:3002/backend/update-post";

config.makePostUrl = "https://abxgxsrzff.execute-api.us-east-2.amazonaws.com/RateMySite/makepost";
config.getPostUrl = "https://abxgxsrzff.execute-api.us-east-2.amazonaws.com/RateMySite/getpost";
config.updatePostUrl = "https://abxgxsrzff.execute-api.us-east-2.amazonaws.com/RateMySite/updatepost";

export default config;