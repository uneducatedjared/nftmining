const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should deploy and mint an NFT", async function () {
    // 部署合约
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await myNFT.waitForDeployment();

    // 调用方法
    await myNFT.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "1234567");
    
    // 断言验证
    const balance = await myNFT.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    expect(balance).to.equal(1);
  });
});