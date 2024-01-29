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
  DefaultPageData,
  GameModeEnum,
  LeaderboardQueryParams,
  LeaderboardResponseDataType,
  LeaderboardSettingsType,
  PageData,
  SortByEnum,
  VisbilityEnum,
} from "@/Structs/LeaderboardState";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  DatePickerWithPresets,
  defaultDatePickerPresets,
} from "@/components/DatePickerWithPresets";
import { Toggle } from "@/components/ui/toggle";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

import { columns } from "@/components/Leaderboard/LColumns";
import L_Table from "@/components/Leaderboard/LTable";
import { useAPIURL, useAppState } from "@/Structs/State";
import { toast } from "@/components/ui/use-toast";

const DefaultLeaderboardSettings: LeaderboardSettingsType = {
  current_page: 1,
  page_length: 10,
  visibility: VisbilityEnum.Public,
  game_mode: GameModeEnum.Default,
  uploaded_before: 9999999999,
  uploaded_after: 0,
  sort_by: SortByEnum.Score,
  sort_ascending: false,
};

export default function Leaderboard(): JSX.Element {
  const [controlPanelEnabled, setControlPanelEnabled] = useState(false);
  const [leaderboardSettings, SetLeaderboardSettings] =
    useState<LeaderboardSettingsType>(DefaultLeaderboardSettings);
  const APIURL = useAPIURL();
  const { AppState } = useAppState();

  const [PageData, SetPageData] = useState<PageData>(DefaultPageData);

  async function UpdateLeaderboardPageData(
    leaderboardSettings: LeaderboardSettingsType
  ) {
    // if the user is not signed in, currently they cannot access the Leaderboard
    // TODO!() allow non signed in usage
    if (AppState.token === null) {
      console.warn("cannot update without token");
      toast({
        title: "ERROR",
        description: "current impl cannot update without a token",
      });
      return;
    }

    if (leaderboardSettings.current_page <= 0) return;

    // create the json/object that will contain all the settings/info needed
    const req_config: LeaderboardQueryParams = {
      page_length: leaderboardSettings.page_length,
      page_offset: leaderboardSettings.current_page - 1,
      visibility: leaderboardSettings.visibility,
      game_mode: leaderboardSettings.game_mode,
      order_by: leaderboardSettings.sort_by,
      order_ascending: leaderboardSettings.sort_ascending,
      uploaded_after: leaderboardSettings.uploaded_after,
      uploaded_before: leaderboardSettings.uploaded_before,
    };

    // create the appropriate headers including the user's auth token
    const headers = new Headers();
    headers.append("Content-Type", "application/json; charset=UTF-8");
    headers.append("auth", AppState.token);

    // fetch leaderboard data from the API
    console.log(APIURL + "/leaderboard/scores");
    const response = await fetch(APIURL + "/leaderboard/scores", {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify(req_config),
    });
    // parse the page data into the correct type
    if (!response.ok) {
      console.warn("error with leaderboard update request");
      toast({
        title: "ERROR",
        description: "leaderboard did not respond, or responded with an error",
      });
      return;
    }
    // calculate derived properties of the data
    const LBResponseData: LeaderboardResponseDataType = await response.json();
    const pageData = CalculatePageData(LBResponseData);

    // set the PageData
    SetPageData(pageData);
  }

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
              {leaderboardSettings.page_length}
            </Label>
            <Slider
              defaultValue={[leaderboardSettings.page_length]}
              id="RPP-slider"
              // todo!() the max should be based upon users signed in status
              max={50}
              min={10}
              step={10}
              className="my-2"
              onValueChange={(values) => {
                SetLeaderboardSettings({
                  ...leaderboardSettings,
                  page_length: values[0],
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
                <SelectItem value={GameModeEnum.Default}>
                  {GameModeEnum.Default}
                </SelectItem>
                <SelectItem value={GameModeEnum.Hardcore}>
                  {GameModeEnum.Hardcore}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <p className="flex justify-center text-lg font-bold">Sort By</p>
          {/* Sort By */}
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SortByEnum.Score}>
                  {SortByEnum.Score}
                </SelectItem>
                <SelectItem value={SortByEnum.MostRecent}>
                  {SortByEnum.MostRecent}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Ascending vs Descending */}
          <div>
            <Toggle>ASC</Toggle>
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

      {PageData.records !== null ? (
        <L_Table columns={columns} data={PageData.records} />
      ) : (
        <></>
      )}

      <Button
        onClick={() => {
          UpdateLeaderboardPageData(leaderboardSettings);
        }}
      >
        UPDATE
      </Button>

      {/* Page Selector */}
      <footer>
        <PageSelector
          className="positio"
          PageData={PageData}
          MaximumPageSelectors={3}
        />
      </footer>
    </>
  );
}

function CustomPaginationItem({
  href,
  enabled,
  value,
}: {
  href: string;
  enabled: boolean;
  value: number;
}): JSX.Element {
  return (
    <>
      <PaginationItem value={value}>
        <PaginationLink href={href} isActive={enabled}>
          {value.toString()}
        </PaginationLink>
      </PaginationItem>
    </>
  );
}

function PageSelector({
  className,
  PageData,
  MaximumPageSelectors = 3,
}: {
  className: string;
  PageData: PageData;
  MaximumPageSelectors: number;
}): JSX.Element {
  if (PageData.total_records <= 0) return <>No results for Query</>; // if there are no records
  if (
    PageData.current_page > PageData.number_of_pages ||
    PageData.current_page <= 0
  ) {
    return <>Page Outside of the range of available pages</>; // if the page is one that doesnt exist
  }
  if (PageData.records_per_page <= 0) return <>Impossible Query</>; // no records per page is impossible

  if (MaximumPageSelectors < 1)
    return <>Minimum Number of Page Selectors is 1</>;

  let NumberOfPageSelectors: number =
    PageData.number_of_pages - PageData.current_page + 1;
  if (NumberOfPageSelectors > MaximumPageSelectors)
    NumberOfPageSelectors = MaximumPageSelectors;

  const PageSelectors = [];
  for (let i = 0; i < NumberOfPageSelectors; i++) {
    const currentItemPage = i + PageData.current_page;
    PageSelectors.push(
      <CustomPaginationItem
        enabled={currentItemPage === PageData.current_page}
        value={currentItemPage}
        href="#"
      />
    );
  }

  const numberOfPagesAhead = PageData.number_of_pages - PageData.current_page;

  return (
    <>
      <Pagination className={className}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              variant={"ghost"}
              disabled={true}
              className=""
            />
          </PaginationItem>
          {/* The pages Ahead of and the Currently Selected Page */}
          {PageSelectors}

          {/* if there are more pages than shown, show the ellipsis to indicate further pages */}
          {numberOfPagesAhead > NumberOfPageSelectors - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext className="" disabled={false} variant={"ghost"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

function CalculatePageData(Data: LeaderboardResponseDataType): PageData {
  // if no records match the query then there is no data
  if (
    Data.total_records <= 0 ||
    Data.page_length <= 0 ||
    Data.page_records === null
  )
    return {
      records: null,
      current_page: 0,
      number_of_pages: 0,
      records_per_page: 0,
      total_records: 0,
    };

  const numberOfPages = Math.ceil(Data.total_records / Data.page_length);

  return {
    records: Data.page_records,
    current_page: Data.page_offset + 1,
    number_of_pages: numberOfPages,
    records_per_page: Data.page_length,
    total_records: Data.total_records,
  };
}
