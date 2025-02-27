import { Comic } from "./comic";

export interface Character {
  id: number;
  name: string;
  description: string;
  avatarUrl: string;
  comics: Comic[];
}
