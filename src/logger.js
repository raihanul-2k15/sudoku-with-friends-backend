function logTrafficOrigin(req, res, next) {
    if (req.method === "GET" && req.path === "/") {
        console.log("Visit from IP: " + req.ip);
    }
    next();
}

module.exports = {
    logTrafficOrigin,
};
