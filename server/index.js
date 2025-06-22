const express = require("express");
const app = express();
require("dotenv").config();
const AdminRoute = require("./routes/adminRoute");
const UserRoute = require("./routes/userRoute")
const bodyParser = require("body-parser");
const cors = require("cors");
const Port = process.env.PORT || 8000;

const Dbcon = require("./config/dbconn");


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use(cors());
Dbcon()

app.use("/admin", AdminRoute);
app.use("/user", UserRoute);

app.listen(Port, () => {
  console.log(`server run on ${Port}`);
});
