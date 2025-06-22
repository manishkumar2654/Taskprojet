const AdminModel = require("../models/adminModel");
const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel");
const userPassword = require("../middelewares/randomPassword");
var nodemailer = require("nodemailer");

const adminLogin = async (req, res) => {
  const { adminid, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ id: adminid });

    if (!admin) {
      res.status(401).send({ msg: "in valid id" });
    }

    if (admin.password != password) {
      res.status(401).send({ msg: "invalid password paswar daloo" });
    }

    res.status(200).send({ admin: admin, msg: "login sucessfull" });
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (req, res) => {
  const { name, email, designation } = req.body;

  const UserPass = userPassword();
  // // console.log(userPass);

  const User = await UserModel.create({
    name: name,
    email: email,
    designation: designation,
    password: UserPass,
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hairbymanish@gmail.com",
      pass: "",
    },
  });

  var mailOptions = {
    from: "hairbymanish@gmail.com",
    to: email,
    subject: "Sending Email by Admin",
    text: `Welcome :  ${name}!\n
           Your Password : ${UserPass} \n You can Login With This Password `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Succ sent: " + info.response);
      res.send(info.response);
    }
  });
};

const showUserData = async (req, res) => {
  try {
    const User = await UserModel.find();
    res.status(201).send(User);
  } catch (error) {
    console.log(error);
  }
};

const assignTask = async (req, res) => {
  const { title, description, complday, userid } = req.body;
  // console.log(complday);
  // res.send("olllll")
  try {
    const Task = await TaskModel.create({
      title: title,
      description: description,
      comday: complday,
      userid: userid,
    });

    res.status(201).send({ msg: "user task Succesful assing" });
  } catch (error) {
    console.log(error);
  }
};



const taskDetail=async(req, res)=>{
  try {
     const Task= await TaskModel.find().populate("userid");
     res.status(200).send(Task);
  } catch (error) {
    console.log(error);
  }
}

const changeTaskStatus=async(req,res)=>{
  const {id} = req.query;
  try {
    const Task = await TaskModel.findByIdAndUpdate(id, {
      taskstatus:false
    })
    res.status(201).send("succesfull update ");
  } catch (error) {
    console.log(error);
    
  }
}

const deleteTask = async(req,res)=>{
  const {id} = req.query;

  try {
    await TaskModel.findByIdAndDelete(id);
    res.send("successfully Deleted")
  } catch (error) {
    console.log(error);
  }
  
}


module.exports = {
  adminLogin,
  createUser,
  showUserData,
  assignTask,
  taskDetail,
  changeTaskStatus,
  deleteTask
};
