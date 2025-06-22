const express = require("express");
const route = express.Router();
const AdminController= require("../controllers/AdminController")

route.post("/logincheck", AdminController.adminLogin);
//route.post("/usercreation", AdminController.createUser);
route.post("/usercreation", AdminController.createUser);
route.get("/showuserdata", AdminController.showUserData);
route.post("/assigntask", AdminController.assignTask);
route.get("/taskdetail", AdminController.taskDetail);
route.get("/changetaskstatus", AdminController.changeTaskStatus);
route.get("/deleteTask", AdminController.deleteTask);

 









module.exports=route;