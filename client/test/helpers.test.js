const { replaceById } = require("../src/helpers.js")

describe("takes array of objects and replaces indicated object", () => {
    test("{cheese: 2} becomes {cheese:5}", () => {
        expect(replaceById([{ id: 1 }, { id: 5 }, { id: 2 }], { things: 1, id: 5 })).toEqual([
            { id: 1 },
            { things: 1, id: 5 },
            { id: 2 },
        ])
    })
    test("if no match found, return unmodified array", () => {
        expect(replaceById([{ id: 1 }, { id: 2 }], { id: 5 })).toEqual([{ id: 1 }, { id: 2 }])
    })
})
