const Post = require('../models/Post');

class Pages {
    async getAll(req, res) {
        let page = req.query.page || 1
        let total = await Post.find({}).countDocuments();
        const data = await Post.find({}).sort('-date').skip((page - 1) * 3).limit(3);
        res.render('index', { data, page, total })
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