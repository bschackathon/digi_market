var TruffleContract = require("@truffle/contract");
let MyContractArtifact = require("./build/contracts/MyContract.json");
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

var MyContract = TruffleContract(MyContractArtifact);
var web3Provider = new HDWalletProvider(mnemonic, "https://data-seed-prebsc-2-s3.binance.org:8545")
//MyContract.setProvider(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/918324bac7924b7ea8bc1f32a9bf3098"));
MyContract.setProvider(web3Provider);

app.get('/mint', (req, res) => {
    res.send('Hello World!');

    MyContract.deployed().then(function(instance) {
        myContractInstance = instance;
        console.log(instance);
        return myContractInstance.mint(req.query.toaddress, req.query.tokenid, {from: process.env.FROM_ACCOUNT, gas: 4600000});
        }).then(function(result) {
        console.log('Minting Successful!');
        //return App.getBalances();
        }).catch(function(err) {
        console.log(err.message);
        });
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})