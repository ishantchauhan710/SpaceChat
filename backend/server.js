const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const {
  urlNotFoundMiddleware,
  handleErrorFoundMiddleware,
} = require("./middlewares/errorMiddleware");

dotenv.config();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT;

app.use(urlNotFoundMiddleware);
app.use(handleErrorFoundMiddleware);

const server = app.listen(PORT, console.log("Server started on port: ", PORT));

const io = require("socket.io")(server, {
  pingTimeout: 50000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection",(socket) => {
  console.log("Connected to socket.io");
})
