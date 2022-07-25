const express = require('express')
const mongoose = require('mongoose')
const app = express();

const Post = require('./models/Post');

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
    res.render(req.params.url);
    console.log(req.params);
})

app.post('/add', async (req, res) => {
    console.log(req.body);
    await Post.create(req.body)
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`localhost ${port} portundan dinleniyor.`);
})
