const fs = require("fs");
const path = require("path");

exports.generateName = () => {
    var randomI1 = Math.floor(Math.random() * (100000));
    const toAdd1 = (5 - randomI1.toString().length) * '0';
    randomI1 = (randomI1.toString().length === 5) ? randomI1 : toAdd1 + randomI1.toString();

    var randomI2 = Math.floor(Math.random() * (100000));
    const toAdd2 = (5 - randomI2.toString().length) * '0';
    randomI2 = (randomI2.toString().length === 5) ? randomI2 : toAdd2 + randomI2.toString();

    const fileName = "photo-" + randomI1 + "-" + randomI2;

    if(exports.findFile(fileName) === null) {
        return fileName;
    } else {
        const newName = exports.generateName();
        return newName;
    }
}

exports.findFile = (imageName) => {

    let extFound = '';
    const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.raw'];
    const samplePath = path.join(path.normalize(__dirname + '/..'), "public", "files", imageName);

    extensions.forEach(extension => {
        if (fs.existsSync(samplePath + extension)) {
            extFound = extension;
        }
    });

    if(extFound != '') {
        return samplePath + extFound;
    } else {
        return null;
    }

}