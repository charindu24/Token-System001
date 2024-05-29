const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const queue = [];

app.use(bodyParser.json());

app.post('/enter_queue', (req, res) => {
    const userId = req.body.user_id;
    const token = uuidv4();
    queue.push({ userId, token });
    res.json({ token });
});

app.get('/check_status', (req, res) => {
    const userId = req.query.user_id;
    if (queue.length > 0 && queue[0].userId === userId) {
        queue.shift();
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
