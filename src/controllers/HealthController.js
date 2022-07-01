const getHealth = (reqParam, response) => {
    try {
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send({
            uptime: process.uptime(),
            message: "It's all fine.",
            timestamp: Date.now(),
        });
    } catch (e) {
        return response.status(503).send({
            uptime: process.uptime(),
            message: "We are not good.",
            error: e.message,
            timestamp: Date.now(),
        });
    }
}


module.exports = {getHealth}