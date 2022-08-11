async function receiveSMSMessage(db, message) {
    const split = message.split(" ");
    let result;
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

    return result;
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