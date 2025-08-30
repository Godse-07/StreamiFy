const FriendRequest = require("../model/FriendRequest");
const User = require("../model/User");

const getRecommendedUsers = async (req, res)=>{
    try{
        const userId = req.user.id;
        const currentUser = await User.findById(userId).select("-password");
        const recommentedUsers = await User.find({
            $and: [
                { _id: { $ne: userId } }, //exclude current user
                { _id: { $nin: currentUser.friends } }, // exclude current user's friends
                { isOnboarded: true },
            ],
        })
        res.status(200).json({
            success: true,
            message: "Recommended users fetched successfully",
            recommendedUsers: recommentedUsers
        });
    }catch(error){
        console.error("Error in getRecommendedUsers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


const getMyFriends = async (req, res)=>{
    try{
        const userId = req.user.id;
        const currentUser = await User.findById(userId).select("-password");
        if(!currentUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const friends = await User.find({
            _id: { $in: currentUser.friends }, // Find users whose IDs are in the current user's friends array
            isOnboarded: true // Only include users who have completed onboarding
        })
        return res.status(200).json({
            success: true,
            message: "Friends fetched successfully",
            friends: friends
        })
    }catch(error){
        console.error("Error in getMyFriends:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const sendFriendRequest = async (req, res)=>{
    try{
        const myId = req.user.id;
        const { id } = req.params;
        if(id === myId){
            return res.status(400).json({
                success: false,
                message: "You cannot send a friend request to yourself"
            });
        }
        const recipientUser = await User.findById(id);
        if(!recipientUser){
            return res.status(404).json({
                success: false,
                message: "Recipient user not found"
            });
        }
        if(recipientUser.friends.includes(myId)){
            return res.status(400).json({
                success: false,
                message: "You are already friends with this user"
            });
        }
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: id },
                { sender: id, recipient: myId }
            ]
        })
        if(existingRequest){
            return res.status(400).json({
                success: false,
                message: "Friend request already exists"
            });
        }
        const newFriendRequest = await FriendRequest.create({
            sender: myId,
            recipient: id,
            status: "pending"
        })
        res.status(201).json({
            success: true,
            message: "Friend request sent successfully",
            friendRequest: newFriendRequest
        })
    }catch(error){
        console.error("Error in sendFriendRequest:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const acceptFriendRequest = async (req, res)=>{
    try{
        const myId = req.user.id;
        const { id } = req.params;
        const friendRequest = await FriendRequest.findOne({
            sender: id,
            recipient: myId,
        })
        if(!friendRequest){
            return res.status(404).json({
                success: false,
                message: "Friend request not found"
            })
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        // Add each other to friends list
        const currentUser = await User.findById(myId);
        const friendUser = await User.findById(id);
        
        if(!currentUser || !friendUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        currentUser.friends.push(id);
        friendUser.friends.push(myId);

        await currentUser.save();
        await friendUser.save();

        res.status(200).json({
            success: true,
            message: "Friend request accepted successfully",
            friendRequest: friendRequest,
        })

    }catch(error){
        console.error("Error in acceptFriendRequest:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getFriendRequests = async (req, res)=>{
    try{
        const incomingReqests = await FriendRequest.find({
            resipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePicture");

        res.status(200).json({
            success: true,
            message: "Friend requests fetched successfully",
            incomingRequests: incomingReqests,
            acceptedRequests: acceptedReqs
        });

    }catch(error){
        console.error("Error in getFriendRequests:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getOutgoingFriendRequests = async (req, res)=>{
    try{
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePicture nativeLanguage learningLanguage");

        res.status(200).json({
            success: true,
            message: "Outgoing friend requests fetched successfully",
            outgoingRequests: outgoingRequests
        });
    }catch(error){
        console.error("Error in getOutgoingFriendRequests:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    getRecommendedUsers,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequests,
    getOutgoingFriendRequests
}