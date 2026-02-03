import { useContexts } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/axios';
import Button from "react-bootstrap/Button";
import '../../style/sareeFace.css';

const SareeFace = ({ post, onDelete }) => {
  const { user } = useContexts();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this saree?")) return;
    try {
      await api.delete(`/saree/delete/${post._id}`);
      toast.success("Saree deleted");
      if (onDelete) onDelete(post._id);
    } catch (err) {
      console.log(err);
      toast.error("Could not delete saree");
    }
  };

  const isOwner = user?._id && post.worker?._id && user._id.toString() === post.worker._id.toString();

  return (
    <div className="saree-card">
      <div
        className="saree-card-subtitle"
        onClick={() => navigate(`/worker/${post.worker?._id}`)}
      >
        {post.worker?.name}
      </div>

      <div className="saree-card-title">{post.title}</div>
      <div className="saree-card-text">{post.description}</div>
      {post.images?.[0] && (
        <img
          src={post.images[0]}
          alt="saree"
          onClick={() => navigate(`/detail-saree/${post._id}`)}
        />
      )}
      <div className="saree-card-text">Price: {post.price}</div>
      <div className="saree-card-text">Fabric: {post.fabric}</div>
      <div className="saree-card-text">Technique: {post.technique}</div>
      <div className="saree-card-text">Region: {post.region}</div>

      {isOwner && (
        <div className="saree-card-buttons">
          <Button onClick={() => navigate(`/edit-saree/${post._id}`)}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
};

export default SareeFace;
