import {useState, useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

// //Async await
// const fetchFromDb = async () => {
//     const res = await fetch('http://localhost:8000/blogs')
//     const resJason = await res.json()
//     setBlogs(resJason)
//     setIsLoading(false)
// }

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    if (!res.ok) throw Error('Could not fetch the data from that resource')
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false)
                    setError(null)
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsLoading(false)
                        setError(err.message)
                    }
                })
        }, 500)

        return () => {
            abortCont.abort()
        }
    }, [url]);
// setTimeout(fetchFromDb, 300)}, []);
    return {data, isLoading, error}
}

export default useFetch