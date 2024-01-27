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
  page_records: object[] | null;
};

export type PageData = {
  current_page: number;
  number_of_pages: number;
  records_per_page: number;
  total_records: number;
  records: object[] | null;
};

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

// TEST & DEFUALT VALUES FOR TYPES

export const DefaultPageData: PageData = {
  current_page: 0,
  number_of_pages: 0,
  records_per_page: 0,
  total_records: 0,
  records: null,
};

export const DefaultLeaderboardResponseData: LeaderboardResponseDataType = {
  total_records: 0,
  page_length: 0,
  page_offset: 0,
  page_records: null,
};

export const MOCKLEADERBOARDRESPONSEDATA: LeaderboardResponseDataType = {
  page_length: 2,
  page_offset: 0,
  page_records: [
    {
      epoch_game_end_time: 1690018484,
      epoch_game_start_time: 169001469,
      epoch_upload_time: 1702391974,
      game_mode: "Default",
      score: 294984645,
      username: "nd6k",
    },
    {
      epoch_game_end_time: 1700018484,
      epoch_game_start_time: 170001469,
      epoch_upload_time: 1702392082,
      game_mode: "Default",
      score: 2984645,
      username: "nd6k",
    },
  ],
  total_records: 9,
};
