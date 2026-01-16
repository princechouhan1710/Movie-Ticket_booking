let express = require("express");
const errorhandler = require("./middlewares/errorhandler.js");
const cors = require("cors");
const bodyparser = require("body-parser");

let app = express();

const ConnectDB = require("./config/db.js")
require("dotenv").config();

ConnectDB()


// app.use(bodyparser.urlencoded());
// app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.use(cors({
//     "origin": ["http://127.0.0.1:5500/"]
// }))

app.use(cors({
  origin: ["http://127.0.0.1:5500/","http://localhost:5173","http://localhost:5174","http://localhost:5175","http://localhost:5176"]
}));

// let path = require("path")
// let uploadpath = path.join(__dirname, "/uploads");
// app.use(express.static(uploadpath))
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



let UserRoute = require("./routes/userRoutes.js");
let movieRoute = require("./routes/movieRoute.js");
let theatresRoute = require("./routes/theatresRoute.js");
let showRoute = require("./routes/showRoute.js");

app.use("/api/user/", UserRoute)
app.use("/api/movie", movieRoute)
app.use("/api/theatres", theatresRoute)
app.use("/api/show", showRoute)



app.use(errorhandler)

app.listen(4000, (err) => {
  console.log(err || "Server Run Port 4000")
})

