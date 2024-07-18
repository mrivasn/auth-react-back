const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose")

require("dotenv").config();

const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

async function main (){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to Mongo DB");
}

main().catch(console.error);

app.use("/api/signup", require("./routes/signup"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/login", require("./routes/login"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/user", require("./routes/user"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});