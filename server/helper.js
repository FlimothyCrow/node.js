function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage]
}

function emptyOrRows(rows) {
    if (!rows) {
        return []
    }
    return rows
}

function userResponseConverter(arrayOfMemes) {
    let objectToReturn = {}
    objectToReturn["op_user_id"] = arrayOfMemes[0]["op_user_id"]
    objectToReturn["op_username"] = arrayOfMemes[0]["op_username"]
    objectToReturn["memes"] = arrayOfMemes.map((memeObject) => reshapeObject(memeObject))
    return objectToReturn
}

function reshapeObject(obj) {
    console.log(obj)
    let objectToReturn = Object.keys(obj).reduce((accumulator, key) => {
        if (key !== "op_user_id" && key !== "op_username") {
            accumulator[key] = obj[key]
        }
        return accumulator
    }, {})
    return objectToReturn
}

module.exports = {
    getOffset,
    emptyOrRows,
    userResponseConverter,
    reshapeObject,
}
