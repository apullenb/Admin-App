require("dotenv").config();
import express from'express';
import swaggerUi from'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import path from 'path';
const DIST_DIR = __dirname,
      HTML_FILE = path.join(DIST_DIR, './index.html'); 



//Middleware Setup
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const kitsRouter = require('../../routes/kits/kitsRouter');

//Routes setup
const productsRouter = require('../../routes/products/productsRouter');
const categoriesRouter = require('../../routes/categories/categoriesRouter');
const countriesRouter = require('../../routes/countries/countriesRouter');

//Middleware Use
server.use(cors());
server.use(express.json()); // use json to post, update data in the DB 
server.use(helmet());
server.use(morgan('combined'));

//Route Use
server.use('/api-docs', swaggerUi.serve); //Swagger endpoint
server.use('/api/products', productsRouter);
server.use('/api/categories', categoriesRouter);
server.use('/api/kits', kitsRouter)
server.use('/api/countries', countriesRouter)

server.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
})

server.get('/api-docs', swaggerUi.setup(swaggerDocument));

//The 404 Route (ALWAYS Keep this as the last route)
server.get('*', function(req, res){
    res.status(404).send('OOPS, Sorry that route does not exist...');
  });

const PORT = process.env.PORT || 8080;

server.listen(PORT,()=>{
    console.log(`Magic Man listening on port: ${PORT} in ${process.env.NODE_ENV}`)
});

