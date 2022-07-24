const dao = require('./dao');

async function makePost(db, params, callback) {
    const { title, description, url, hasCommentSection } = params;
    let editKeyFound = false;
    let editKey;
    while (!editKeyFound) {
        editKey = await createEditKey(db);
        editKeyFound = await dao.doesEditKeyExist(db, { editKey })
    }
    try {
        dao.makePost(db, { title, description, url, hasCommentSection, editKey }, (result) => {
            callback({ status: 200 })
        })
    } catch (err) {
        console.log("Error making post ", err);
        callback({ status: 400 });
    }
}

async function createEditKey(db) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function getPosts(db, params, callback) {
    const { startIdx, endIdx, sort, filters, searchString, postId } = params;
    if (sort === "search") {
        dao.getPostsByTitleOrURL(db, { searchString }, (posts) => {
            callback(posts);
        })
    } else if (sort === "id") {
        dao.getPostById(db, { postId }, (post) => {
            callback(post);
        })
    } else {
        dao.getPostsSorted(db, { startIdx, endIdx, sort }, (posts) => {
            callback(posts);
        })
    }
}

async function updatePost(db, params, callback) {
    const { postId, likes, comments } = params;
    dao.updatePost(db, { postId, likes, comments }, (result) => {
        callback({ status: 200 });
    })
}

module.exports = {
    makePost,
    getPosts,
    updatePost
}