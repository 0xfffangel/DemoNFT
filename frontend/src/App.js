import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import DemoNFT from './DemoNFT.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = DemoNFT.networks[networkId]
    if(networkData) {
      const abi = DemoNFT.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      const link = "https://testnets.opensea.io/assets/goerli/" + address

      this.setState({ contract })
      this.setState({ address })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })

      this.setState({ tokens: [] })
      for (let i = 0; i < totalSupply; i++) {
        const owner = await contract.methods.ownerOf(i).call()
        if (accounts.includes(owner)) {
          var token = {'id': i, metadata: {'name': ''}}
          try {
            const url = await contract.methods.tokenURI(i).call()
            const response = await fetch(url);
            const data = await response.json();
            token['metadata'] = data
          } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
          }
          this.setState({
            tokens: [...this.state.tokens, token]
          })
        }
      }
  
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (quantity, mintEth) => {
    this.state.contract.methods.mint(quantity).send({ 
      from: this.state.account[0],
      value: mintEth
    })
    .once('receipt', (receipt) => {
      this.loadBlockchainData()
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      quantity: 0,
      address: '',
      mintEth: 0,
      tokens: [],
      metadata: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            DemoNFT Gallery opensea
          </a>
          <p>Total supply { this.state.totalSupply }</p>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-left">
              <div className="content mr-auto ml-auto">
                <p>Opensea page <span>https://testnets.opensea.io/assets/goerli/{ this.state.address }</span></p>
                <p>Contract <span>https://goerli.etherscan.io/address/{ this.state.address }</span></p>
                <p>Total supply <span>{ this.state.totalSupply }</span></p>
                <p>Current account <span>{ this.state.account }</span></p>
              </div>
            </main>
          </div>
        </div>
        <hr/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Mint Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  this.mint(this.quantity.value, this.mintEth.value)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. mint 1 nft'
                    ref={(input) => { this.quantity = input }}
                  />
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. send value 0 eth (optional)'
                    ref={(input) => { this.mintEth = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            {this.state.tokens.map((token, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div className="token"></div>
                  <div>{token["id"]}</div>
                  <div>{token["metadata"]["name"]}</div>
                </div>
              )
            })}
          </div>
          <div className="row text-center">
          </div>
        </div>
      </div>
    );
  }
}

export default App;