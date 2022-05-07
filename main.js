const express = require('express')
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send({ id: 1, title: "Blog title", description: "Blog description" })
})

app.listen(port, () => {
    console.log(`localhost ${port} portundan dinleniyor.`);
})
