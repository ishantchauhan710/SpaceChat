const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { urlNotFoundMiddleware, handleErrorFoundMiddleware } = require("./middlewares/errorMiddleware");

dotenv.config();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);

const PORT = process.env.PORT;

app.use(urlNotFoundMiddleware);
app.use(handleErrorFoundMiddleware);
app.listen(PORT, console.log("Server started on port: ", PORT));
