const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const PORT = 3000
//models
const TodoTask = require("./models/TodoTask")

dotenv.config({ path: "./.env" })

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
// mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log('Connected to DB!');
// app.listen(3000, () => console.log("Server is up and running!"));})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})

// mongoose
// .connect(process.env.MONGODB_URI, {
// useNewUrlParser: true,
// //useCreateIndex: true,
// useUnifiedTopology: true,
// //useFindAndModify: false,
// })
// .then(() => console.log("MongoDB connected!"))
// .catch(err => console.log(err))






app.set("view engine", "ejs")


// GET
app.get('/', (req, res) =>{
    TodoTask.find({}, (err, tasks) =>{
        res.render('todo.ejs', { todoTasks: tasks});
    })
})



app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/')
    }
});

//UPDATE
app
.route('/edit/:id')
.get((req, res)=> {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render('todoEdit.ejs', {todoTasks: tasks, idTask: id});
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect('/');
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
    