const Messages = require('../model/messageModel')

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: { from, to },
            sender: from,
        });
        if (data) {
            return res.json({
                msg: "Message added successfully!@"
            })
        }
        return res.json({
            msg: "Failed to add message!!!"
        })

    }
    catch (err) {
        next(err);
    }
}

module.exports.getAllMessage = async (req, res, next) => {
    const mongoose = require('mongoose');



    try {
        console.log("in here getAllMessage")
        console.log(req.body);
        const { from, to } = req.body;
        console.log("From:", from);
        console.log("To:", to);

        if (!mongoose.isValidObjectId(from) || !mongoose.isValidObjectId(to)) {
            return res.status(400).json({ message: "Invalid user IDs provided." });
        }


        // const messages = await Messages.find({
        //     users: {
        //         $all: [from, to],
        //     }
        // }).sort({
        //     updatedAt: 1
        // });


        const messages = await Messages.find({
            "users.from":{ $in: [from, to] },  
            "users.to": { $in: [from, to] }
        }).sort({ updatedAt: 1 });


        // const messages = await Messages.aggregate([
        //     {
        //         $match: {
        //             users: { $all: [from, to] }
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             message: 1,
        //             fromSelf: { $eq: [ "$sender", from ] }  // Check if sender is the 'from' user
        //         }
        //     },
        //     { 
        //         $sort: { updatedAt: 1 } 
        //     }
        // ]);


        // const messages = await Messages.find({
        //     $or: [
        //         { users: [from, to] },  // Exact match (if order matters)
        //         { users: [to, from] }   // Reverse order
        //     ]
        // }).sort({ updatedAt: 1 });


        console.log("messages found:", messages);
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        })
        console.log("0909090909", projectMessages)
        res.json(projectMessages);
    }
    catch (err) {
        console.log(err);
        next(err);

    }
}