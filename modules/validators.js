const path = require("path");

exports.isValid = file => {
	return validateSize(file) && validateType(file);
};

function validateSize(file) {
	if (file.size <= 50000000) {
		return true;
	} else {
		console.log("The file was too heavy");
		return false;
	}
}

function validateType(file) {
	const extensions = [
		".png",
		".jpg",
		".jpeg",
		".svg",
		".gif",
		".raw",
		".mp4",
		".mpeg",
	];
	if (extensions.includes(path.extname(file.name))) {
		return true;
	} else {
		console.log("The file format was not supported");
		return false;
	}
}
