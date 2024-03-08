import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  FileOwnershipTransferred,
  FilePermissionChanged
} from "../generated/FileSharingSystem/FileSharingSystem"

export function createFileOwnershipTransferredEvent(
  previousOwner: Address,
  file: string,
  newOwner: Address
): FileOwnershipTransferred {
  let fileOwnershipTransferredEvent = changetype<FileOwnershipTransferred>(
    newMockEvent()
  )

  fileOwnershipTransferredEvent.parameters = new Array()

  fileOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  fileOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("file", ethereum.Value.fromString(file))
  )
  fileOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return fileOwnershipTransferredEvent
}

export function createFilePermissionChangedEvent(
  owner: Address,
  file: string,
  user: Address,
  accessGranted: boolean
): FilePermissionChanged {
  let filePermissionChangedEvent = changetype<FilePermissionChanged>(
    newMockEvent()
  )

  filePermissionChangedEvent.parameters = new Array()

  filePermissionChangedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  filePermissionChangedEvent.parameters.push(
    new ethereum.EventParam("file", ethereum.Value.fromString(file))
  )
  filePermissionChangedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  filePermissionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "accessGranted",
      ethereum.Value.fromBoolean(accessGranted)
    )
  )

  return filePermissionChangedEvent
}
