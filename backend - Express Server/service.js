const dao = require('./dao');
const axios = require('axios');

async function makePost(db, params, callback) {
    const { title, description, url, hasCommentSection, captchaToken } = params;
    let editKeyFound = false;
    let editKey;
    while (!editKeyFound) {
        editKey = await createEditKey(db);
        editKeyFound = await dao.doesEditKeyExist(db, { editKey })
    }
    try {
        const captcha = await veryifyCaptcha(captchaToken);
        if (captcha) {
            dao.makePost(db, { title, description, url, hasCommentSection, editKey }, (result) => {
                callback({ status: 200, postInfo: {title, url, postId: result.insertId }})
            })
        } else {
            console.log("Captcha not validated ");
            callback({ status: 400 });
        }
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
    const { postId, likes, comments, nextCommentId } = params;
    dao.updatePost(db, { postId, likes, comments, nextCommentId }, (result) => {
        callback({ status: 200 });
    })
}

async function submitComment(db, params, callback) {
    const {captchaToken} = params;
    const captcha = await veryifyCaptcha(captchaToken);
    if (captcha) {
        updatePost(db, params, callback);
    } else {
        console.log("Captcha not validated ");
        callback({ status: 400 });
    }
}

async function veryifyCaptcha(token) {
    if (!process.env.CAPTCHA_SECRET_KEY) {
        return false;
    }
    const captchaResp = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
    );
    
    return captchaResp.data.success && captchaResp.status === 200;
}

module.exports = {
    makePost,
    getPosts,
    updatePost,
    submitComment
}