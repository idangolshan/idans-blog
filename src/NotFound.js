import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="NotFound">
            <h2>Sorry</h2>
            <p>Page Not Found...</p>
            <Link to='/'>Click here to go back to the home page</Link>
        </div>

    );
};

export default NotFound;