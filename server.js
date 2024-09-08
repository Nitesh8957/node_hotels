// import {sum,mul} from "./math.js";
// console.log(sum(4,5));
// // console.log(mul(2,3));
// import{generate} from "random-words";
// console.log(generate());
// var os=require('os');
// var detail=os.userInfo();
// console.log(detail); 

// mongoose started here



const express = require('express');
const app = express();
const db = require('./db');
// env file ko server pehchane 
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const person = require('./models/menu');

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel ... how can I help you');
});


// < ------- seprate routers in a single file 
// POST route to create a new person
app.post('/menu', async (req, res) => {
    try {
        const data = req.body; // Body-parser stores the data in req.body

        const newPerson = new person(data); // Create a new person instance
        const response = await newPerson.save(); // Save person to database
        
        console.log('Data saved');
        res.status(200).json(response); // Send the saved person as response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all persons
app.get('/menu', async (req, res) => {
    try {
        const persons = await person.find(); // Fetch all persons from the database
        
        console.log('Data fetched');
        res.status(200).json(persons); // Send the fetched data as response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// just for getting details by work typpe how many persons are there kaal worktype etc.
app.get('/person/:maha', async (req, res) => {
    try {
        const maha=req.params.maha;
        if(maha=='kaal'||maha=='iternal'){
            const response=await person.find({work:maha});
            res.status(200).json(response);
        }
        else{
            console.log("invalid");
            res.status(404).json({error:'invalid work type'});
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    // ---------- yha tk seprate routers>  


    // <-----------    just make a seprate folder route and give seprate route file . that will free space in server file
// import route files
const prsn=require('./routes/personroutes');
// use routers
app.use('/person',prsn);         // just for router


const PORT=process.env.PORT||3001;  // mtlb agr env file me port ki value h to bo le lo ni to 3001
app.listen(PORT,()=>{
    console.log('listening on port 3001');
})