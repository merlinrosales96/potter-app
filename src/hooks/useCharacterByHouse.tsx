import { useState, useEffect } from "react";
import { Character, UseCharacterListReturn, UseCharacterDataReturn } from "../utils/Types";
import { itemsPerPage } from "../utils/Utils";
import axios from "../utils/axios";


export const useCharacterByHouseList = (page: number, id: string): UseCharacterListReturn => {
    const [data, setData] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [responseCount, setResponseCount] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<{ count: number; results: Character[] }>(
                    `/characters/house/${id}`
                );
                
                setData(response.data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
                setResponseCount(response.data.length);



            } catch (err) {
                setError('Error fetching data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return { data, loading, error, responseCount };
};