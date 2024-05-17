import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function DetailBillet() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const token = localStorage.getItem('token');

    const [billet, setBillet] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4242/api/getIdBillet/${id}`, {
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
                setBillet(data);
                setComments(data.comments || []);
            })
            .catch((err) => {
                console.error("Error fetching billet:", err);
                setError('Failed to fetch billet');
            });
    }, [id, token]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4242/api/addComment', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId: id, content: newComment })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log("Comment added:", data);
                setComments([...comments, data.comment]);
                setNewComment('');
            })
            .catch((err) => {
                console.error("Error adding comment:", err);
                setError('Failed to add comment');
            });
    };

    const handleCommentDelete = (commentId) => {
        fetch(`http://localhost:4242/api/deleteComment/${commentId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log("Comment deleted:", data);
                setComments(comments.filter(comment => comment._id !== commentId));
            })
            .catch((err) => {
                console.error("Error deleting comment:", err);
                setError('Failed to delete comment');
            });
    };

    return (
        <div className="container-detail">
            <h1>Billet Detail</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                billet && (
                    <div className="card">
                        <h2>{billet.title}</h2>
                        <p>{billet.content}</p>
                        <p>Posted by: {billet.userId.login} ({billet.userId.email})</p>

                        <form onSubmit={handleCommentSubmit}>
                            <div className="form-group">
                                <label htmlFor="newComment">Add a Comment</label>
                                <textarea
                                    id="newComment"
                                    name="newComment"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    required
                                />
                            </div>
                            <button type="submit">Submit Comment</button>
                        </form>
                        <div className="comments-section">
                            <h3>Comments</h3>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment._id} className="comment">
                                        <div className="comment-content">{comment.content}</div>
                                        <div className="comment-author">
                                            => Comment by {comment.authorId.login} ({comment.authorId.email})
                                        </div>
                                        {billet.userId._id === localStorage.getItem('userId') && (
                                            <button className={'btn'} onClick={() => handleCommentDelete(comment._id)}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default DetailBillet;
