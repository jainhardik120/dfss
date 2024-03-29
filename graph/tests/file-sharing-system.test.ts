import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { FileOwnershipTransferred } from "../generated/schema"
import { FileOwnershipTransferred as FileOwnershipTransferredEvent } from "../generated/FileSharingSystem/FileSharingSystem"
import { handleFileOwnershipTransferred } from "../src/file-sharing-system"
import { createFileOwnershipTransferredEvent } from "./file-sharing-system-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let previousOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let file = "Example string value"
    let newOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newFileOwnershipTransferredEvent = createFileOwnershipTransferredEvent(
      previousOwner,
      file,
      newOwner
    )
    handleFileOwnershipTransferred(newFileOwnershipTransferredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FileOwnershipTransferred created and stored", () => {
    assert.entityCount("FileOwnershipTransferred", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FileOwnershipTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "previousOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FileOwnershipTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "file",
      "Example string value"
    )
    assert.fieldEquals(
      "FileOwnershipTransferred",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newOwner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
