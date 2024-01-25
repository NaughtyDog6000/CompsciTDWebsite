export type LeaderboardSettingsType = {
  page_length: number;
  visibility: VisbilityEnum;
  game_mode: GameModeEnum;
  uploaded_before: number;
  uploaded_after: number;
  Sort_by: SortByEnum;
  sort_ascending: boolean;
};

export type LeaderboardResponseDataType = {
  total_records: number; //the total number of records meeting the filters set
  page_length: number; // the max number of records in each page
  page_offset: number;
  records: Object[] | null;
};

export const DefaultLeaderboardResponseData: LeaderboardResponseDataType = {
  total_records: 0,
  page_length: 0,
  page_offset: 0,
  records: null
}


export type PageData = {
  current_page: number;
  number_of_pages: number;
  records_per_page: number;
  total_records: number;
  records: Object[] | null;
}
export const DefaultPageData: PageData = {
  current_page: 0,
  number_of_pages: 0,
  records_per_page: 0,
  total_records: 0,
  records: null
}

export enum GameModeEnum {
  Default = "Default",
  Hardcore = "Hardcore",
}

export const enum VisbilityEnum {
  Private = "Private",
  Friends = "Friends",
  Public = "Public",
}

export const enum SortByEnum {
  Score = "Score",
  MostRecent = "MostRecent",
}
