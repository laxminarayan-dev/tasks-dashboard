const expense = require('express');
const app = expense();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const taskData = require('./data/taskData');
const { log } = require('console');

app.use(cors());
app.use(expense.json());

// Get all tasks
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/tasks', (req, res) => {
    res.json({ data: taskData });
});

// POST endpoint to add new task
app.post('/api/tasks', (req, res) => {
    try {
        const { taskTitle, taskDetail, siteLink, codeLink, technology } = req.body;

        // Validate input
        if (!taskTitle || !taskDetail || !technology) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!siteLink && !codeLink) {
            return res.status(400).json({ error: 'At least one link is required' });
        }

        // Create new task object
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            detail: taskDetail,
            link: siteLink || null,
            code: codeLink || null,
            createdAt: new Date().toISOString()
        };

        // Read current taskData.js
        const taskDataPath = path.join(__dirname, './data/taskData.js');
        let fileContent = fs.readFileSync(taskDataPath, 'utf8');

        // Parse the module to get the current data
        const currentData = require('./data/taskData');

        // Ensure technology category exists
        if (!currentData[technology]) {
            currentData[technology] = [];
        }

        // Add new task
        currentData[technology].push(newTask);

        // Write back to taskData.js
        const updatedContent = `
const taskData = ${JSON.stringify(currentData, null, 4)};

module.exports = taskData;
`;

        fs.writeFileSync(taskDataPath, updatedContent, 'utf8');

        // Clear require cache to get fresh data on next request
        delete require.cache[require.resolve('./data/taskData')];

        res.status(201).json({
            success: true,
            message: 'Task added successfully',
            task: newTask
        });

    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;