import { React, useState, useEffect } from 'react';


function Home(props) {
    const [name, setName] = useState("Anonymous");

    useEffect(() => {
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