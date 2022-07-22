function makePost(db, params, callback) {
    const { title, description, url, editKey } = params;
    db.query("insert into posts (title, description, url, edit_key) values (?, ?, ?, ?)", [title, description, url, editKey], (err, result) => {
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
    db.query(`select id, title, description, url, likes, comments, numComments from posts where isApproved = 1 order by ${sort.type} ${sort.direction} limit 1 offset ?`, [startIdx], (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

function updatePost(db, params, callback) {
    const { postId, likes, comments } = params;
    db.query("update posts set likes = ?, comments = ?, numComments = ? where id = ?", [likes, JSON.stringify(comments), comments.length, postId], (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

function getPostsByTitleOrURL(db, params, callback) {
    const { searchString } = params;
    db.query(`select id, title, description, url, likes, comments, numComments from posts where title like '%${searchString}%' or url like '%${searchString}%'`, 
    [], 
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
    getPostsByTitleOrURL
}