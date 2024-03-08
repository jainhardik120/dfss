import { ethers } from "hardhat";

// Deployed Address : 0x9D405039f90953FF538E66049EAffD8b367052d8

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account : ", deployer.address);
  const contract = await ethers.deployContract("FileSharingSystem");
  console.log("Contract Address : ", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
