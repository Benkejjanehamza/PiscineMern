import { useNavigate, useParams } from "react-router";
import { useState } from "react";

function CreateBillet() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { login } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        console.log('Sending formData:', formData);

        fetch('http://localhost:4242/api/postBillet', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                navigate(`/${login}`);
            })
            .catch((err) => {
                console.error('Error creating billet:', err);
                setError('Failed to create billet');
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content </label>
                    <textarea id="content" className={"content-input"} name="content" value={formData.content} onChange={handleChange} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Publier</button>
            </form>
        </div>
    );
}

export default CreateBillet;
