import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axios";
import Card from "react-bootstrap/Card";
import '../../style/workerPublicProfile.css';

const WorkerPublicProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [sarees, setSarees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(id)
      try {
        const workerRes = await api.get(`saree/worker/${id}`);
        setWorker(workerRes.data);

        const sareeRes = await api.get(`/saree/worker/${id}/sarees`);
        setSarees(sareeRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  if (!worker) return <p className="loading-text">Loading...</p>;

  return (
    <div className="worker-profile-container">
      <Card className="worker-card">
        <Card.Body>
          <h2 className="worker-name">{worker.name}</h2>
        </Card.Body>
      </Card>

      <h4 className="saree-section-title">Sarees by this Weaver</h4>

      <div className="saree-list">
        {sarees.map(s => (
          <Card key={s._id} className="saree-card">
            {s.images?.[0] && (
              <Card.Img
                variant="top"
                src={s.images[0]}
                alt={s.title}
                className="saree-img"
              />
            )}
            <Card.Body>
              <Card.Title className="saree-title">{s.title}</Card.Title>
              <p className="saree-price">₹{s.price}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkerPublicProfile;
