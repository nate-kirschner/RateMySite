function makePost(db, params, callback) {
    const { title, description, url, hasCommentSection, editKey } = params;
    db.query("insert into posts (title, description, url, edit_key, hasCommentSection) values (?, ?, ?, ?, ?)", [title, description, url, editKey, hasCommentSection], (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

async function doesEditKeyExist(db, params) {
    const { editKey } = params;
    const data = await db.query("select * from posts where edit_key = ?", [editKey])
    return data._results.length === 0;
}

function getPostsSorted(db, params, callback) {
    const { startIdx, endIdx, sort } = params;
    const limit = endIdx - startIdx;
    const direction = sort.direction === 'ASC' || sort.direction === 'DESC' ? sort.direction : "";
    const query = "select id, title, description, url, likes, comments, nextCommentId, numComments, hasCommentSection from posts where isApproved = 1 order by " +
    "case ? " +
        "when 'likes' then likes " +
        "when 'time_created' then time_created " +
        "when '(likes + numComments)' then (likes + numComments) " +
        "when 'RAND()' then RAND() " +
    "end " +
    `${direction} ` + 
    "limit ? offset ?"
    db.query(query, [sort.type, limit, startIdx], (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

function updatePost(db, params, callback) {
    const { postId, likes, comment, commentIdToIncrease, commentIdToDecrease } = params;
    db.query("select comments, nextCommentId from posts where id = ?", [postId], (err, result) => {
        let {comments, nextCommentId} = result[0];
        comments = JSON.parse(comments);
        if (comments === null) {
            comments = [];
        }
        let newCommentId = nextCommentId;
        if (comment) {
            comments = [...comments, { ...comment, id: nextCommentId}];
            newCommentId++;
        }
        if (commentIdToIncrease) {
            comments = comments.map(c => c.id == commentIdToIncrease ? { ...c, likes: c.likes + 1} : c);
        }
        if (commentIdToDecrease) {
            comments = comments.map(c => c.id == commentIdToDecrease ? { ...c, likes: c.likes - 1} : c);
        }
        const commentsLength = comments ? comments.length : 0;
        db.query("update posts set likes = ?, comments = ?, nextCommentId = ?, numComments = ? where id = ?", [likes, JSON.stringify(comments), newCommentId, commentsLength, postId], (err, result) => {
            if (err) {
                throw err;
            }
            callback(result);
        })
    })
    
}

function getPostsByTitleOrURL(db, params, callback) {
    let { searchString } = params;
    searchString = "%" + searchString + "%"
    db.query(`select id, title, description, url, likes, comments, nextCommentId, numComments, hasCommentSection from posts where isApproved = 1 and title like ? or url like ?`, [searchString, searchString], 
    (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

function getPostById(db, params, callback) {
    const { postId } = params;
    db.query("select id, title, description, url, likes, comments, nextCommentId, numComments, hasCommentSection from posts where id = ?", [postId], 
    (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

module.exports = {
    makePost,
    doesEditKeyExist,
    getPostsSorted,
    updatePost,
    getPostsByTitleOrURL,
    getPostById
}