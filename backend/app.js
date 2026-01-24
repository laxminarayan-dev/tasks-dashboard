const expense = require('express');
const app = expense();
const cors = require('cors');
const taskData = require('./data/taskData');

app.use(cors());
app.use(expense.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/tasks', (req, res) => {
    res.json({ data: taskData });
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);

module.exports = app;