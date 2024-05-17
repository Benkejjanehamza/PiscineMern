import '../App.css';
import {useEffect, useState} from "react";


function Welcome(){

    const [login, setLogin] = useState();
    const token = localStorage.getItem('token');

    useEffect(() => {

        fetch('http://localhost:4242/api/getLogin', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setLogin(res.user['login']);
            });
    }, []);

    return(
        <>
            <h1 id={"toto"} className={'error'}>Welcome {login}</h1>
        </>
        )
}
export default Welcome;