const express = require('express')
const mongoose = require('mongoose');
const methodover = require('method-override');
const fs = require('fs');

const pageCont = require('./controllers/pageCont')
const postCont = require('./controllers/postCont')

const app = express();

const host = 'localhost';
const port = process.env.PORT || 5000;

app.use(methodover('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(function baslangic() {
    if (!fs.existsSync('public/uploads'))
        fs.mkdirSync('public/uploads')

    mongoose.connect('mongodb+srv://arif:123@cluster0.ibztmat.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
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
