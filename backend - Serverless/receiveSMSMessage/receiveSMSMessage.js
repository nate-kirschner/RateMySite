async function receiveSMSMessage(db, message) {
    const split = message.split(" ");
    let result;

    if (split[0] === "Report") {
        const ids = split[1].split(":");
        if (ids[0] && !isNaN(parseInt(ids[0])) && ids[1] && !isNaN(parseInt(ids[1]))) {
            const postId = parseInt(ids[0]);
            const commentId = parseInt(ids[1]);
            result = await removeComment(db, postId, commentId)
        } else {
            result = { status: 400 }
        }
    } else {
        if (split[1] && !isNaN(parseInt(split[1]))) {
            const postId = parseInt(split[1]);
            if (split[0] && split[0] === "Approve") {
                result = await updateIsApproved(db, 1, postId);
            } else if (split[0] && split[0] === "Deny") {
                result = await updateIsApproved(db, 0, postId);
            }
        } else {
            result = { status: 400 }
        }
    }
    return result;
}

async function removeComment(db, postId, commentId) {
    return new Promise((resolve, reject) => {
        db.query("select comments from posts where id = ?", [postId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    let comments = JSON.parse(result[0].comments);
                    comments = comments.filter(comment => comment.id !== commentId);
                    db.query("update posts set comments = ? where id = ?", [JSON.stringify(comments), postId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ status: 200 })
                        }
                    })
                }
            }
        })
    })   
}

async function updateIsApproved(db, isApproved, postId) {
    return new Promise((resolve, reject) => {
        db.query("update posts set isApproved = ? where id = ?", [isApproved, postId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ status: 200 });
            }
        })
    })   
}

module.exports = { receiveSMSMessage };