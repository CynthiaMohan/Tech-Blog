const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// import sequelize connection
const sequelize = require('./config/connection');

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.use(routes);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Set up middleware to handle parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});

