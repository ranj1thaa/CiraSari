import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../style/cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await api.get("/order/get-my-cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await api.delete(`/order/cart/${id}`);
    toast.success("Removed from cart");
    fetchCart();
  };

  const buyNow = async (order) => {
    try {
      await api.post(`/order/cart/buy/${order._id}`);
      toast.success("Order placed");
      navigate(`/checkout/${order._id}`);
    } catch (err) {
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cart.map(item => (
        <Card key={item._id} className="cart-card">
          <Card.Body>
            <h5 className="cart-item-title">{item.saree?.title}</h5>
            <p className="cart-price">₹{item.saree?.price}</p>
            <p className="cart-weaver">
              Weaver: <span>{item.worker?.name}</span>
            </p>

            <div className="cart-actions">
              <Button className="cart-btn remove" onClick={() => removeItem(item._id)}>
                Remove
              </Button>
              <Button className="cart-btn buy" onClick={() => buyNow(item)}>
                Buy Now
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      {!cart.length && <p className="cart-empty">No items in cart</p>}
    </div>
  );
};

export default Cart;
