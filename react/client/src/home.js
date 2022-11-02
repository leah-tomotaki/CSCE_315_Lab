import { React, useState, useEffect } from 'react';


function Home(props) {
    // name: state variable name
    // setName: setter for state variable name
    const [name, setName] = useState("Anonymous");

    useEffect(() => {
        // Call server to get the name
        fetch('http://localhost:5000/')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setName(data.name);
            });
    }, []);

    return <h1>Hello, {!name ? "Loading..." : name}</h1>;
};

export default Home;