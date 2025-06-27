const express = require('express');
const { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } = require('../controllers/usersControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

const userRoutes = express.Router();

userRoutes.use(isLoggedIn);

userRoutes.get("/", getRecommendedUsers);
userRoutes.get("/friends", getMyFriends);

userRoutes.post("/friend-request/:id", sendFriendRequest);
userRoutes.put("/friend-request/:id/accept", acceptFriendRequest);

userRoutes.get("/friend-requests", getFriendRequests); 

userRoutes.get("/outgoing-friend-requests", getOutgoingFriendRequests);

module.exports = userRoutes;