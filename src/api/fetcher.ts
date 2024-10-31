import { FETCH_ERROR, IMAGE_URL, NA, SEARCH_URL } from "../consts";
import { Character, Homeworld } from "../types/characters";
import { SearchData } from "../types/response";

export async function HandleCharacterListFetching (toFetch: string | null, isPagination: boolean = false, currentFavorites: Record<string, Character>): Promise<SearchData> {
    if (toFetch === null) throw new Error(FETCH_ERROR);
    const characterListRes = isPagination ? await fetchPagination(toFetch) : await SearchForCharacters(toFetch);
    const updatedCharacterList: SearchData = {
        next: characterListRes.next,
        previous: characterListRes.previous,
        currentList: []
    }
    for (const char of characterListRes.results) {
        let image = '';
        if (currentFavorites[char.name]) image = currentFavorites[char.name].imageUrl;
        else { 
            try {
                image = await fetchRandomImage();
            } catch {
                image = ''
            }
        }
        updatedCharacterList.currentList.push({
            name: char.name,
            height: char.height / 100, 
            mass: char.mass,
            birth: char.birth_year,
            films: char.films.length,
            homeworld: char.homeworld,
            imageUrl: image,
        })
    }
    return updatedCharacterList;
}

export async function SearchForCharacters (filter: string = '') {
    const res = await fetch(SEARCH_URL + filter).then(value => {
        if (value.ok) {
            return value.json();
        } else throw new Error(FETCH_ERROR)
    }).catch(e => {
        return {}})
    if (Object.keys(res).length === 0) throw new Error(FETCH_ERROR);
    return res;
}

export async function fetchPagination (url: string) {
    const res = await fetch(url).then(value => {
        if (value.ok) {
            return value.json();
        } else throw new Error(FETCH_ERROR)
    }).catch(e => {
        return {}})
    if (Object.keys(res).length === 0) throw new Error(FETCH_ERROR);
    return res;
}

export async function fetchRandomImage (): Promise<string> {
    const res = await fetch(IMAGE_URL).then(value => {
        if (value.ok) {
            return value.url;
        } else throw new Error(FETCH_ERROR)
    }).catch(e => {
        return ''})
    return res;
}

export async function fetchHomeworld (url: string): Promise<Homeworld> {
    const res = await fetch(url).then(value => {
        if (value.ok) {
            return value.json();
        } else return {
            name: NA,
            terrain: NA,
            population: NA,
            climate: NA
        }
    }).catch(e => {
        return {}})
    if (Object.keys(res).length === 0) throw new Error(FETCH_ERROR);
    return {
        name: res.name,
        terrain: res.terrain,
        population: res.population,
        climate: res.climate
    };
}