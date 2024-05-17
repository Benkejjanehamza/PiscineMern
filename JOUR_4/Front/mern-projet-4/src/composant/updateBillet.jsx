import {useLocation, useNavigate, useParams} from "react-router";
import {useState} from "react";


function updateBillet(){
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    console.log(id)
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const { login } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        id : id
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
        fetch('http://localhost:4242/api/updateBillet', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);

                navigate(`/${login}`);
            });
    };

    return (


        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Title</label>
                    <input type="text" id="email" name="title" value={formData.title} onChange={handleChange}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Content </label>
                    <textarea type="text" id="password" className={"content-input"} name="content" value={formData.content}
                              onChange={handleChange} required/>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Publier</button>
            </form>
        </div>
    )
}

export default updateBillet;