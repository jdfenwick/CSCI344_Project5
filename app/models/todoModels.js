var mongoose = require("mongoose"),
    ToDoSchema,
    ToDo;

mongoose.connect("mongodb://localhost/development");

ToDoSchema = new mongoose.Schema({
    "task": String,
    "category" : String
});

Person = mongoose.model("ToDo", ToDoSchema);

ToDo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var p = new ToDo({
	    "task": "Invent new app",
	    "category": "work"
	});

	p.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = ToDo;

