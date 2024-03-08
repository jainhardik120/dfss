import {
  FileOwnershipTransferred as FileOwnershipTransferredEvent,
  FilePermissionChanged as FilePermissionChangedEvent
} from "../generated/FileSharingSystem/FileSharingSystem"
import {
  File, AccessRights
} from "../generated/schema"

export function handleFileOwnershipTransferred(
  event: FileOwnershipTransferredEvent
): void {
  let file = File.load(event.params.file);
  if(file == null){
    file = new File(event.params.file);
    file.creator = event.params.newOwner;
    file.cBlockNumber = event.block.number;
    file.cTransactionHash = event.transaction.hash
  }
  file.blockNumber = event.block.number;
  file.transactionHash = event.transaction.hash;
  file.currentOwner = event.params.newOwner;
  file.save();
}

export function handleFilePermissionChanged(
  event: FilePermissionChangedEvent
): void {
  const id = event.params.file.concatI32(event.params.user.toI32());
  let right = AccessRights.load(id);
  if(right == null){
    right = new AccessRights(id);
    right.fileId = event.params.file;
    right.user = event.params.user;
  }
  right.granted = event.params.accessGranted;
  right.save();
}
