import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function BlogUser() {
    const { login } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [billets, setBillets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4242/api/getAllBillet/${login}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log("Response from server:", data);
                if (Array.isArray(data)) {
                    setBillets(data);
                } else {
                    console.error("Expected an array but got:", data);
                    setError('Failed to fetch billets');
                }
            })
            .catch((err) => {
                console.error("Error fetching billets:", err);
                setError('Failed to fetch billets');
            });
    }, [login, token]);

    const navigateBillet = () => {
        navigate(`/createBillet/${login}`);
    };

    const updateBillet = (id) => {
        navigate(`/updateBillet/${login}?id=${id}`);
    };

    const detailBillet = (id) => {
        navigate(`/detailBillet/${login}?id=${id}`);
    };

    const allAnnonce = () => {
        navigate(`/`);
    }

    const deleteBillet = (id) => {

        fetch(`http://localhost:4242/api/deleteBillet`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data)
                setBillets(billets.filter(billet => billet._id !== id));
            })
    }

    return (
        <>
            <div>
                <h1 className="login-title">Welcome to {login}'s Blog</h1>
                <div className={'caca'}>
                <div className="btn-create">
                    <button className="btn btn2" onClick={navigateBillet}>Create Billet</button>
                </div>
                <div className="btn-create">
                    <button className="btn btn2" onClick={allAnnonce}>All Annonce</button>
                </div>
                </div>
                <div className="bonbon">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        billets.map((billet) => (
                            <div className="biller-card" key={billet._id}>
                                <h2>{billet.title}</h2>
                                <p>{billet.content}</p>
                                <div className="btn-crud">
                                    <button onClick={() => deleteBillet(billet._id)} className="btn">Delete Billet
                                    </button>
                                    <button onClick={() => updateBillet(billet._id)} className="btn">Update Billet
                                    </button>
                                    <button onClick={() => detailBillet(billet._id)} className="btn">Detail Billet
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default BlogUser;
