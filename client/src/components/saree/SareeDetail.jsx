import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContexts } from "../../contexts/Context";
import { toast } from "react-toastify";
import '../../style/sareeDetail.css';

const SareeDetail = () => {
  const { user } = useContexts();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [saree, setSaree] = useState(null);

  useEffect(() => {
    const fetchSaree = async () => {
      const res = await api.get(`/saree/detail-saree/${id}`);
      setSaree(res.data);
    };
    fetchSaree();
  }, [id]);

  if (!saree) return <p className="loading-text">Loading...</p>;

  const createOrder = async (type) => {
    if (!message && type === "enquiry") {
      return toast.warn("Please enter a message");
    }
    try {
      await api.post("/order/createOrder", {
        sareeID: saree._id,
        orderType: type,
        message: type === "cart" ? "Added to cart" : message,
      });
      toast.success(
        type === "cart"
          ? "Added to cart"
          : type === "buy"
          ? "Order is in Cart, Go To Cart To Place order"
          : "Enquiry sent"
      );
      setShow(false);
      setMessage("");
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="saree-detail-container">
      <Button as={Link} to='/saree-collections' className="back-btn">← Back</Button>

      <Card className="saree-detail-card">
        {saree.images?.[0] && (
          <Card.Img
            variant="top"
            src={saree.images[0]}
            alt={saree.title}
            className="saree-detail-img"
          />
        )}

        <Card.Body>
          <h2 className="saree-title">{saree.title}</h2>
          <p className="saree-price">₹{saree.price}</p>

          <div className="saree-meta">
            <p><b>Fabric:</b> {saree.fabric}</p>
            <p><b>Technique:</b> {saree.technique}</p>
            <p><b>Region:</b> {saree.region}</p>
          </div>

          <hr />

          <p className="saree-description">{saree.description}</p>
          <hr />

          <p className="saree-weaver"><b>Weaver:</b> {saree.worker?.name}</p>

          {user?.role === "customer" && (
            <div className="saree-actions">
              <Button className="action-btn enquiry" onClick={() => setShow(true)}>Enquiry</Button>
              <Button className="action-btn cart" onClick={() => createOrder("cart")}>Add to Cart</Button>
              <Button className="action-btn buy" onClick={() => createOrder("buy")}>Buy Now</Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => createOrder("enquiry")}>Send</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SareeDetail;
