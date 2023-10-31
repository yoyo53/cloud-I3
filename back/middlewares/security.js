const jwt = require('jsonwebtoken');

exports.verifyToken = async (request, response, next) => {
    let token = request.get("Authorization");
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    if (token) {
        try {
            request.user_id = jwt.verify(token, process.env.SECRET_KEY).user_id;
            next();    
        }
        catch {
            return response.status(401).json('Invalid token');
        }
    } else {
        return response.status(401).json('No token provided');
    }
}
