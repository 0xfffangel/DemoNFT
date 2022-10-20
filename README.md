# DemoNFT

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
yarn install
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

### Env
```
export INFURA_API_KEY=""
export PROJECT_ID=$INFURA_API_KEY
export MNEMONIC=""
export NETWORK=""
```

### Deploy
```
yarn truffle deploy --network $NETWORK
```

### Mint
```
yarn truffle console --network $NETWORK
truffle(development)> const nft = await DemoNFT.deployed()
truffle(development)> nft.mint(1)
```

### Test
```
yarn truffle test --network $NETWORK
```