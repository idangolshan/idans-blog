import {useState, useEffect} from 'react';
import BlogList from "./BlogList";
// import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
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
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    if (!res.ok) throw Error('Could not fetch the data from that resource')
                    return res.json();
                })
                .then(data => {
                    setBlogs(data);
                    setIsLoading(false)
                    setError(null)
                })
                .catch(err => {
                    setIsLoading(false)
                    setError(err.message)
                })
        }, 500)
    }, []);
    // setTimeout(fetchFromDb, 300)}, []);

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div> Loading... </div>}
            {blogs && <BlogList blogs={blogs} title="All blogs"/>}
            {/*<BlogList blogs={blogs.filter((blog) => blog.author === "mario")}*/}
            {/*          title="mario's blogs"/>*/}
        </div>
    );
}

export default Home;