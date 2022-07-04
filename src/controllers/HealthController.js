const axios = require('axios')

const getTest = (reqParam, response) => {
    try {
       axios.get('https://api.mercadolibre.com/items/MLA1119561622')
       .then(res => {
            response.status(201).send(res.data)
       })
       .catch(e => {
            response.status(400).send(`${e.code}: ${e.message}`)
       })
    } catch (e) {
        return response.status(503).send({
            uptime: process.uptime(),
            message: "We are not good.",
            error: e.message,
            timestamp: Date.now(),
        });
    }
}

const getHealth = (reqParam, response) => {
    try {
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


module.exports = {getTest, getHealth}