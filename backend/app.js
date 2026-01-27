const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const taskData = require('./data/taskData');
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Get all tasks
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api/tasks', (req, res) => {
    res.json({ data: taskData });
});

// POST endpoint to add new task
app.post('/api/tasks', (req, res) => {
    try {
        const { id, taskTitle, taskDetail, siteLink, codeLink, technology } = req.body;

        // Validate input
        if (!taskTitle || !taskDetail || !technology) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!siteLink && !codeLink) {
            return res.status(400).json({ error: 'At least one link is required' });
        }

        // Create new task object
        const newTask = {
            id: id || Date.now(),
            title: taskTitle,
            detail: taskDetail,
            link: siteLink || null,
            code: codeLink || null,
            technology: technology,
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

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, detail, link, code, technology } = req.body;

    const taskDataPath = path.join(__dirname, './data/taskData.js');
    const currentData = require('./data/taskData');

    if (!currentData[technology]) {
        return res.status(404).json({ error: 'Technology not found' });
    }

    const index = currentData[technology].findIndex(t => t.id == id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    currentData[technology][index] = {
        ...currentData[technology][index],
        title,
        detail,
        link,
        code
    };

    fs.writeFileSync(
        taskDataPath,
        `const taskData = ${JSON.stringify(currentData, null, 4)};\n\nmodule.exports = taskData;`
    );

    delete require.cache[require.resolve('./data/taskData')];

    res.json({ success: true });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { technology } = req.body;

    const taskDataPath = path.join(__dirname, './data/taskData.js');
    const currentData = require('./data/taskData');

    currentData[technology] =
        currentData[technology].filter(t => t.id != id);

    fs.writeFileSync(
        taskDataPath,
        `const taskData = ${JSON.stringify(currentData, null, 4)};\n\nmodule.exports = taskData;`
    );

    delete require.cache[require.resolve('./data/taskData')];

    res.json({ success: true });
});


app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;