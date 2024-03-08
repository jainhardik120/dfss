import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FileSharingSystem", function () {
  
  async function deployContract() {
    const [owner] = await ethers.getSigners();
    const contract = await ethers.deployContract("FileSharingSystem");
    return contract;
  };

  it("Test creating new file", async () => {
    const fileName = "0x4312h432n4j23512jk89ufaj9";
    const contract = await loadFixture(deployContract);
    const [owner] = await ethers.getSigners();
    await expect(contract.createFile(fileName)).to.emit(contract, "FileOwnershipTransferred").withArgs("0x0000000000000000000000000000000000000000", fileName, owner.address);
  });

});
