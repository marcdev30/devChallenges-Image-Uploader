const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const fileName = require(path.join(__dirname, "modules/fileName.js"));
const validators = require(path.join(__dirname, "modules/validators.js"));

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.get("/share/:imageName", function(req, res) {
    const imageName = req.params.imageName;

    const imagePath = fileName.findFile(imageName);

    if(imagePath != null) {
        const extension = imagePath.split('.')[1];
        res.render("share.ejs", {imageName: imageName, extension: extension});
    } else {
        res.redirect("/");
    }
});

app.get("/:imageName", function(req, res) {
    const imageName = req.params.imageName.split('_')[0];

    const imagePath = fileName.findFile(imageName);

    if(imagePath != null) {
        res.sendFile(imagePath);
    } else {
        res.redirect("/");
    }
})

app.post("/upload", fileUpload({createParentPath: true}), (req, res) => {
    const files = req.files;
    const file = files[Object.keys(files)[0]];

    validators.isValid(file);

    if(validators.isValid(file)) {
        const name = fileName.generateName();

        const extension = file.name.split('.')[1];
    
        const filePath = path.join(__dirname, 'public', 'files', name + "." + extension);
    
        file.mv(filePath, (err) => {
            res.redirect("/share/" + name);
    
            if(err) {
                console.log(err);
            }
        });
    
    } else {
        res.redirect("/");
    }

    

    
});


app.listen(PORT, () => {
    console.log("Server listening in " + PORT);
});