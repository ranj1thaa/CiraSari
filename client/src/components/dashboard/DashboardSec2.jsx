import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../style/dashboardSec.css";

function DashboardSec2() {
  return (
    <section className="sec2-section">
      <h1 className="sec2-title">Saree Making</h1>

      <div className="sec2-steps">
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/COxJUmf1udI?si=HKOErNMPvBqaN9Og"
            title="Saree Making Process"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Button as={Link} to="/sareeMaking" className="sec2-btn">
        See More...
      </Button>
    </section>
  );
}

export default DashboardSec2;
