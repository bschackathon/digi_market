var TruffleContract = require("@truffle/contract");
let MonalizaArtifact = require("./build/contracts/Monaliza.json");
//const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require("./secret.json").secret;
var Web3 = require("web3");
const express = require("express");
const { request } = require("express");
require('dotenv').config();
const app = express();
const port = 4000;

app.use(express.static('src'));
console.log(process.env.FROM_ACCOUNT);

var Monaliza = TruffleContract(MonalizaArtifact);
var web3Provider = new HDWalletProvider(mnemonic, process.env.RINKEBY_RPC_URL)
Monaliza.setProvider(web3Provider);

app.get('/mint', (req, res) => {
    res.send('Minting started!');

    Monaliza.deployed().then(function(instance) {
        monalizaInstance = instance;
        console.log(instance);
        return monalizaInstance.mint(req.query.toaddress, req.query.tokenuri, {from: process.env.FROM_ACCOUNT, gas: 4600000});
        }).then(function(result) {
        console.log('Minting Successful!');
        }).catch(function(err) {
        console.log(err.message);
        });
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})