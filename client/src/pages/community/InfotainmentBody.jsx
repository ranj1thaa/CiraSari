import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import '../../style/infotainmentBody.css'

const InfotainmentBody = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFeed = async () => {
    try {
      const res = await api.get("/infotainment");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const toggleLike = async (postId) => {
    try {
      const res = await api.post(`/infotainment/${postId}/like`);
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, likesCount: res.data.likes, isLiked: !p.isLiked }
            : p
        )
      );
    } catch (err) {
      console.error("Like failed");
    }
  };



  if (loading) {
    return (
      <div className="infotainment-loading">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div className="infotainment-body">
      {posts.map((post) => (
        <Card className="infotainment-card" key={post._id}>
          <Card.Body>
            <Card.Subtitle
              className="infotainment-card-subtitle"
              onClick={() => navigate(`/worker/${post.worker?._id}`)}
            >
              {post.worker?.name}
            </Card.Subtitle>

            <Card.Text className="infotainment-card-text">
              {post.content}
            </Card.Text>

            <div className="infotainment-media">
              {post.images?.map((img, i) => (
                <img key={i} src={img} alt="post" />
              ))}

              {post.videos?.map((vid, i) => (
                <video key={i} controls>
                  <source src={vid} />
                </video>
              ))}
            </div>

            <Button
              size="sm"
              variant={post.isLiked ? "danger" : "outline-danger"}
              className="infotainment-like-btn"
              onClick={() => toggleLike(post._id)}
            >
              ❤️ {post.likesCount}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default InfotainmentBody;
