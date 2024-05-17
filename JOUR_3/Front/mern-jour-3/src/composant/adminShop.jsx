import '../shopCss.css'
import { useState } from 'react';
function AdminShop(){

        const [formData, setFormData] = useState({
            title: '',
            description: '',
            price: '',
        });

        const [message, setMessage] = useState('');
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage('');

            const data = { ...formData, price: parseInt(formData.price, 10) };

            fetch('http://localhost:4242/api/submitAnnonce', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setMessage('Une erreur est survenue. Veuillez réessayer.');
                });
        };

        return (
            <div className="form-container">
                <form onSubmit={handleSubmit} className="annonce-form">
                    <h2>Poster une Annonce</h2>
                    <div className="form-group">
                        <label htmlFor="title">Titre de l'article:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Prix:</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    {message && <p className="message">{message}</p>}
                    <button type="submit">Poster</button>
                </form>
            </div>
        );
    };


export default AdminShop;