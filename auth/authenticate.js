const { decode } = require("jsonwebtoken");
const { jsonResponse } = require("../lib/jsonResponse");
const { verifyAccessToken } = require("../lib/verifyTokens");
const getTokenFromHeader = require("./getTokenFromHeader");

function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);

    if(token){
        const decoded = verifyAccessToken(token);
        if(decoded){
            console.log("decode: "+decode);

            req.user = { ... decoded.user };
            next();
        } else {
            res.status(401).json(jsonResponse(401, { messaje: "No token provided"}));
        }
    } else {
        res.status(401).json(jsonResponse(401, { messaje: "No token provided"}));
    }
}

module.exports = authenticate;