var TruffleContract = require("@truffle/contract");
let MonalizaArtifact = require("./build/contracts/MonalizaContractFactory.json");
let MonalizaNFTArtifact = require("./build/contracts/Monaliza.json");
//const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require("/secrets/secret.json").secret;
const FROM_ACCOUNT = require("/secrets/secret.json").from_account;
const RINKEBY_RPC_URL= require("/secrets/secret.json").rinkeby_rpc_url;

var Web3 = require("web3");
const express = require("express");
const { request } = require("express");
require('dotenv').config();
const app = express();
const port = 4000;

app.use(express.static('src'));
console.log(FROM_ACCOUNT);

var Monaliza = TruffleContract(MonalizaArtifact);
var MonalizaNFT = TruffleContract(MonalizaNFTArtifact);
var web3Provider = new HDWalletProvider(mnemonic, RINKEBY_RPC_URL)
Monaliza.setProvider(web3Provider);

app.get('/deploynft', (req, res) => {
    res.send('NFT contract deployment started!');
    Monaliza.deployed().then(function(instance) {
        monalizaInstance = instance;
        console.log("Initiating deployment of NFT contract");
        return monalizaInstance.deployNFTContract(req.query.name, req.query.symbol, {from: FROM_ACCOUNT, gas: 4600000});
        //return monalizaInstance.mint(req.query.contractaddress, req.query.toaddress, req.query.tokenuri, {from: process.env.FROM_ACCOUNT, gas: 4600000});
        }).then(function(value) {
            console.log("NFT contract address " + value.receipt.rawLogs[0].address);
            console.log(value.receipt.rawLogs[0].address);
            
        }).catch(function(err) {
        console.log(err.message);
        });
})

app.get('/mintnft', (req, res) => {
    res.send('NFT Minting started!');

    Monaliza.deployed().then(function(instance) {
        monalizaInstance = instance;
        console.log("Initiating deployment of NFT contract");
        monalizaInstance.mintNFT(req.query.contractaddress, req.query.toaddress, req.query.tokenuri, {from: process.env.FROM_ACCOUNT, gas: 4600000})
    }).then(function(result){
            console.log("NFT minted");

        }).catch(function(err) {
        console.log(err.message);
        });
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})