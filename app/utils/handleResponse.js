const handleSuccess = (data, statusCode) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    }
}

const handleError = (data, statusCode) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    }
}

module.exports = {
    handleSuccess,
    handleError,
}
