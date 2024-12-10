const express = require("express");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (request, response) => {
  response.render("home.ejs", {})
})
app.get("/record", (request, response) => {
  response.render("record.ejs", {})
})
app.get("/help", (request, response) => {
  response.render("help.ejs", {})
})

app.listen(7777, function () {
  console.log("App listening on port 7777")
})