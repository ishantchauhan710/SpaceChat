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

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    console.log("User Connected: ", userData.userName);

    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log("Chat room: ", room);
  });

  socket.on("newMessage", (newMessageReceived) => {
    var chat = newMessageReceived.messageChat;
    var chatUsers = chat.chatUsers;

    console.log("New Message Received");

    if (!chatUsers) {
      console.log("[ERROR] Undefined chat users");
      return;
    }

    chatUsers.forEach((user,i) => {
     // console.log("Message Sender Id: ", newMessageReceived.messageSender._id);

      //if (user._id == newMessageReceived.messageSender._id) return;

      console.log("\n\n\n\nIteration: ",i)
      console.log("Chat Users: ", user.userName);
      console.log("Message Sender: ", newMessageReceived.messageSender.userName);
      console.log("Message Receiver: ", user.userName);
      console.log("Message Content: ",newMessageReceived.messageContent)
      console.log("Message Chat: ",chat.chatName);
      console.log("-------------------------------");
      
      
      if (user._id != newMessageReceived.messageSender._id) {
          socket.in(user._id).emit("messageReceived", newMessageReceived);
          console.log("Message sent from: ",newMessageReceived.messageSender.userName);
          console.log("Message sent to: ",user.userName);
      };


    
    });
  });
});
