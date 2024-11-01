const express = require('express')
const app = express()
app.use(express.json())
const bcrypt = require('bcrypt')

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send(`Successfully created new user ${user.name}`)
    } catch (error) {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (!user) {
        res.status(401).send("no user found")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send("Successfully logged in")
        } else {
            res.send("Not allowed")
        }
    } catch (error) {
        res.status(500).send()
    }
})

app.listen(3000, () => {
    console.log("server running on port 3000")
}) 