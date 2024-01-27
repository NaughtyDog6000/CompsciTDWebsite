import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/NavBar";
import { DefaultAppState, useAppState } from "@/Structs/State";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function DebugPage() {
  const { AppState, SetAppState } = useAppState();

  const [token, SetToken] = useState("");

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
      <h1 className="h-auto text-8xl font-bold mb-2 mt-4">DEBUGPAGE</h1>
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
              SetAppState({ ...AppState, token: token });
            }}
          >
            Update
          </Button>
        </div>
        <div className="flex flex-row gap-2 m-1">
          <Label>User Type:</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
