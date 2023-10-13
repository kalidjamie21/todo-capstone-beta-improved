import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const PORT = process.env.PORT || 3000

let tasksArrToday = []
let tasksArrWork = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

function createList (taskArray, request, response, ejsView) {
    let taskLabel = request.body["task"]
    taskArray.push(taskLabel)
    response.render(ejsView, {
        tasks: taskArray
    })
}

app.get("/", (req, res) => {
    res.render("index.ejs", {
        tasks: tasksArrToday
    })
})

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        tasks: tasksArrWork
    })
})

app.post("/", (req, res) => {

    createList(tasksArrToday, req, res, "index.ejs")

})

app.post("/work", (req, res) => {

    createList(tasksArrWork, req, res, "work.ejs")

})

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`)
})

