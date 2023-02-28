//jshint esversion:6
require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL);
const itemsSchema = {
  name: String,
};
const FolderName = mongoose.model("folderName", itemsSchema);
const FolderName1 = new FolderName({
    name: "Work",
});
const FolderName2 = new FolderName({
    name: "Work",
});
const FolderName3 = new FolderName({
    name: "Work",
});
const defaultfolders = [FolderName1, FolderName2, FolderName3];

const FolderSchema = {
  name: String,
  foldername: [FolderSchema],
};
const FolderList = mongoose.model("FolderList", FolderSchema);

app.get("/", function (req, res) {
  FolderName.find({}, function (err, foundFolders) {
    if (foundFolders.length === 0) {
      FolderName.insertMany(defaultfolders, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { newFolderList: foundFolders });
      console.log(foundFolders);
    }
  });
});
app.post("/delete", function (req, res) {
  
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started Successfully");
});
app.use("/",router);
module.exports.handler = serverless(app);