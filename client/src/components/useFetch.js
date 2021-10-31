import { useState, useEffect } from 'react';
import axios from 'axios'
const useFetch = (url) => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            })
            .catch((err) =>{
                setError(err)
            })
    }, [url])

    return { items, isLoading, error };
};

export default useFetch; 