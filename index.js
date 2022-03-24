const express = require('express');
const handlebars = require('express-handlebars');
const Contenedor = require('./clase');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/productos', async (req, res) => {
    const products = await p.getAll();
    res.render('main', { products } );
});

app.post('/productos', async (req, res) => {
    let products = await p.getAll();

    const { title, price, image } = req.body;

    const newProduct = {
        title: title,
        price: price,
        image: image
    }

    await p.save(newProduct);

    products = await p.getAll();
    res.render('main', { products });  
});
  

app.listen(8080);

const p = new Contenedor( './productos.txt' );