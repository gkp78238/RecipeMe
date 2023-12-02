const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const conn_str = 'mongodb+srv://ezionon:al8CpbfgN1Ik8spL@cluster0.d6lsbdi.mongodb.net/sessions?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(conn_str)
.then((res) => {
    console.log('MongoDB Connected');
})
.catch(err => {console.log (`MongoDB Connection Error: ${err}`)
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port
${port}`));

app.use(cors());

const accounts = require('./routes/api/accounts')
app.use('/api/accounts', accounts);