export type LeaderboardSettingsType = {
  record_count: number;
  page_offset: number;
  visibility: VisbilityEnum;
  game_mode: GameModeEnum;
  uploaded_before: number;
  uploaded_after: number;
  Sort_by: SortByEnum;
  sort_ascending: boolean;
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
