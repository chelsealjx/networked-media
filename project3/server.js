const express = require("express");
let app = express();

const parser = require("body-parser");
const encodedParser = parser.urlencoded({ extended: true });

const multer = require("multer");
const uploadProcessor = multer({ dest: "public/upload" });

app.use(express.static("public"));
app.use(encodedParser);

app.set("view engine", "ejs");


app.get("/", (request, response) => {
  response.render("home.ejs", {})
})
app.get("/about", (request, response) => {
  response.render("about.ejs", {})
})
app.get("/photography", (request, response) => {
  response.render("photography.ejs", {})
})
app.get("/entertainment", (request, response) => {
  response.render("entertainment.ejs", {})
})
app.get("/explore", (request, response) => {
  response.render("explore.ejs", {})
})
app.get("/family", (request, response) => {
  response.render("family.ejs", {})
})
app.get("/food", (request, response) => {
  response.render("food.ejs", {})
})
app.get("/friends", (request, response) => {
  response.render("friends.ejs", {})
})
app.get("/pets", (request, response) => {
  response.render("pets.ejs", {})
})
app.get("/other", (request, response) => {
  response.render("other.ejs", {})
})
app.get("/submit", (request, response) => {
  let dataContainer = {
    posts: allPosts,
  };
  response.render("submit.ejs", dataContainer);
});

let allPosts = [];
app.post("/submit", uploadProcessor.single("myImage"), (request, response) => {
  let now = new Date();
  let post = {
    cap: request.body.caption,
    date: now.toLocaleString(),
    image: request.file ? request.file.filename : null
  };
  if (request.file) {
    post.image = request.file.filename;
  } else {
    post.image = null;
  }

  allPosts.push(post);

  response.redirect("/submit");
});
app.post("/delete", (request, response) => {
  allPosts = [];
  response.redirect("/submit");
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});