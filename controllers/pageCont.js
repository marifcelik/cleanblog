const Post = require('../models/Post');

class Pages {
    async getAll(req, res) {
        const data = await Post.find({});
        res.render('index', { data })
    }

    servePage(req, res) {
        if (req.params.url == 'index' || req.params.url == 'post')
            res.redirect('/');
        res.render(req.params.url);
    }

    async getPost(req, res) {
        const post = await Post.findById(req.params.id)
        res.render('post.ejs', { post })
    }

    async getEditForm(req, res) {
        const post = await Post.findById(req.params.id);
        res.render('editform.ejs', { post })
    }
}

module.exports = new Pages();