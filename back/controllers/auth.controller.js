const userQueries = require('../utils/queries/user.queries');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUserAction(request, response) {
    if (!await userQueries.checkExistsUser(request.body.email)) {
        const hashed_password = await hash(request.body.password, 10);
        const id = await userQueries.createUser(request.body.email, hashed_password, request.body.username);
        if (id != null) {
            console.log('[',request.ip,'] CREATED User: ', id);
            response.status(200).json({info: "user created successfully", created_user: await userQueries.getUserById(id)});
        }
        else {
            response.status(400).json({error: "invalid request"});
        }
    }
    else {
        response.status(400).json({error: "email already taken"});
    }
}

async function loginUserAction(request, response) {
    const user = await userQueries.getUserByEmail(request.body.email);
    if (user != null && await compare(request.body.password, user.password_hash)) {
        const token = jwt.sign({user_id: user.id}, process.env.SECRET_KEY, { expiresIn: '1h' });
        if (token != null) {
            console.log('[',request.ip,'] LOGGED IN User: ', user.id);
            response.status(200).json({info: "user logged in successfully", token: token, user_id: user.id, admin: user.admin});
        }
        else {
            response.status(400).json({error: "invalid request"});
        }
    }
    else {
        response.status(400).json({token: null});
    }
}

module.exports = {
    createUserAction,
    loginUserAction
};
