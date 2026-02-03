import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContexts } from "../../contexts/Context";
import { toast } from "react-toastify";
import api from "../../utils/axios";
import InfotainmentBody from "./InfotainmentBody";
import '../../style/infotainment.css';

const InfotainmentHome = () => {
  const { user } = useContexts();
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async () => {
    if (!content && !file) {
      return toast.warn("Post cannot be empty");
    }

    const formData = new FormData();
    formData.append("content", content);

    if (file) {
      if (file.type.startsWith("image")) {
        formData.append("images", file);
      } else if (file.type.startsWith("video")) {
        formData.append("videos", file);
      }
    }

    try {
      await api.post("/infotainment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post uploaded");
      setContent("");
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="infotainment-page">
      {user.role === "worker" && (
        <Card className="infotainment-post-card">
          <Card.Body>
            <Card.Title>Infotainment Post</Card.Title>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image or Video</Form.Label>
              <Form.Control
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            {file && file.type.startsWith("image") && (
              <div className="infotainment-preview">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ width: "50%" }} 
                />
              </div>
            )}

            {file && file.type.startsWith("video") && (
              <div className="infotainment-preview">
                <video width="100%" controls>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                </video>
              </div>
            )}

            <Button
              variant="warning"
              className="w-100"
              onClick={handleSubmitPost}
            >
              Post
            </Button>
          </Card.Body>
        </Card>
      )}

      <div className="infotainment-body">
        <InfotainmentBody />
      </div>
    </div>
  );
};

export default InfotainmentHome;
