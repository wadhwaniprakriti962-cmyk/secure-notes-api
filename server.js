const jwt=require("jsonwebtoken");
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err));
const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server is running");
});
const Note = require("./models/Note");
const bcrypt = require("bcrypt");
const authMiddleware=require("./middleware/authMiddleware");
const User = require("./models/User");
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Signup error" });
    }
});
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login error" });
    }
});
app.post('/notes',authMiddleware, async (req, res) => {
    try {
        const { title,content } = req.body;
        const newNote=new Note({
            title,
            content,
            user:req.user.userId
        });
        await newNote.save();
        res.send("Note registered successfully");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error registering note");
    }
});
app.get("/notes",authMiddleware,async (req,res)=>{
    try{
        const notes=await Note.find({user:req.user.userId});
        res.status(200).json({message:"Notes fetched successfully",
            notes:notes
        })
    }
    catch(error){
           console.log(error)
           return res.status(500).json({message:"Error fetching notes"})
        }

});
app.put("/notes/:id",authMiddleware,async (req,res)=>{
try{
    const{title,content}=req.body
    const note=await Note.findOneAndUpdate(
        {
            _id:req.params.id,
            user:req.user.userId
        },
        {
            title,content
        },
        {
            new:true
        }
    )
    if(!note){
        return res.status(404).json({message:"Notee not found"})
    }
    res.status(200).json({message:"Note registered successfully",
        note:note
    })
}
catch(error){
    console.log(error);
    res.status(500).json({message:"Error in updating note"})
}
});
app.delete("/notes/:id",authMiddleware,async(req,res)=>{
    try{
        const note=await Note.findOneAndDelete(
            {
                _id:req.params.id,
                user:req.user.userId
            }
        );
        if (!note){
            res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note deleted successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error in deleting the note"})
    }
})
app.listen(3000, () => {
    console.log("Server running in port 3000")
});





/* "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWRkMjJkOGExZGZjZGY4MzA2OTI5ZDAiLCJpYXQiOjE3NzYyODA4OTEsImV4cCI6MTc3NjI4NDQ5MX0.A-VH0VDebVmoSJl0dLXjDaK4zGEuiss2hXJXZ69Z-Pc"*/












