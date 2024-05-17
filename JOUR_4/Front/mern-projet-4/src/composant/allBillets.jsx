import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

function AllBillets(){

    const token = localStorage.getItem('token');
    const [billets, setBillets] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const [login, setLogin] = useState();
    useEffect(() => {

        fetch('http://localhost:4242/api/AllUserBillet', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`,
            },

        })
            .then((res) => res.json())
            .then((res) => {
                console.log("Response from server:", res);
                    setBillets(res);
                    setLogin(res[0].userId['login']);


            })
            .catch((err) => {
                console.error("Error fetching billets:", err);
                setError('Failed to fetch billets');
            });

    }, []);

    const navigateProfil = () => {
                navigate(`/${login}`)
    }

    return(
        <>
            <div>
                <h1 className="login-title">All Billets</h1>

                <div className="bonbon">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        billets.map((billet) => (
                            <div className="biller-card" key={billet._id}>
                                <h2>{billet.title}</h2>
                                <p>{billet.content}</p>
                                <a>Auteur : {billet.userId['login']}</a>
                                <button className="btn btn2 btn3" onClick={navigateProfil}>Voir profil</button>

                            </div>

                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default AllBillets;