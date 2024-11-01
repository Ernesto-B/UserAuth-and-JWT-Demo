require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const jwt = require('jsonwebtoken')


const posts = [
    {
        username: "Kyle",
        title: "Post 1"
    },
    {
        username: "Jim",
        title: "Post 2"
    }
]

// Protected routes
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.username))
})

// Non-protected routes
app.post('/login', (req, res) => {
    // User auth using bcrypt and such... bc right now, this will go through regardless if the user exists or not

    const username = req.body.username
    const user = { username: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json(accessToken)
})

// 'next' required for middleware
function authenticateToken(req, res, next) {
    // get the token from the header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Split the header and getting index 1 since the token is in "Bearer TOKEN"
    if (token == null) return res.status(401)

    // Maybe add a way to prevent the request from being bricked if the token is invalid? Not sure what the issue is here (when an invalid token is passed in)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status("Unverified token, therefore no access")
        req.user = user
        next()
    })
}

app.listen(3001, () => {
    console.log("server running on port 3001")
})