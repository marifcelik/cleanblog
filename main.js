const express = require('express')
const mongoose = require('mongoose')
const app = express();

const Post = require('./models/Post');

const host = 'localhost';
const port = process.argv[2] || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) throw err
    console.log('veri tabanına bağlantı başarılı');
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const data = await Post.find({})
    res.render('index', { data });
})

app.get('/:url', (req, res) => {
    if (req.params.url == 'index' || req.params.url == 'post')
        res.redirect('/');
    res.render(req.params.url);
    console.log(req.params);
})

app.post('/add', async (req, res) => {
    await Post.create(req.body)
    res.redirect('/');
})

app.get('/posts/:id', async (req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render('post.ejs', { post })
})

app.listen(port, host, () => console.log(`${host}:${port} dinleniyor`));
