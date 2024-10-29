const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
//app.use(morgan('combined'));

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});