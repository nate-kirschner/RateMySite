async function updatePost(db, params) {
    const { postId, likes, comments } = params;
    return new Promise((resolve, reject) => {
        db.query("update posts set likes = ?, comments = ?, numComments = ? where id = ?", [likes, JSON.stringify(comments), comments.length, postId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ status: 200 })
            }
        })
    })   
}

module.exports = { updatePost };