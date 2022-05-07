<img src="/Screenshots/mockup_hd_1.png" width="100%" />

# SpaceChat :rocket:
**SpaceChat** is a realtime chat app that allows you to chat with your friends in pairs as well as in groups!

#### Here is a live demo
https://spacechatapp.herokuapp.com/

<br>
<img src="/Screenshots/mockup_hd_2.png" width="100%" />

## About :dart:
**SpaceChat** lets you create an account on the server! Once successful, you can click on the + button in chat panel, search for your friends and start chatting with them!

## Project Stack :bulb:
The project at its core is built on MERN Stack which stands for (MongoDB, ExpressJS, ReactJS and NodeJS)
* [ReactJS](https://reactjs.org/docs/getting-started.html) - ReactJS is a javascript library created by Facebook. This library lets you create beautiful web pages in couple of minutes!
* [NodeJS](https://nodejs.org/en/about/) - NodeJS is something that allows you to write javascript code on a server! Traditionally, javascript was only available for frontend design purpose however, with NodeJS, you can use javascript for backend purpose too!
* [ExpressJS](https://expressjs.com/) - ExpressJS is a framework that drastically reduces the amount of backend code we write in NodeJS. It is highly flexible and makes things a lot easier!
* [MongoDB](https://www.mongodb.com/) - MongoDB is a NoSQL Database that unlike SQL, stores data in form of collections!

## Project Features :fire:
* A user can create and login to his or her account
* A user can search for his friends
* A user can send them message in realtime
* A user can create group chat with unlimited number of users
* A user can edit group name and remove others from group
* A user can view profile of other people

<br>

<img src="/Screenshots/mockup_hd_3.png" width="100%" /><br>
**SpaceChat** offers realtime communication! This is achieved using the power of socket.io which is a popular library to establish **bidirectional low-latency communication** between client and server!

<br><br>
<img src="/Screenshots/mockup_hd_4.png" width="100%" /><br>
**SpaceChat** lets you create one to one chats as well as group chats! All you need to do is to create on Group Chat tab in the create chat dialog box then type the group name and add the group members using their username or email, and then you are good to go!

## Screenshots (Desktop) :computer:
|||
|:----------------------------------------:|:-----------------------------------------: |
| ![](Screenshots/landing_page.jpg) | ![](Screenshots/landing_page_modal.jpg)
| ![](Screenshots/single_chat.jpg) | ![](Screenshots/group_chat.jpg)  
| ![](Screenshots/real_time_chat.jpg) | ![](Screenshots/profile_modal.jpg) 
| ![](Screenshots/create_single_user_chat.jpg) | ![](Screenshots/create_group_user_chat.jpg) 

## Screenshots (Mobile) :iphone:
||||
|:----------------------------------------:|:-----------------------------------------:|:-----------------------------------------: |
| ![](Screenshots/Mobile/login_modal.jpeg) | ![](Screenshots/Mobile/inbox.jpeg) | ![](Screenshots/Mobile/chat_screen.jpeg)
| ![](Screenshots/Mobile/create_group_chat_modal.jpeg) | ![](Screenshots/Mobile/profile_modal.jpeg) | ![](Screenshots/Mobile/profile_logout_popup_menu.jpeg) 

## Supporting Libraries / Frameworks / Packages used &nbsp; 🛠
* [Socket.io](https://socket.io/) - Socket.io is a library that in simple words allows you to send and recieve data from server without having need to refresh the page, using the concept of WebSockets!
* [MaterialUI](https://mui.com/) - MaterialUI is a ReactJS library developed by google that lets you create beautiful UI elements in a quick go!
* [React Router DOM](https://v5.reactrouter.com/web/guides/quick-start) - React Router DOM is a NPM package that easily lets you tell the app about which web page or screen component to render depending upon a particular URL
* [Mongoose](https://mongoosejs.com/) - Mongoose is a library that enables you to easily implement MongoDB in your code
* [Lottie React](https://www.npmjs.com/package/lottie-react) - Lottie React is an npm package that lets you render Lottie JSON animations on the web page
* [Axios](https://www.npmjs.com/package/axios) - Axios is an NPM package that lets you easily send HTTP requests to a particular URL
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) - It is a package that lets you make use of JWT authentication in your app
* [BCryptJS](https://www.npmjs.com/package/bcryptjs) - This is an NPM package that lets you encrypt the passwords before you store them on the server
* [DotENV](https://www.npmjs.com/package/dotenv) - This NPM package lets you securely create environment variables in .env file

## Project Setup :pencil:
If you want to clone this project and customize it further, you need to do a couple of tasks first:
* Create an account on [Mongo DB Cloud](https://cloud.mongodb.com/) if you don't have any hosting to create the database. Or install MongoDB on your hosting in case you have one
* Create an account on [Cloudinary](https://cloudinary.com/). It is the place where we will store the profile pictures of all the users.
* Clone this project. You can directly download the source code, or you can use the CLI in terminal
* Once successful, open your terminal in the project folder and write npm install
* Then, go to the frontend directory by typing cd frontend and then again, write npm install
* After this, in the root folder of the project, create a new file with the exact name of ".env"
* In the .env file, write:<br><br>

```
PORT = 5000
MONGO_URI=mongodb+srv://YOUR_MONGO_CLOUD_USERNAME:YOUR_MONGO_CLOUD_PASSWORD@cluster0.p5xoz.mongodb.net/Cluster0?retryWrites=true&w=majority
NODE_ENV=development
JWT_CODE=abc123xyz987
```

* In signupFunctions.js, inside const configureProfilePicture function, change fetch() url to https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_ACCOUNT_USERNAME/image/upload and ensure you have enabled unsigned uploads on your cloudinary console
* In endpoints.js in frontend folder, change BASE_URL to localhost:5000/
* In server.js in backend folder, set const io cors origin url to localhost:5000/
* Save the file and then in frontend and backend terminal, write npm start and enjoy the project :)
<br>

#### Production Build :computer:
* To build the project for production purpose, In .env file, set NODE_ENV to production
* In terminal, open the frontend folder and write npm run build
* Once the build is completed, move back to root directory of folder by writing cd .. and then start the server again to test the code in production mode

## Project Purpose :checkered_flag:
The purpose of this project is to demonstrate how a person can
* Implement user authentication and authorization in a NodeJS app using [JWT](https://jwt.io/) and Bearer Token
* Implement [WebSockets](https://en.wikipedia.org/wiki/WebSocket) in the app using [socket.io](https://socket.io/)
* Implement [MaterialUI](https://mui.com/), [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) and [CSS Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) to create beautiful UI Components
* Implement [MongoDB](https://www.mongodb.com/) in the app to store user accounts and their corresponding chats and messages
* Implement Backend [Routing](https://en.wikipedia.org/wiki/Routing#:~:text=Routing%20is%20the%20process%20of,networks%2C%20such%20as%20the%20Internet.) using routes, middlewares and controllers with NodeJS
* Implement Frontend Routing using [React Router DOM](https://v5.reactrouter.com/web/guides/quick-start)
* Create a [Restful API](https://en.wikipedia.org/wiki/Representational_state_transfer) in NodeJS
* Perform [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on data in MongoDB
* Store media data like user profile pictures on a cloud storage like [cloudinary](https://cloudinary.com/)
* Deploy the app on a cloud hosting like [heroku](https://www.heroku.com)

## Project Architecture and Structure :open_file_folder:
<img src="/Screenshots/app_architecture_hd.png" width="100%" /><br>

    # Root Package
    .
    ├── backend             # All our backend code
    |   ├── config          # Configuration files like db.js to configure MongoDB
    |   ├── constants       # Files with some constant data like default profile picture url
    |   ├── controllers     # Files that contain all our logic corresponding to specific routes
    │   ├── middlewares     # Contains files like authMiddleware which will check whether user is authenticated or not on any incoming request
    │   ├── models          # Files that define the structure of each user, chat and message in MongoDB
    │   ├── routes          # Defines endpoints of our backend
    │   ├── util            # Utility files for generating JWT token and enhancing the workflow of project
    │   └── server.js       # Main backend file that starts our server and binds everything together
    |
    ├── frontend            # All our frontend code
    |   ├── build           # Folder that binds our backend code for production purpose, to generate it, use npm run build
    │   ├── public          # Contains files that can be accessed publically such as index.html
    │   └── src             # Our core frontend code consisting of all views and react components
    |
    |
    └── ProcFile            # [Optional] Used to deploy the app on heroku
    
    
    # ReactJS frontend -> src
    .
    ├── src                 # Our core frontend code consisting of all views and react components
    |   ├── data            # Contains data files for lottie json animations, color codes and themes
    |   ├── constants       # Contains constant files like auth configurations and url endpoints
    |   ├── components      # Contains UI component files for dialog boxes, snackbars, single user in inbox etc
    │   ├── pages           # Contains files to represent the screen for each route like LandingPage.js for '/', HomePage.js for '/home' etc
    │   ├── logic           # Contains folders and files to represent the frontend business logic for fetching data from our backend API
    │   ├── util            # Contains utility functions for formatting strings and dates
    │   ├── styles          # Contains javascript style configurations for dialog boxex / modals
    │   ├── stylesheets     # Contains CSS files for each view component
    │   ├── App.css         # CSS file to provide a common styling to our app such as font family and box sizing
    │   ├── index.css       # Currently of no use, however you can use it to provide a global style to your app
    │   ├── App.js          # Our main frontend ReactJS file that is executed when server starts
    │   ├── AppContext.js   # ReactJS ContextAPI file to allow all components access a particular react state easily
    │   └── index.js        # A ReactJS file to render all the data on web page
    └──

## Deploying Project on Heroku :heavy_check_mark:
It is super easy to deploy the project on heroku! <br>
* Make sure you have comitted your project using git after running the npm run build command. 
* Then, create an account on www.heroku.com
* Install heroku CLI. For windows, you can simply download it and in case of linux, in terminal, write:
```
sudo snap install --classic heroku
```

And then, in VSCode Terminal, write:

```
cd frontend
npm run build
cd ..
heroku login
heroku create YOURAPPNAME
git push heroku master
```
And then open your heroku URL to see the website running live :)


#### Note :bangbang:
* The heroku website link that I have provided for this project on the top may run slow when you open it for the first time. It is also possible that you may see an empty red snackbar. This is because of slow internet connection or timeout error. This error will go away on its own if you wait for 1-2 minutes after opening the heroku link and then reload the web page
* WebSockets / Realtime Communication Feature will not work on mobile devices as websockets are not forwarded by the http proxy. If you want to establish realtime communication on mobile devices, you can create an android or iOS app to do so and use the websocket libraries to achieve realtime communication
* Sometimes you may see that the message sent is appearing twice in the chat! This may be possibly due to either slow internet connection or slow server. However, to get rid of this error, you can simply refresh the page!

## Contact
For any queries, you can mail me at developerishant710@gmail.com

