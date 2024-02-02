import { ReactNode } from "react";

export type CustomDialog = {
  Content: (): => JSX.Element;
  CallBack: (arg0: object) => void;
};

const DialogQueue: CustomDialog[] = [];

export function EnqueueDialog(Dialog: CustomDialog) {
  // adds to the end of the queue and returns the new length of the queue
  return DialogQueue.push(Dialog);
}

export function GetNextInDialogQueue(): CustomDialog | null {
  if (DialogQueue.length === 0) return null;
  return DialogQueue[0];
}

export function DeQueueDialog(): CustomDialog | null {
  // shifts the array one to the left, returning first element in the array

  if (DialogQueue.length === 0) return null; // if there is nothing in the queue return null
  const dialog = DialogQueue.shift(); // asign the first element in the queue to the var dialog
  if (dialog === undefined) return null; // if there is no element in that slot return null (should never happen)
  return dialog; // retrun the dialog item
}
// handling queued popups, handling callbacks/ notifying the calling element?

// element that sits on the root app and if there is an elemnet in the content queue,
// renders the element with the passed on result/return function which once called, calls the callback function
// and removes the element from the queue.

// a function which adds a dialog to the queue that can be called from anywhere

//  element sits on the page

export default async function CustomDialog() {
  const Dialog = GetNextInDialogQueue();
  if (Dialog === null) return <>NOTHING IN QUEUE</>;

  console.log("rendering Dialog");
  function OnReturn(value: object) {
    Dialog!.CallBack(value);
    console.log("callback called");
    // then remove the current dialog from the queue
  }

  return <>{<Dialog.Content OnReturn={OnReturn} />}</>;
}
