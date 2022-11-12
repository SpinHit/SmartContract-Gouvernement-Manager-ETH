const GouvernementsManager = artifacts.require("GouvernementsManager");

module.exports = function (_deployer) {
  _deployer.deploy(GouvernementsManager);
};
