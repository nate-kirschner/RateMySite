async function getPost(db, params) {
    const { startIdx, endIdx, sort, filters, searchString, postId } = params;
    let posts;
    if (sort === "search") {
        posts = getPostsByTitleOrURL(db, { searchString });
    } else if (sort === "id") {
        posts = getPostById(db, { postId });
    } else {
        posts = getPostsSorted(db, { startIdx, endIdx, sort });
    }
    return posts;
}

function getPostsByTitleOrURL(db, params) {
    const { searchString } = params;
    return new Promise((resolve, reject) => {
        db.query(`select id, title, description, url, likes, comments, numComments, hasCommentSection from posts where isApproved = 1 and (title like '%${searchString}%' or url like '%${searchString}%')`, 
        [], 
        (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

function getPostById(db, params) {
    const { postId } = params;
    return new Promise((resolve, reject) => {
        db.query("select id, title, description, url, likes, comments, numComments, hasCommentSection from posts where id = ?", [postId], 
        (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
    
}

function getPostsSorted(db, params) {
    const { startIdx, endIdx, sort } = params;
    return new Promise((resolve, reject) => {
        db.query(`select id, title, description, url, likes, comments, numComments, hasCommentSection from posts where isApproved = 1 order by ${sort.type} ${sort.direction} limit 1 offset ?`, [startIdx], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = { getPost };