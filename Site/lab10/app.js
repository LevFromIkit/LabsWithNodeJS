const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

const host = 'localhost'
const port = 3000


const urlencodedParser = express.urlencoded({extended: false});
app.use(express.static('public'));

app.get('/', (req, res) => {
  
  const file = fs.readFileSync('public/lab10.html', 'utf-8').toString();
  res.send(file);
})

app.listen(port, host, () =>
  {
    console.log(`Сервер запущен по адресу: http://${host}:${port}`);
  });
  