var ToDo = require("../models/todoModels.js"),
    ToDoController = {};

ToDoController.list = function (req, res) {
    ToDo.find({}, function (err, people) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(todo);
	}
    });
};

ToDoController.create = function (req, res) {
    var p = new ToDo({
	"task":req.body.task,
	"category":req.body.category
    });

    p.save(function (err, result) {
	if (err !== null) {
    console.log(err);
	    //send the error
	} else {
	    res.json(result);
	}
    });
};

//ToDoController.destroy = function (req, res) {
//    ToDo.findOne({"task":req.body.task, function (err, todo) {
//	if (err !== null) {
//    console.log(err);
//	    //handle err
//	} else if (todo === null) {
	    //todo not found
//	} else {
//	    todo.remove(function (err) {
//		if (err !== null) {
//      console.log(err);
		    //handle err
//		}
//	    });
//	}
//    });
//};

module.exports = ToDoController;
