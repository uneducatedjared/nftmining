// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyNFTModule", (m) => {
  // 参数定义
  const initialOwner = m.getParameter(
    "initialOwner",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" // 默认地址
  );

  // 部署合约
  const myNFT = m.contract("MyNFT", [initialOwner]);

  return { myNFT };
});