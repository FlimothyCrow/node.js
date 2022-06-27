module.exports = {
    replaceById,
}

function replaceById(arrayOfObjs, newObj) {
    return arrayOfObjs.map((obj) => {
        if (obj.id === newObj.id) {
            return newObj
        } else {
            return obj
        }
    })
}

// iterate through arrayOfMemeObjs
// if iterMemeObj.id === memeObj.id replace in array
// return array
