import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DetailArticle = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const [annonce, setAnnonce] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetch('http://localhost:4242/api/getAnnonceUnique', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: parseInt(id, 10) })
            })
                .then((res) => res.json())
                .then((data) => {
                    setAnnonce(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setError('Failed to fetch annonce details');
                });
        }
    }, [id]);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!annonce) {
        return <p>Loading...</p>;
    }

    return (
        <div className="annonce-detail-container">
            <div className={"totolefou"}>
            <h2>{annonce.title}</h2>
            <p>{annonce.description}</p>
            <p><strong>Prix: </strong>{annonce.price} €</p>
            </div>
        </div>
    );
};

export default DetailArticle;
