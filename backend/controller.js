const service = require('./service');

async function controller(db, app) {
    app.post(config.baseUrl + "/make-post", (req, res) => {
        service.makePost(db, req.body, (result) => {
            res.send(result);
        })
    })

    app.post(config.baseUrl + "/get-posts", (req, res) => {
        service.getPosts(db, req.body, (result) => {
            res.send(result);
        })
    })

    app.post(config.baseUrl + "/update-post", (req, res) => {
        service.updatePost(db, req.body, (result) => {
            res.send(result);
        })
    })
}

module.exports = controller;