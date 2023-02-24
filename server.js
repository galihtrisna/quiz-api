const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const quizRoute = require('./router/quiz');
const jobsheetRoute = require('./router/jobsheet');
const categoryRoute = require('./router/category');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models')
db.sequelize.sync()

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api/quizzes', quizRoute)
app.use('/api/jobsheet', jobsheetRoute)
app.use("/api/category", categoryRoute);

app.listen(port,  () => console.log(`App Listening on port http://localhost:${port} !`));

