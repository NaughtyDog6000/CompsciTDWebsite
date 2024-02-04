import { CustomDialogContext } from "@/App";
import {
  CustomDialogProps,
  DialogCloseResponse,
  DialogOutcomeEnum,
} from "@/components/CustomDialog";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ReactNode, useContext } from "react";

export default function BlankTestPage(): JSX.Element {
  const DialogContext = useContext(CustomDialogContext);
  if (!DialogContext)
    throw new Error(
      "Dialog can only be used where the Dialog Context Provder is provided"
    );

  return (
    <>
      <NavBar />
      Test Page!
      <Button
        onClick={() => {
          const dialog: CustomDialogProps = {
            content: function (props: {
              handleClose: (response: DialogCloseResponse) => void;
            }): ReactNode {
              return (
                <>
                  <p>Dialog Content</p>
                  <Button
                    onClick={() => {
                      props.handleClose({
                        data: null,
                        description: "content's button pressed",
                        outcome: DialogOutcomeEnum.Closed,
                      });
                    }}
                  >
                    Close
                  </Button>
                </>
              );
            },
            handleClose: function (response: DialogCloseResponse): void {
              console.log(
                `Outcome: ${response.outcome}\nDescription: ${response.description}\nData: ${response.data}`
              );
            },
          };
          DialogContext.SetCustomDialogQueue([
            dialog,
            ...DialogContext.CustomDialogQueue,
          ]);
        }}
      >
        Add Eleement to QUeue
      </Button>
      <Button
        onClick={() => {
          console.log(
            "Queue Length: " + DialogContext.CustomDialogQueue.length
          );
        }}
      >
        LOG QUEUE LENGTH
      </Button>
    </>
  );
}
