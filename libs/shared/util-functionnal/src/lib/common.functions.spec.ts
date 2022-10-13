import {testModule} from"./integer.functions";

describe('functionnal general ', () => {
    it("it works", ()=> {
        expect(testModule()).toBe("it works");
    })
}

)