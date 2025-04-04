export interface UseCharacterListReturn {
    data: Character[];
    loading: boolean;
    error: string | null;
    responseCount: number;
}

export interface UseCharacterDataReturn {
    data?: Character;
    loading: boolean;
}


export interface Character {
    id: string;
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: string;
    dateOfBirth: string | null;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: {
        wood: string;
        core: string;
        length: number | null;
    }
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    image: string;
}
