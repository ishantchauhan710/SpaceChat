const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');

const searchUserController = expressAsyncHandler(async(req,res) => {
    const searchKeyword = req.query.search?{
        $or:[
            {sc_userName:{$regex:req.query.search, $options: "i"}},
            {sc_userEmail:{$regex:req.query.search, $options: "i"}}
        ]
    }:{}

    const users = await User.find(searchKeyword).find({
        _id:{$ne: req.user._id} // Exclude our own id from search results
    })
    
    res.send(users);
})

module.exports = {searchUserController}
