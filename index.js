
//SETUP
const express = require('express')
const server = express()
server.use(express.json())
const {v4: uuidv4} = require('uuid')

//Array of users
let users = [
    {
        id: uuidv4(),
        name: "Mary Poppins",
        bio: "I'M MARY POPPINS, Y'ALL"
    },
]

//Testing with GET
server.get('/', (req, res) => {
    res.json({api: "API is working!"})
})

//POST /api/users creates a user using the info sent inside the req.body
server.post('/api/users', (req, res) => {
    const user = {
        id: uuidv4(),
        ...req.body
    }
    //if user/bio is missing, return 400
    if(!user.name || !user.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else if (!user){ //if there's an error which saving user, return 500
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    } else
    users.push(user)
    res.status(201).json(user)
})

//GET /api/users to return users array
server.get('/api/users', (req, res) => {
    res.json(users)
})

//GET /api/users/:id to return user object with specific id
server.get('/api/users/:id', (req, res) => {

})

//DELETE /api/users/:id to delete user with specific id
server.delete('/api/users/:id', (req, res) => {

})

//PATCH /api/users/:id to Update user with specific id--returns updated user
server.patch('/api/users/:id', (req, res) => {

})


server.listen(3000, () => console.log("\n== API is Running ==\n"))