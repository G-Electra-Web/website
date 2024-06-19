const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true , name: "geletra-session"}));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Use routes
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
