import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContexts } from "../../contexts/Context";
import { toast } from "react-toastify";

const WorkerNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContexts();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout Successful");
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar-wrapper worker-navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <img src="/logo.jpg" alt="Cira Sari Logo" />
          <h4>Cira Sari</h4>
        </div>

        <div className="navbar-links">
          <Link to="/worker/dashboard">🏠 Dashboard</Link>
          <Link to="/infotainment">💰 Infotainment</Link>
          <Link to="/saree-collections">Saree Collections</Link>
          <Link to="/contact">📞 Contact</Link>
        </div>

        <div className="navbar-actions">
          <Button variant="dark" onClick={() => navigate("/worker/orders")}>
            Orders / Enquiries
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerNavbar;
