const express = require('express')
const mongoose = require('mongoose');
const methodover = require('express-method-override');
const fs = require('fs');

const pageCont = require('./controllers/pageCont')
const postCont = require('./controllers/postCont')

const app = express();

const Post = require('./models/Post');

const host = 'localhost';
const port = process.argv[2] || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodover('_method'));

(function baslangic() {
    if (!fs.existsSync('public/uploads'))
        fs.mkdirSync('public/uploads')

    mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) throw err
        console.log('veri tabanına bağlantı başarılı');
    })
})();

app.get('/', pageCont.getAll)

app.get('/:url', pageCont.servePage)

app.post('/add', postCont.add)

app.get('/post/:id', pageCont.getPost)

app.get('/post/edit/:id', pageCont.getEditForm)

app.put('/edit', postCont.edit)

app.delete('/edit', postCont.delete)

app.listen(port, host, () => console.log(`${host}:${port} dinleniyor`));
