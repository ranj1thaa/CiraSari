import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import SareeFace from './SareeFace';
import { useContexts } from '../../contexts/Context';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import '../../style/sareeGrid.css';

const SareeGrid = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContexts();

  const fetchPosts = async () => {
    try {
      const res = await api.get('/saree/getSaree');
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="saree-grid-page">
      {user?.role === "worker" && (
        <div className="saree-grid-buttons">
          <Button onClick={() => navigate("/add-saree")}>
            Add Saree
          </Button>
          <Button onClick={() => navigate("/my-saree")}>
            View Your Collection
          </Button>
        </div>
      )}

      <div className="saree-cards-container">
        {posts.map(post => (
          <SareeFace
            key={post._id}
            post={post}
            onDelete={(id) => setPosts(posts.filter(p => p._id !== id))}
          />
        ))}
      </div>
    </div>
  );
};

export default SareeGrid;
