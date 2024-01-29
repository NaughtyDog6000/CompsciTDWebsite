import { GameModeEnum } from "@/Structs/LeaderboardState";
import { ColumnDef } from "@tanstack/react-table";

export type LRecordType = {
  epoch_game_end_time: number;
  epoch_game_start_time: number;
  epoch_upload_time: number;
  game_mode: GameModeEnum;
  score: number;
  username: string;
};

export const columns: ColumnDef<LRecordType>[] = [
  {
    accessorKey: "username",
    header: "User",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "game_mode",
    header: "Gamemode",
  },
  {
    accessorKey: "epoch_upload_time",
    header: "uploaded",
  },
  {
    accessorKey: "epoch_game_start_time",
    header: "game-start",
  },
  {
    accessorKey: "epoch_game_end_time",
    header: "game-end",
  },
];
