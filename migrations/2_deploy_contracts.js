var MonalizaContractFactory = artifacts.require("MonalizaContractFactory");

module.exports = function(deployer) {
  deployer.deploy(MonalizaContractFactory);
};