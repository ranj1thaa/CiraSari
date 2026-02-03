import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import '../../style/workerMySaree.css'; 

const WorkerMySareeCollection = () => {
  const [sarees, setSarees] = useState([]);
  const navigate = useNavigate();

  const fetchSaree = async () => {
    try {
      const res = await api.get('/saree/my-saree');
      setSarees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSaree();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this saree?")) return;

    try {
      await api.delete(`/saree/delete/${id}`);
      setSarees(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="worker-saree-container">
      <Link to='/saree-collections' className="back-link">← Back to Collections</Link>
      <h2>My Sarees</h2>
      <p>Total Sarees: <b>{sarees.length}</b></p>

      <div className="saree-grid">
        {sarees.map(s => (
          <Card key={s._id} className="worker-saree-card">
            {s.images?.[0] && (
              <Card.Img
                variant="top"
                src={s.images[0]}
                alt={s.title}
                className="worker-saree-img"
                onClick={() => navigate(`/detail-saree/${s._id}`)}
                style={{ cursor: "pointer" }}
              />
            )}
            <Card.Body>
              <Card.Title>{s.title}</Card.Title>
              <Card.Text>₹{s.price}</Card.Text>
              <div className="worker-saree-btns">
                <Button size="sm" onClick={() => navigate(`/edit-saree/${s._id}`)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(s._id)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkerMySareeCollection;
