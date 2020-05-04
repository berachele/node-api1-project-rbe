
//SETUP
const express = require('express')
const server = express()
server.use(express.json())

//Array of users
let users = [
    {
        id: 1,
        name: "Mary Poppins",
        bio: "I'M MARY POPPINS, Y'ALL"
    }
]

//Testing with GET
server.get('/', (req, res) => {
    res.json({api: "API is working!"})
})

//GET /api/users to return users array
server.get('/api/users', (req, res) => {
    res.json(users)
})

//GET /api/users/:id to return user object with specific id


//DELETE /api/users/:id to delete user with specific id


//PATCH /api/users/:id to Update user with specific id--returns updated user



server.listen(3000, () => console.log("\n== API is Running ==\n"))