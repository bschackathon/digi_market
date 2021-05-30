var TruffleContract = require("@truffle/contract");
let MonalizaArtifact = require("./build/contracts/MonalizaContractFactory.json");
let MonalizaNFTArtifact = require("./build/contracts/Monaliza.json");
//const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");

//FOR DOCKER USE secret file from /usr/app/src as shown below
//const mnemonic = require("/usr/src/app/secret/secret.json").secret;
//const FROM_ACCOUNT = require("/usr/src/app/secret/secret.json").from_account;
//const RINKEBY_RPC_URL= require("/usr/src/app/secret/secret.json").rinkeby_rpc_url;

const mnemonic = require("./secret.json").secret;
const FROM_ACCOUNT = require("./secret.json").from_account;
const RINKEBY_RPC_URL= require("./secret.json").rinkeby_rpc_url;

const pinata_api_key = require("./secret.json").pinata_api_key;
const pinata_api_secret = require("./secret.json").pinata_api_secret;


var Web3 = require("web3");
const express = require("express");
const { request } = require("express");
require('dotenv').config();
var cors = require('cors')
const app = express();
const port = 4000;

app.use(express.static('src'));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

console.log(FROM_ACCOUNT);

var Monaliza = TruffleContract(MonalizaArtifact);
var MonalizaNFT = TruffleContract(MonalizaNFTArtifact);
var web3Provider = new HDWalletProvider(mnemonic, RINKEBY_RPC_URL)
Monaliza.setProvider(web3Provider);
var monalizaInstance = new Object();
var n = 1;
var imgPath = './dunst.jpg';

Monaliza.deployed().then(function(instance) {
    monalizaInstance = instance;
})

app.get('/deployandmintnftv2', (req, res) => {
    n = n+1;
    console.log("Starting to execute deploynft");
    //res.send('NFT contract deployment started!' + " with " + req.query.name + " " + req.query.symbol);
    var symbol = "TEST9"
    monalizaInstance.deployNFTContract(req.query.name + n, symbol + n, {from: FROM_ACCOUNT, gas: 5000000})
  .then(function(value) {
    console.log("NFT contract address " + value.receipt.rawLogs[0].address);
    console.log(value.receipt.rawLogs[0].address);
        res.json({"contractAddress": value.receipt.rawLogs[0].address});

    }).catch(function(err) {
        console.log(err.message);
    });
    //return monalizaInstance.mint(req.query.contractaddress, req.query.toaddress, req.query.tokenuri, {from: process.env.FROM_ACCOUNT, gas: 4600000});
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


app.get('/deployandmintnft', (req, res) => {
    //res.send('NFT contract deployment started!');

        const axios = require('axios');
        const fs = require('fs');
        const FormData = require('form-data');
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        //we gather a local file from the API for this example, but you can gather the file from anywhere
            let data = new FormData();
            data.append('file', fs.createReadStream(imgPath));
        return axios.post(url,
                data,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                        'pinata_api_key': pinata_api_key,
                        'pinata_secret_api_key': pinata_api_secret
                    }
                }
            ).then(function (response) {
                //handle response here
                console.log(response.data);

                Monaliza.deployed().then(function(instance) {
                    monalizaInstance = instance;
                    console.log("Initiating deployment of NFT contract");
                    return monalizaInstance.deployNFTContract(req.query.name, req.query.symbol, {from: FROM_ACCOUNT, gas: 4600000});
                    //return monalizaInstance.mint(req.query.contractaddress, req.query.toaddress, req.query.tokenuri, {from: process.env.FROM_ACCOUNT, gas: 4600000});
                    }).then(function(value) {
                        console.log("NFT contract address " + value.receipt.rawLogs[0].address);
                        console.log(value.receipt.rawLogs[0].address);
                        res.json({"contractAddress": value.receipt.rawLogs[0].address});
                        //Now mint NFT
                        monalizaInstance.mintNFT(value.receipt.rawLogs[0].address, req.query.toaddress, req.query.tokenuri + "/" + response.data.IpfsHash, {from: process.env.FROM_ACCOUNT, gas: 4600000})
                        .then(function(result){
                            console.log("NFT minted");
                            
                        }).catch(function(err) {
                        console.log(err.message);
                        });
            
                    }).catch(function(err) {
                    console.log(err.message);
                    });

            }).catch(function (error) {
                //handle error here
                console.log(error);
            });

})

app.get('/pinnftfile', (req, res) => {
        //imports needed for this function
    const axios = require('axios');
    const fs = require('fs');
    const FormData = require('form-data');
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //we gather a local file from the API for this example, but you can gather the file from anywhere
        let data = new FormData();
        data.append('file', fs.createReadStream('./bs-config.json'));
    return axios.post(url,
            data,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                    'pinata_api_key': "3e1596561b8dad3f06ca",
                    'pinata_secret_api_key': "ef713e5847f3113a44520040821fb5bfd7d498f8e6f70ed84c1fcc72514b7b9d"
                }
            }
        ).then(function (response) {
            //handle response here
            console.log(response.data);
        }).catch(function (error) {
            //handle error here
            console.log(error);
        });
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})