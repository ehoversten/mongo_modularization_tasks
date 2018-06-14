// Require our database and models

const Task = require('mongoose').model('Task');
// const mongoose = require('mongoose');
// const Task = mongoose.model('Task', TaskSchema);

class TaskController {

  dashboard(req, res) {
    return res.render('index');
  }

  display_all(req, res) {
    Task.find( {}, (err, task)=> {
      if(task){
				return res.status(200).json(task);
			} else {
				return res.status(404).json("Something went terribly terribly wrong!", err);
			}
    });
  }

  create(req, res) {

  }

  update(req, res) {

  }

  destroy(req, res) {

  }

}

module.exports = new TaskController();
