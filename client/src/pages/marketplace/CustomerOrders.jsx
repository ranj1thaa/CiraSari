import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../style/customerOrders.css";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/order/get-my-orders").then(res => setOrders(res.data));
  }, []);

  const sendMessage = async () => {
    await api.post(`/order/${activeOrder._id}/message`, { text });
    setText("");
    setActiveOrder(null);
  };

  return (
    <div className="customer-orders-page">
      <h2 className="customer-orders-title">My Orders</h2>

      {orders.map(order => (
        <Card key={order._id} className="customer-order-card">
          <Card.Body>
            <h5 className="order-title">{order.saree?.title}</h5>

            <div className="order-badges">
              <Badge className="badge-type">{order.orderType}</Badge>
              <Badge className={`badge-status ${order.status}`}>
                {order.status}
              </Badge>
            </div>

            <p className="order-weaver">
              Weaver: <span>{order.worker?.name}</span>
            </p>

            <Button
              className="chat-btn"
              size="sm"
              onClick={() => setActiveOrder(order)}
            >
              View Chat
            </Button>
          </Card.Body>
        </Card>
      ))}


      <Modal show={!!activeOrder} onHide={() => setActiveOrder(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Chat</Modal.Title>
        </Modal.Header>

        <Modal.Body className="chat-body">
          {activeOrder?.message?.length ? (
            activeOrder.message.map((m, i) => (
              <div
                key={i}
                className={`chat-message ${m.sender === "customer" ? "me" : "them"}`}
              >
                <b>{m.sender}</b>
                <p>{m.text}</p>
              </div>
            ))
          ) : (
            <p className="no-chat">No messages yet</p>
          )}

          <textarea
            className="form-control chat-input"
            rows={2}
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button className="send-btn" onClick={sendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerOrders;
