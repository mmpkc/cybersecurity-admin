const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.get('/user', async (req, res) => {
    const data = await prisma.user.findMany();
    res.json({
        message: 'okay',
        data
    })
});

app.post('/user', async (req, res) => {
    console.log(req.body)
    const response = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    });
    if (response) {
        res.json({
            message: "add successfully"
        })
    } else {
        res.json({
            message: 'failed'
        })
    }
});

app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                username: username,
                password: password
            }
        });
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update user',
            error: error.message
        });
    }
});

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to delete user',
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log(`server is running on port 3000`)
});
