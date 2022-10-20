const DemoNFT = artifacts.require("DemoNFT");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("DemoNFT", function (/* accounts */) {
  it("should assert true", async function () {
    await DemoNFT.deployed();
    return assert.isTrue(true);
  });
});
