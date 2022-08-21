async function updatePost(db, params) {
    const { postId, likes, comments, nextCommentId } = params;
    return new Promise((resolve, reject) => {
        db.query("update posts set likes = ?, comments = ?, nextCommentId = ?, numComments = ? where id = ?", [likes, JSON.stringify(comments), nextCommentId, comments.length, postId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ status: 200 })
            }
        })
    })   
}

module.exports = { updatePost };