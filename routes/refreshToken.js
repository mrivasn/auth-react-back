const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { verifyAccessToken, verifyRefreshToken } = require("../lib/verifyTokens");
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const Token = require("../schema/token");
const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.post("/", async(req, res) => {
    const refreshToken = getTokenFromHeader(req.headers);
    if (refreshToken){
        try {
            const found = await Token.findOne({ token: refreshToken});
            if (!found){
                return res.status(401).send(jsonResponse(401, { error: "Unauthorized"}));
            }
            const payload = verifyRefreshToken(found.token);
            if(payload){
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).send(jsonResponse(200, {accessToken}));
            } else {
                return res.status(401).send(jsonResponse(401, { error: "Unauthorized"}));
            }
        } catch (error) {
            return res.status(401).send(jsonResponse(401, { error: "Unauthorized"}));
        }
    } else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized"}));
    }
    res.send("refesh token")
});

module.exports = router;