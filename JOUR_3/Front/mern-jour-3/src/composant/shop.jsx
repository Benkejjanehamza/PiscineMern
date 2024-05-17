import { useEffect, useState } from 'react';
import {useNavigate} from "react-router";


const Shop = () => {
    const [annonces, setAnnonces] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4242/api/getAnnonce', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAnnonces(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to fetch annonces');
            });
    }, []);

    const handleClick = (id) => {
        navigate(`/detailArticle?id=${id}`);
    }
    return (
        <div className="shop-container">
            <h2>Shop</h2>
            {error && <p className="error">{error}</p>}
            <ul className="annonce-list">
                {annonces.map((annonce) => (
                    <li key={annonce.id} onClick={() => handleClick(annonce.id)} className="annonce-item">
                        <h3>{annonce.title}</h3>
                        <p>{annonce.description}</p>
                        <p><strong>Prix: </strong>{annonce.price} €</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Shop;
