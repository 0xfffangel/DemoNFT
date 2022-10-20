const DemoNFT = artifacts.require("./DemoNFT.sol");

module.exports = async (deployer, network, addresses) => {
  await deployer.deploy(DemoNFT);
}
