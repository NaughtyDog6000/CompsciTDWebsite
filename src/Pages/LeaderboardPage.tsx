import { useState } from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  GameModeEnum,
  LeaderboardSettingsType,
  SortByEnum,
  VisbilityEnum,
} from "@/Structs/LeaderboardState";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  DatePickerWithPresets,
  defaultDatePickerPresets,
} from "@/components/DatePickerWithPresets";

const DefaultLeaderboardSettings: LeaderboardSettingsType = {
  record_count: 10,
  page_offset: 0,
  visibility: VisbilityEnum.Private,
  game_mode: GameModeEnum.Default,
  uploaded_before: 0,
  uploaded_after: 0,
  Sort_by: SortByEnum.Score,
  sort_ascending: false,
};

export default function Leaderboard() {
  const [controlPanelEnabled, setControlPanelEnabled] = useState(true);
  const [leaderboardSettings, SetLeaderboardSettings] =
    useState<LeaderboardSettingsType>(DefaultLeaderboardSettings);
  // the temporary store of the values, before it is either reset or applied (moved to the leaderboard settings state)

  // const [tempLeaderboardSettings, SetTempLeaderboardSettings] = useState(
  //   DefaultLeaderboardSettings
  // );
  // function ApplyLeaderboardSettings() {
  //   console.log("leaderboardsettings before: " + leaderboardSettings);
  //   SetLeaderboardSettings({
  //     ...leaderboardSettings,
  //     ...tempLeaderboardSettings,
  //   });
  //   console.log("leaderboard settings after: " + leaderboardSettings);
  // }
  return (
    <>
      <Helmet>
        <title>Leaderboard | compsci </title>
      </Helmet>

      <NavBar />

      <h1 className="h-auto text-8xl font-bold mb-2 mt-4 break-words">
        Leaderboard Page
      </h1>

      <Sheet defaultOpen={controlPanelEnabled}>
        <SheetTrigger asChild>
          <Button
            onClick={() => {
              setControlPanelEnabled(!controlPanelEnabled);
            }}
          >
            Open Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>TITLE</SheetTitle>
            <SheetDescription>
              Change what is shown on the Leaderboard and how it is presented.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <p className="flex justify-center text-lg font-bold">
            Number of records per page
          </p>
          <div className="flex items-center space-x-2">
            <Label htmlFor="RPP-slider" className="font-bold">
              {leaderboardSettings.record_count}
            </Label>
            <Slider
              defaultValue={[leaderboardSettings.record_count]}
              id="RPP-slider"
              // todo!() the max should be based upon users signed in status
              max={50}
              min={10}
              step={10}
              className="my-2"
              onValueChange={(values) => {
                SetLeaderboardSettings({
                  ...leaderboardSettings,
                  record_count: values[0],
                });
              }}
            />
          </div>

          {/* radio buttons for visbility filter */}
          <Separator />
          <p className="flex justify-center text-lg font-bold">Visability</p>
          <div>
            <RadioGroup
              defaultValue="public"
              className="flex flex-row justify-center py-4"
              onValueChange={(value) => {
                console.log(value);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="visibility-public" value="public" />
                <Label htmlFor="visibility-public">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="visibility-friends" value="friends" />
                <Label htmlFor="visibility-friends">Friends</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="visibility-private" value="private" />
                <Label htmlFor="visibility-private">Private</Label>
              </div>
            </RadioGroup>
          </div>
          {/* DatePickers for timeperiod of records allowed */}
          <Separator />
          <p className="flex justify-center text-lg font-bold">Upload Range</p>

          <p>AllTime / Custom Radio Buttons</p>

          <p>Uploaded Before: </p>
          <div>
            <DatePickerWithPresets CustomPresets={defaultDatePickerPresets} />
          </div>
          <p>Uploaded After: </p>
          <div>
            <DatePickerWithPresets CustomPresets={defaultDatePickerPresets} />
          </div>

          <Separator />
          <p className="flex justify-center text-lg font-bold">Game Type</p>
          {/* Game Mode Selector */}
          <div className="my-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="GameMode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={GameModeEnum.Default}>Default</SelectItem>
                <SelectItem value={GameModeEnum.Hardcore}>HardCore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* END OF ITEMS */}
          <SheetFooter>
            <Button variant={"default"}>Apply</Button>
            <Button variant={"destructive"}>Reset</Button>
            <SheetClose asChild>
              <Button
                variant={"outline"}
                onClick={() => {
                  setControlPanelEnabled(false);
                }}
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
