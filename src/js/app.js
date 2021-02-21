//const HDWalletProvider = require("../../node_modules/@truffle/hdwallet-provider");

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      //App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      //const Web3HDWalletProvider = require("web3-hdwallet-provider");

      const mnemonic = "";
      //App.web3Provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/918324bac7924b7ea8bc1f32a9bf3098")
      App.web3Provider = new Web3.providers.HttpProvider("");
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('MyContract.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MyContractArtifact = data;
      App.contracts.MyContract = TruffleContract(MyContractArtifact);

      // Set the provider for our contract.
      App.contracts.MyContract.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var tokenId = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Transfer ' + tokenId + ' TT to ' + toAddress);

    var myContractInstance;
    $.ajax({url: "http://localhost:4000/mint?toaddress=" + toAddress + "&tokenid=" + tokenId, success: function(result){
      alert('Minting submitted for processing!');
    }});

    /*web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.MyContract.deployed().then(function(instance) {
        myContractInstance = instance;

        return myContractInstance.mint(toAddress, tokenId, {from: "address", gas: 1000000, gasPrice: 200});
      }).then(function(result) {
        alert('Minting Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    }); */
  },

  getBalances: function() {
    console.log('Getting balances...');

    var myContractInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.MyContract.deployed().then(function(instance) {
        myContractInstance = instance;

        return myContractInstance.totalSupply();
      }).then(function(result) {
        balance = result.c[0];

        $('#TTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
