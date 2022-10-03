const {handleResponse} = require("../utils");

module.exports.update = async (event, context) => {
    try {
        const client = JSON.parse(event.body)
        const result = await clientService.update(client)
        return handleResponse.handleSuccess(result, 200)
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.',
            }),
        }
    }
}
