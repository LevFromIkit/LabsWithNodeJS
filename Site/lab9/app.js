const express = require('express')
const bodyParser = require('body-parser')
const mustache = require('mustache')
const fs = require('fs')
const { MongoClient } = require('mongodb')
var bson = require('bson')

const url = 'mongodb://0.0.0.0:27017'
const client = new MongoClient(url)

const dbName = 'lab9'

const app = express()

const host = 'localhost'
const port = 3000

const urlencodedParser = express.urlencoded({extended: false});
app.use(express.static('public'));


app.get('/', (req, res) => {
    main_page(req,res)
})

async function main_page(req, res) {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('product');

	let data = {
		title_site: "ВашВаз",
		info: ""
	}
    const findResult = await collection.find({}).toArray();
	let info = '<section class="cards"><div class="container container_cards">';
	for (let i = 0; i < findResult.length; i++)
	{	
		let tmp = '<div class="card"><div class="card_top"><a class="card_img" href="#"><img src="';
        tmp = tmp + findResult[i].img + '"></a></div>';

		tmp = tmp + '<div class="card_bottom"><div class="card_prices">';
        tmp = tmp + findResult[i].price + ' ₽</div>';

        tmp = tmp + '<a class="card_title" href="#">';
        tmp = tmp + findResult[i].title_site + '</a>';
				
		tmp = tmp + '<button class="card_bth" value="' + findResult[i]._id + '" type="submit">Удалить</button></div></div>'; 
		info = info + tmp;
	}
	
	data.info = info + '</div></section>';
    const file = fs.readFileSync('public/template.html', 'utf-8');
    const template = mustache.render(file, data);
    
    res.send(template);
}


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
});

async function create_func(req, res) {
	const title_form = req.body.inputUser
    const price_form = req.body.inputUser2
    const descr_form = req.body.inputUser3
    const img_form = req.body.inputUser4

	if(title_form == "" || price_form == "" || descr_form == ""){
		var res_arr = {
			"title": "Error",
			"info": '<div style="text-align: center;"><h1>Поля не должны быть пустыми!</h1></div>'
		}
	
		const file = fs.readFileSync('public/template.html', 'utf-8').toString();
		const template = mustache.render(file, res_arr);
	  
		res.send(template);
		return;
	}


	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('product');
    
    const insertResult = await collection.insertMany([{ "title_site": title_form, "price" : price_form, "info" : descr_form, "img" : img_form }]);
    
    console.log(title_form, price_form, descr_form, img_form)
}

app.get('/add_product', (req, res) => {
	const data = JSON.parse(fs.readFileSync('public/add_product.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8');
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.post('/create', urlencodedParser, (req, res) => {
    create_func(req, res);
})

async function delete_ad(id) {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('product');
	
	if (id != '')
		await collection.deleteOne({_id: new bson.ObjectId (id)});
}

app.post('/delete', urlencodedParser, (req, res) => {
    console.log(req.body.id);
  	delete_ad(req.body.id);
  	res.redirect('/');
})

app.get('/search', (req, res) => {
	const data = JSON.parse(fs.readFileSync('public/search.json'));
    const file = fs.readFileSync('public/template.html', 'utf-8');
    const template = mustache.render(file, data);
    
    res.send(template);
})

app.post('/search_product', urlencodedParser, (req, res) => {
    search_product(req, res);
})

async function search_product(req, res) {
	const title_search = req.body.title_form
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('product');

	let data = {
		title_site: "Поиск",
		info: ""
	}
    const findResult = await collection.find({}).toArray();
	let info = '<section class="cards"><div class="container container_cards">';
	for (let i = 0; i < findResult.length; i++)
	{	
        if (findResult[i].title_site.indexOf(title_search) != -1) {
			let tmp = '<div class="card"><div class="card_top"><a class="card_img" href="#"><img src="';
			tmp = tmp + findResult[i].img + '"></a></div>';
			
			tmp = tmp + '<div class="card_bottom"><div class="card_prices">';
            tmp = tmp + findResult[i].price + ' ₽</div>';

            tmp = tmp + '<a class="card_title" href="#">';
            tmp = tmp + findResult[i].title_site + '</a>';
                    
            tmp = tmp + '<button class="card_bth" value="' + findResult[i]._id + '" type="submit">Удалить</button></div></div>'; 
            info = info + tmp;
		}

	}
	
	data.info = info + '</div></section>';
	const file = fs.readFileSync('public/template.html', 'utf-8');
    const template = mustache.render(file, data);
    
	res.send(template);
}


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