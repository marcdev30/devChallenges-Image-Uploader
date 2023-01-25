const path = require("path");

exports.isValid = file => {
	return validateSize(file) && validateType(file);
};

function validateSize(file) {
	if (file.size <= 5000000) {
		return true;
	} else {
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
	];
	if (extensions.includes(path.extname(file.name))) {
		return true;
	} else {
		return false;
	}
}
