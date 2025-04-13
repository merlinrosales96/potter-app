import { useState, useEffect } from "react";
import { Character, UseCharacterListReturn, UseCharacterDataReturn } from "../utils/Types";
import { itemsPerPage } from "../utils/Utils";
import axios from "../utils/axios";


export const useCharacterList = (page: number): UseCharacterListReturn => {
    const [data, setData] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [responseCount, setResponseCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<Character[]>(
                    `/characters`
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


export const useCharacterById = (id: string): UseCharacterDataReturn => {
    const [data, setData] = useState<Character>({} as Character);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/character/${id}`);
                setData(response.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { data, loading };
};