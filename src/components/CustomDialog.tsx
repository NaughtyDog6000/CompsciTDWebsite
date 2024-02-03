// handling queued popups, handling callbacks/ notifying the calling element?

import { CustomDialogContext } from "@/App";
import { useContext } from "react";
import { Button } from "@/components/ui/button";

// element that sits on the root app and if there is an elemnet in the content queue,
// renders the element with the passed on result/return function which once called, calls the callback function
// and removes the element from the queue.

// a function which adds a dialog to the queue that can be called from anywhere

//  element sits on the page

export type CustomDialogProps = {
  content: (props: {
    handleClose: (response: DialogCloseResponse) => void;
  }) => React.ReactNode;
  handleClose: (response: DialogCloseResponse) => void;
};

export type DialogCloseResponse = {
  outcome: DialogOutcomeEnum;
  description: string;
  data: object | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export enum DialogOutcomeEnum {
  ForceClosed,
  Closed,
}

export function CustomDialog() {
  const context = useContext(CustomDialogContext);
  // if the dialog isnt a child of the context provider, the dialog cannot function
  if (!context) {
    throw new Error(
      "Custom Dialog Should be placed within the Custom Dialog Context Provider"
    );
  }
  const { CustomDialogQueue, SetCustomDialogQueue } = context;

  // Handling what to do if there are no dialogs in the queue
  if (CustomDialogQueue.length === 0) {
    return <></>;
  }

  // take the next dialog in the queue to be displayed
  const CurrentDialog = CustomDialogQueue[0];

  // we need to intercept the handle close function so that the queue can be changed
  function handleClose(response: DialogCloseResponse) {
    CurrentDialog.handleClose(response);
    // move the queue forward so that the next dialog is shown.
    const newQueue = CustomDialogQueue.slice(1);
    SetCustomDialogQueue(newQueue);
  }

  return (
    <div className="dialog">
      {/* passes the content of the dialog the ability to close the dialog  */}
      <div className="dialog-content">
        {CurrentDialog.content({ handleClose })}
      </div>

      {/* the X button that every dialog has to force close it should the content 
      be messed up/ not close propperly */}
      <Button
        onClick={() =>
          handleClose({
            data: null,
            description: "closed via the X button",
            outcome: DialogOutcomeEnum.ForceClosed,
          })
        }
      >
        X
      </Button>
    </div>
  );
}
