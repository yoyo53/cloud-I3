const userQueries = require('../utils/queries/user.queries');
const jwt = require('jsonwebtoken');

async function getUserAction(request, response) {
    const user = await userQueries.getUserById(request.user_id);
    if (user != null) {
        console.log('[',request.ip,'] FETCHED User: ', user.id);
        response.status(200).json({user: user});
    }
    else {
        response.status(400).json({error: "invalid request"});
    }
}

async function updateUserAction(request, response) {
    const user_id = await userQueries.updateUser(request.user_id, request.body.username, request.body.about, request.body.phone, request.body.mess_notif, request.body.conv_notif, request.body.offer_notif, request.body.phone_notif);
    if (user_id != null) {
        console.log('[',request.ip,'] UPDATED User: ', user_id);
        response.status(200).json({info: "user updated successfully", user_id: user_id});
    }
    else {
        response.status(400).json({error: "invalid request"});
    }
}

async function deleteUserAction(request, response) {
    const user_id = await userQueries.deleteUser(request.user_id);
    if (user_id != null) {
        console.log('[',request.ip,'] DELETED User: ', user_id);
        return response.status(200).json({info: 'user deleted successfully', user_id: user_id});
    }
    else {
        response.status(400).json({error: "invalid request"});
    }
}

module.exports = {
    getUserAction,
    updateUserAction,
    deleteUserAction
};
