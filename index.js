
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
    } 
    users.push(user)
    res.status(201).json(user)
})

//GET /api/users to return users array
server.get('/api/users', (req, res) => {
    if(!users){
        res.status(500).json({errorMessage: "The users information could not be retrieved"})
    }
    res.json(users)
})

//GET /api/users/:id to return user object with specific id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const checkID = users.filter(check => check.id === id)
    if(checkID.length === 0){
        res.status(404).json({errorMessage: "The user with the specifid ID does not exist"})
    } else if(!users){
        res.status(500).json({errorMessage: "The users information could not be retrieved"})
    } else{
    myUser = users.filter(user => user.id === id)
    res.status(200).json(myUser)}
})

//DELETE /api/users/:id to delete user with specific id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const checkID = users.filter(check => check.id === id)
    if(checkID.length === 0){
        res.status(404).json({errorMessage: "The user with the specifid ID does not exist"})
    } else if(!users){
        res.status(500).json({errorMessage: "The users information could not be retrieved"})
    } else {
    users = users.filter(user => user.id !== id)
    res.status(200).json(users)}
})

//PATCH /api/users/:id to Update user with specific id--returns updated user
server.patch('/api/users/:id', (req, res) => {
    const id = req.params.id
    const checkID = users.filter(check => check.id === id)
    const newUser = req.body
    if(checkID.length === 0){
        res.status(404).json({errorMessage: "The user with the specifid ID does not exist"})
    } else if(!users){
        res.status(500).json({errorMessage: "The users information could not be retrieved"})
    }else if(!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else {
    users.forEach(user => {
        if(user.id === id){
                user.name = newUser.name;
                user.bio = newUser.bio;
        }else{
            return user
        }
    })
    res.status(200).json(users)}
})


server.listen(3000, () => console.log("\n== API is Running ==\n"))