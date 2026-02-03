import { useParams } from "react-router-dom";
import StripeCheckout from "./CheckOutForm";

const StripeCheckoutWrapper = () => {
  const { orderId } = useParams();
  return <StripeCheckout orderId={orderId} />;
};
export default StripeCheckoutWrapper
