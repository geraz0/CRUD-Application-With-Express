const express = require('express'); // Importing the Express framework
const app = express(); // Creating an instance of Express

app.use(express.json()); // Middleware to parse JSON bodies

const pets = [];

// Endpoint to retrieve all pets
app.get('/pets', (req, res) => {
    res.status(200).json(pets);
});

// Endpoint to retrieve a specific pet by ID
app.get('/pets/:id', (req, res) => {
    const pet = pets.find(u => u.id === parseInt(req.params.id));
    if (!pet) {
        return res.status(404).send('Pet not found');
    }
    res.status(200).json(pet);
});

// Endpoint to create a new pet
app.post('/pets', (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).send('Pet name is required');
    }
    const newPet = {
        id: pets.length + 1, // Automatically assign an ID to the new pet
        name, 
    };
    pets.push(newPet);
    res.status(201).json(newPet);
});

// Endpoint to update an existing pet by ID
app.put('/pets/:id', (req, res) => {
    const pet = pets.find(u => u.id === parseInt(req.params.id));
    if (!pet) {
        return res.status(404).send('Pet not found');
    }
    pet.name = req.body.name;
    res.status(200).json(pet);
});

// Endpoint to delete a pet by ID
app.delete('/pets/:id', (req, res) => {
    const index = pets.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Pet not found');
    }
    pets.splice(index, 1);
    res.status(204).send();
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Pet not found' });
  });

const PORT = 3001; // Setting the port number
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Starting the server
});