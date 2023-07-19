const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/urlDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  shortUrl: String,
  url: String,
});

const URL = mongoose.model("URL", urlSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/short", (req, res) => {
  res.send("Hello, short!");
});

app.post("/submit", function (req, res) {
  var url = req.body.url;
  var custom = req.body.custom;
  console.log(url);
  console.log(custom);
  function generateShortUrl() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let shortUrl = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrl += characters[randomIndex];
    }
    return shortUrl;
  }

  async function saveUrl(custom, url) {
    if (custom === undefined) {
      const shortUrl = generateShortUrl();
      const existingUrl = await URL.findOne({ shortUrl });
      if (existingUrl) {
        console.log("Short URL already exists in the database.");
        res.render("failure", {
          message: "Short URL already exists in the database.",
        });
      } else {
        const newUrl = new URL({
          shortUrl,
          url,
        });
        await newUrl.save();
        console.log("Short URL generated and saved:", shortUrl);
        res.render("success", { shortUrl: "ushort/" + shortUrl });
      }
    } else {
      const existingUrl = await URL.findOne({ shortUrl: custom });
      if (existingUrl) {
        console.log("Custom URL already exists in the database.");
        res.render("failure", { message: "Custom Code already exists" });
      } else {
        const newUrl = new URL({
          shortUrl: custom,
          url,
        });
        await newUrl.save();
        console.log("Custom URL saved:", custom);
        res.render("success", { shortUrl: "ushort/" + custom });
      }
    }
  }

  saveUrl(custom, url)
    .then(() => {
      console.log("URL saved successfully.");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/:custom", async (req, res) => {
  const custom = req.params.custom;
  const url = await URL.findOne({ shortUrl: custom });

  if (url) {
    try {
      res.redirect(301, url.url);
    } catch (error) {
      res
        .status(404)
        .render("failure", {
          message:
            "Error 404 : No such URL found Maybe the url is updated or deleted",
        });
    }
  } else {
    res
      .status(404)
      .render("failure", {
        message:
          "Error 404 : No such URL found Maybe the url is updated or deleted",
      });
  }
});

app.listen(80, "ushort", () => {
  console.log("Server is running at http://ushort/");
});
