const express=require('express');
const router=express.Router();
const person=require('./../models/person');
 
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:maha', async (req, res) => {
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

   // update by put method 
   router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id; // extract the id from url parameter
        const updateddata=req.body;// updated data for person 
        const response =await person.findByIdAndUpdate(personid,updateddata,{
            new:true, // return the updated document 
            runValidators:true, // run mongoose validation such as required, unique

        })
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
   })
   // delete person from database
   router.delete('/:id',async(req,res)=>{
    try{
        const personid=req.params.id; // extract the id from url parameter
        const response=await person.findByIdAndDelete(personid);
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data deleted');
        res.status(200).json(response);

    }
    catch{
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
   })
module.exports=router;

