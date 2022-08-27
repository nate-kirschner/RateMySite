async function updatePost(db, params) {
    const { postId, likes, comment, commentIdToIncrease, commentIdToDecrease } = params;
    return new Promise((resolve, reject) => {
        db.query("select comments, nextCommentId from posts where id = ?", [postId], (err, result) => {
            if (err) {
                reject(err);
            }
            let {comments, nextCommentId} = result[0];
            comments = JSON.parse(comments);
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
            db.query("update posts set likes = ?, comments = ?, nextCommentId = ?, numComments = ? where id = ?", [likes, JSON.stringify(comments), newCommentId, comments.length, postId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ status: 200 })
                }
            })
        })
    })   
}

module.exports = { updatePost };