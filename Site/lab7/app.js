const express = require('express')
const bodyParser = require('body-parser')
const mustache = require('mustache')
const fs = require('fs')

const app = express()

const host = 'localhost'
const port = 3000

const urlencodedParser = express.urlencoded({extended: false});
app.use(express.static('public'));


app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/index.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8').toString();
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.get('/zaya', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/zaya.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8');
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.get('/spoiler', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/spoiler.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8');
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.get('/fara', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/fara.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8').toString();
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.get('/koleso', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/koleso.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8').toString();
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.get('/fonar', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/fonar.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8').toString();
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.get('/index', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/index.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8').toString();
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.post('/ok', urlencodedParser, (req, res) => {
    defaultInput = req.body.inputUser;
    defaultCheck = req.body.checkboxUser;
    defaultCheck2 = req.body.checkboxUser2;
    defaultCheck3 = req.body.checkboxUser3;
    defaultRadio = req.body.radioUser;

    uses = ""

    if (defaultCheck)
        uses += " ДМРВ"
    if (defaultCheck2)
        uses += " ГБЦ"
    if (defaultCheck3)
        uses += " ГТЦ"

    var res_arr = {
        "title_site": "Заявка",
        "product_name": "Заявка",
        "info": "<h2>Ваш номер для связи: " + defaultInput + ",</h2><br /><h3> Запчасти: " + uses + ",</h3><br /><p> Производитель: " + defaultRadio + "</p>",
        "img": "",
    }

    const file = fs.readFileSync('public/template.html', 'utf-8').toString();
    const template = mustache.render(file, res_arr);

    res.send(template);
})

app.listen(port, host, () =>
{
    console.log(`Сервер запущен по адресу: http://${host}:${port}`);
});