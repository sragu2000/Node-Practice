const express = require('express'); const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User=require('./models/user.model');

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/app')
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
    res.send("This is Root");
});
app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: "OK" });
    } catch (err) {
        console.log(err);
        res.json({ status: "ERROR", error: "Duplicate Email" });
    }
})

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (user) {
        return res.json({ status: "OK", user: true });
    } else {
        return res.json({ status: "ELSE", user: false });
    }
})


// if there is no line here, Node Server will not run forever
app.listen(1337, () => {
    console.log("Node Server running on port 1337");
})