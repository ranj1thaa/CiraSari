import { Link, useNavigate } from "react-router-dom";
import { useContexts } from "../../contexts/Context";
import { toast } from "react-toastify";

const WorkerFooter = () => {
  const navigate = useNavigate();
  const { logout } = useContexts();

  const handleLogOut = async () => {
    await logout();
    toast.success("Logout Successful");
    navigate("/login", { replace: true });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-section">
          <h2>Quick Links</h2>
          <div className="footer-links">
            <Link to="/worker/dashboard">Home</Link>
            <Link to="/contact">About Us</Link>
            <Link to="/sareeMaking">Saree Making</Link>
          </div>
        </div>

        <div className="footer-section">
          <h2>Services</h2>
          <div className="footer-links">
            <Link to="/infotainment">Infotainment</Link>
            <Link to="/saree-collections">Saree Collection</Link>
          </div>
        </div>

        <div className="footer-section">
          <h2>Account</h2>
          <div className="footer-links">
            <Link onClick={handleLogOut}>Sign Out</Link>
          </div>
        </div>
        <div className="footer-section footer-contact">
          <h4>Contact Us</h4>
          <a href="mailto:avh@gmail.com">Email: r.17ranjitha@gmail.com</a>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Cira Sari. All rights reserved.
      </div>
    </footer>
  );
};

export default WorkerFooter;
