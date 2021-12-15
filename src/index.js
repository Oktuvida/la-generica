const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const {create_roles, create_admin} = require('./libs/initial_setups');
const app = express();
create_roles().then(_ => create_admin());
// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/sale_details', require('./routes/sale_details.routes'))
app.use('/api/sales', require('./routes/sales.routes'));
app.use('/api/clients', require('./routes/clients.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/consolidation', require('./routes/consolidation.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});