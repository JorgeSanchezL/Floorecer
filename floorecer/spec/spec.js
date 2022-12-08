

describe("A suite is just a function", function() {
    let a;
  
    it("and so is a spec", function() {
      a = true;
      function moha (a ,b) {

        return a;
      }
      expect(moha(15,20)).toBe(40);
    });
  });