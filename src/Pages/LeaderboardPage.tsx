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
  // DefaultLeaderboardResponseData,
  DefaultPageData,
  GameModeEnum,
  // LeaderboardResponseDataType,
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

const DefaultLeaderboardSettings: LeaderboardSettingsType = {
  page_length: 10,
  visibility: VisbilityEnum.Private,
  game_mode: GameModeEnum.Default,
  uploaded_before: 0,
  uploaded_after: 0,
  Sort_by: SortByEnum.Score,
  sort_ascending: false,
};

export default function Leaderboard(): JSX.Element {
  const [controlPanelEnabled, setControlPanelEnabled] = useState(true);
  const [leaderboardSettings, SetLeaderboardSettings] =
    useState<LeaderboardSettingsType>(DefaultLeaderboardSettings);

  // const [ResponseData, SetResponseData] = useState<LeaderboardResponseDataType>(
  //   DefaultLeaderboardResponseData
  // );
  const [PageData, SetPageData] = useState<PageData>(DefaultPageData);

  // function CalculatePageData(Data: LeaderboardResponseDataType): PageData {
  //   // if no records match the query then there is no data
  //   if (Data.total_records <= 0 || Data.page_length <= 0)
  //     return {
  //       records: null,
  //       current_page: 0,
  //       number_of_pages: 0,
  //       records_per_page: 0,
  //       total_records: 0,
  //     };

  //   const numberOfPages = Math.ceil(Data.total_records / Data.page_length);

  //   return {
  //     records: null,
  //     current_page: Data.page_offset + 1,
  //     number_of_pages: numberOfPages,
  //     records_per_page: Data.page_length,
  //     total_records: Data.total_records,
  //   };
  // }

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

      <div className="flex items-center space-x-2">
        <Label htmlFor="Page-Slider" className="font-bold">
          CurrentPage
        </Label>
        <Slider
          defaultValue={[1]}
          id="Page-Slider"
          max={10}
          min={0}
          step={1}
          className="my-2"
          onValueChange={(values) => {
            SetPageData({
              ...PageData,
              current_page: values[0],
            });
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="Page-Slider" className="font-bold">
          NumberOfPages
        </Label>
        <Slider
          defaultValue={[1]}
          id="Page-Slider"
          max={10}
          min={0}
          step={1}
          className="my-2"
          onValueChange={(values) => {
            SetPageData({
              ...PageData,
              number_of_pages: values[0],
            });
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="Page-Slider" className="font-bold">
          total_records
        </Label>
        <Slider
          defaultValue={[1]}
          id="Page-Slider"
          max={50}
          min={0}
          step={1}
          className="my-2"
          onValueChange={(values) => {
            SetPageData({
              ...PageData,
              total_records: values[0],
            });
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="Page-Slider" className="font-bold">
          RecordsPerPage
        </Label>
        <Slider
          defaultValue={[1]}
          id="Page-Slider"
          max={50}
          min={0}
          step={1}
          className="my-2"
          onValueChange={(values) => {
            SetPageData({
              ...PageData,
              records_per_page: values[0],
            });
          }}
        />
      </div>
      {/* Page Selector */}
      <PageSelector PageData={PageData} MaximumPageSelectors={3} />
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
  PageData,
  MaximumPageSelectors = 3,
}: {
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
    PageSelectors.push(
      <CustomPaginationItem
        enabled={true}
        value={i + PageData.current_page}
        href="#"
      />
    );
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {/* The pages Ahead of and the Currently Selected Page */}
          {PageSelectors}

          {/* if there are more pages than shown, show the ellipsis to indicate further pages */}
          {PageData.number_of_pages > NumberOfPageSelectors && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
