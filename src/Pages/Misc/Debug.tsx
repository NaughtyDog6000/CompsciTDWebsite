import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/NavBar";
import {
  DefaultAppState,
  UserTypeEnum,
  useAPI,
  useAppState,
} from "@/Structs/State";
import { Input } from "@/components/ui/input";
import { ReactNode, useState, useContext } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CustomDialogProps,
  DialogCloseResponse,
  DialogOutcomeEnum,
} from "@/components/CustomDialog";
import { CustomDialogContext } from "@/App";
import { rm } from "fs";

export default function DebugPage() {
  const { AppState, SetAppState } = useAppState();
  const API = useAPI();
  const DialogContext = useContext(CustomDialogContext);
  if (!DialogContext)
    throw new Error(
      "Dialog can only be used where the Dialog Context Provder is provided"
    );

  const [token, SetToken] = useState("");
  const [dialogsToOpen, SetDialogsToOpen] = useState(1);
  return (
    <>
      <NavBar />

      <Button
        variant={"default"}
        onClick={() => {
          SetAppState(DefaultAppState);
        }}
      >
        Reset State
      </Button>

      <h1 className="h-auto text-8xl font-bold mb-2 mt-4 break-words">
        DEBUGPAGE
      </h1>
      <h2 className="text-wrap italic p-2 text-red-800 dark:text-red-400">
        All modifications of the users permissions have no affect on what data
        the user can access (any auth routes will only send data to users with a
        token that is authorised to use it, regardless of what the client
        thinks).
      </h2>

      {Object.entries(AppState).map((entry) => (
        <p>
          {entry[0]}: {entry[1]}
        </p>
      ))}
      <p>APIURL: {API.URL}</p>
      <p>Dialog Queue Length: {DialogContext.CustomDialogQueue.length}</p>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-2">
          <Label htmlFor="token-field" className="self-center">
            TOKEN:
          </Label>
          <Input
            type="text"
            placeholder="token"
            id="token-field"
            className="w-"
            onChange={(e) => {
              SetToken(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              API.token = token;
            }}
          >
            Update
          </Button>
        </div>
        <div className="flex flex-row gap-2 m-1">
          <Label className="self-center">User Type:</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={UserTypeEnum.SignedOut.toString()}>
                  Signed Out
                </SelectItem>
                <SelectItem value={UserTypeEnum.User.toString()}>
                  User
                </SelectItem>
                <SelectItem value={UserTypeEnum.Moderator.toString()}>
                  Moderator
                </SelectItem>
                <SelectItem value={UserTypeEnum.Admin.toString()}>
                  Admin
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>Set</Button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Input
            type="number"
            className="w-16 mx-2"
            max={99}
            defaultValue={1}
            onChange={(e) => {
              SetDialogsToOpen(Number(e.target.value));
            }}
          />
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
              const dialogs = new Array(dialogsToOpen).fill(dialog);
              DialogContext.SetCustomDialogQueue([
                ...dialogs,
                ...DialogContext.CustomDialogQueue,
              ]);
            }}
          >
            Add TEST Dialog(s) to Queue
          </Button>
        </div>
      </div>
    </>
  );
}
