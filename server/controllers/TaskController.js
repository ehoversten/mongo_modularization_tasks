// Require our database and models

const Task = require('mongoose').model('Task');
// const mongoose = require('mongoose');
// const Task = mongoose.model('Task', TaskSchema);

class TaskController {

  dashboard(req, res) {
    console.log("Hit root route");
    return res.render('index');
  }

  display_all(req, res) {
    Task.find( {}, (err, tasks)=> {
      if(tasks){
				// return res.status(200).json(tasks:'tasks');
        // return res.status(200).json(tasks);
        console.log("Found: ", tasks)
        return res.status(200).render('dashboard', {tasks: tasks});

			} else {
				return res.status(404).json("Something went terribly terribly wrong!", err);
			}
    });
  }

  find_one(req, res) {
    console.log("POST DATA: ", req.params);
    Task.findOne( {_id:req.params.id}, (err, this_task)=> {
    // Task.findById(req.params.id, (err, this_task)=> {
    //
    // })
      if(this_task) {
        console.log("Found: ", this_task);
        // return res.status(200).json(this_task);
        return res.status(200).render('details', {task: this_task});
      } else {
        console.log("Task not found"), err;
        return res.status(404).json("Something went horibbly terribly wrong!", err);
      }
    });
  }


  new_task(req, res) {
    console.log("Hit new task route");
    return res.render('new');
  }

  create(req, res) {
    let task = new Task(req.body);
    console.log("POST DATA: ", req.body);
    task.save(function(errs) {
      if(errs) {
        console.log("Something went wrong", err);
        for(let err in errs.errors) req.flash("errors",errs.errors[err].message);
        // return res.status(404).json("Something went wrong", err);
        return res.status(404).redirect("/new");

      } else {
        console.log("Task created successfully");
        // req.flash("errors","Welcome, "+user.firstName);

        // return res.status(200).json(task);
        return res.status(200).redirect("/dashboard");

      }
    });
  }

  edit(req, res) {
    console.log("hit edit route");
    Task.findOne({_id: req.params.id}, (err, task)=> {
      if(err || !task) {
        console.log("Something went sideways", err);
        return res.redirect('details')
      } else {
        return res.render('edit', {task:task})
      }
    });
  }


  update(req, res) {
    console.log("hit update route");
    Task.findOne({_id: req.params.id}, (err, task)=> {
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed;
      task.save(function(err) {
        if(err) {
          console.log("Something went sideways", err);
          return res.redirect('details');
        } else {
          return res.redirect('/task/'+req.params.id);
        }
      });
    });
  }

  destroy(req, res) {
    console.log("hit distroy route");
    Task.findOne({_id: req.params.id}, (err, task)=> {
      console.log("Found: ", task);
      task.remove(function(err) {
        if(err) {
          console.log("Something went sideways", err);
          return res.redirect('details');
        } else {
          return res.redirect('/dashboard');
        }
      });
    });
  }


}
module.exports = new TaskController();
