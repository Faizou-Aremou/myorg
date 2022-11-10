import { testModule } from "./shared-util-common.functions";


describe('functionnal general ', () => {
    it("it works", ()=> {
        expect(testModule()).toBe("it works");
    })
}

)