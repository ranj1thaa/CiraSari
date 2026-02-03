import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../../style/workerOrders.css";

const WorkerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/order/worker");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/order/${id}/status`, { status });
    toast.success("Status updated");
    fetchOrders();
  };

  const sendReply = async () => {
    await api.post(`/order/${activeOrder._id}/message`, { text: reply });
    setReply("");
    setActiveOrder(null);
    fetchOrders();
  };

  return (
    <div className="worker-orders-page">
      <h2 className="worker-orders-title">Orders & Enquiries</h2>

      {orders.map(order => (
        <Card key={order._id} className="worker-order-card">
          <Card.Body>
            <h5 className="order-title">{order.saree?.title}</h5>

            <div className="order-badges">
              <Badge className="badge-type">{order.orderType}</Badge>
              <Badge className={`badge-status ${order.status}`}>
                {order.status}
              </Badge>
            </div>

            <p className="order-customer">
              Customer: <span>{order.customer?.name}</span>
            </p>

            <div className="order-actions">
              {order.status === "pending" && (
                <>
                  <Button className="btn accept" onClick={() => updateStatus(order._id, "accepted")}>
                    Accept
                  </Button>
                  <Button className="btn reject" onClick={() => updateStatus(order._id, "rejected")}>
                    Reject
                  </Button>
                </>
              )}

              {order.status === "accepted" && (
                <Button className="btn complete" onClick={() => updateStatus(order._id, "completed")}>
                  Mark Completed
                </Button>
              )}

              <Button className="btn reply" onClick={() => setActiveOrder(order)}>
                Reply
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      <Modal show={!!activeOrder} onHide={() => setActiveOrder(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <textarea
            className="form-control"
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type message..."
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setActiveOrder(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendReply}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkerOrders;
