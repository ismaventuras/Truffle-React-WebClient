const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  if(deployer.network === 'development'){ //SAVING ZUM GAS 
    deployer.deploy(Migrations);
  }
};
