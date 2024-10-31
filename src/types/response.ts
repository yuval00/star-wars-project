import { Character } from "./characters"

export type SearchData = {
    next: string | null,
    previous: string | null,
    currentList: Character[]
}