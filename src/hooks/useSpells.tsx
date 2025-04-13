import { useState, useEffect } from "react";
import { Spell, UseSpellListReturn } from "../utils/Types";
import { itemsPerPage } from "../utils/Utils";
import axios from "../utils/axios";


export const useSpellList = (page: number): UseSpellListReturn => {
    const [data, setData] = useState<Spell[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [responseCount, setResponseCount] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<{ count: number; results: Spell[] }>(
                    `/spells`
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