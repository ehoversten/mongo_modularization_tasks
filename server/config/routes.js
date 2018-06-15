const mongoose = require('mongoose');
// let Task = mongoose.model('Task', TaskSchema);
let path = require("path");

let TaskController = require("../controllers/TaskController.js");

module.exports = function(app) {

  // app.get('/', (req, res) => {
  //   console.log("Hit root route");
  //   return res.render('index');
  // });

  app.get("/", TaskController.dashboard);
  app.get("/dashboard", TaskController.display_all);
  app.get("/new", TaskController.new_task);
  app.post("/create", TaskController.create);
  app.get("/task/:id", TaskController.find_one);
  app.get("/task/edit/:id", TaskController.edit);
  app.post("/task/:id", TaskController.update);
  app.post("/task/:id/delete", TaskController.destroy);


}
