const getPagination = (requestParams) => {
    if (!requestParams) return {}
    return {
        page: requestParams.page ? requestParams.page : 1,
        limit: requestParams.limit ? requestParams.limit : 25,
    }
}

module.exports = {
    getPagination,
}
