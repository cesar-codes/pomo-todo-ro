const express = require("express");
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose");
//models
const TodoTask = require("./models/TodoTask")

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
//mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT).then(()=>{console.log('Connected to DB!');
app.listen(3000, () => console.log("Server is up and running!"));})

app.set("view engine", "ejs")

app.get('/', (req, res) =>{
    //res.send('Hello World!')
    res.render('todo.ejs')
})

app.post('/', (req, res) => {
    console.log(req.body)
});


