const express = require('express') // import express
const app = express(); // instantiate express
const static = express.static(__dirname + '/public') // serve static assets -> css, client-side javascript, images served/stored from public directory

const configRoutes = require('./routes') // configure routes
const exphbs = require('express-handlebars') // import express handlebars

app.use('/public', static) // use the public directory as the static -> map lh3000/public
app.use(express.json()); // use express json
app.use(express.urlencoded({ extended:true })); // middleware fn for urlencoded to get form data

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })); // set main layout
app.set('view engine', 'handlebars'); // view engine to handlebars

configRoutes(app);

app.listen(3000, () => {
    console.log("We've got a server");
    console.log("Your routes will be running on http://localhost:3000");
})