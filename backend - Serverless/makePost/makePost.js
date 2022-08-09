async function makePost(db, params) {
    const { title, description, url, hasCommentSection } = params;
    let editKeyFound = false;
    let editKey;
    while (!editKeyFound) {
        editKey = createEditKey(db);
        editKeyFound = await doesEditKeyExist(db, { editKey })
    }
    try {
        return await makePostDao(db, { title, description, url, hasCommentSection, editKey });
    } catch (err) {
        console.log("Error making post ", err);
        return { status: 400 };
    }
}

function createEditKey(db) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function doesEditKeyExist(db, params) {
    const { editKey } = params;
    const data = await db.query("select * from posts where edit_key = ?", [editKey])
    return data._results.length === 0;
}

async function makePostDao(db, params) {
    const { title, description, url, hasCommentSection, editKey } = params;

    return new Promise((resolve, reject) => {
        db.query("insert into posts (title, description, url, edit_key, hasCommentSection) values (?, ?, ?, ?, ?)", [title, description, url, editKey, hasCommentSection], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ status: 200 });
            }
        })
      });
}

module.exports = { makePost };