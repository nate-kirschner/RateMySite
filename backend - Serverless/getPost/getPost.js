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
    let { searchString } = params;
    searchString = "%" + searchString + "%"
    return new Promise((resolve, reject) => {
        db.query(`select id, title, description, url, likes, comments, numComments, hasCommentSection from posts where isApproved = 1 and (title like ? or url like ?)`, 
        [searchString, searchString], 
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
    const limit = endIdx - startIdx;
    const direction = sort.direction === 'ASC' || sort.direction === 'DESC' ? sort.direction : "";
    const query = "select id, title, description, url, likes, comments, numComments, hasCommentSection from posts where isApproved = 1 order by " +
    "case ? " +
        "when 'likes' then likes " +
        "when 'time_created' then time_created " +
        "when '(likes + numComments)' then (likes + numComments) " +
        "when 'RAND()' then RAND() " +
    "end " +
    `${direction} ` + 
    "limit ? offset ?"
    return new Promise((resolve, reject) => {
        db.query(query, [sort.type, limit, startIdx], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = { getPost };