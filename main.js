const express = require('express')
const ejs = require('ejs');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/:url', (req, res) => {
    res.render(req.params.url);
    console.log(req.params);
})

app.listen(port, () => {
    console.log(`localhost ${port} portundan dinleniyor.`);
})
