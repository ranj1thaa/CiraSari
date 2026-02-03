import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../style/dashboardSec.css';
import services from '../../utils/services';
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import gsap from 'gsap'
function DashboardSec3() {
  const navigate = useNavigate();
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=>{

    gsap.from(".sec3-content", {
      x:-1700,
      rotate:360,
      duration:2.5,
      scrollTrigger:{
        trigger:".sec3-content",
        start: "top 80%",
      }
    })
  },[])
  return (
    <section className="sec3-section">
      <div className="sec3-bg"></div>
        <div className="sec3-content">
          <h1 className="sec3-title">Our Services</h1>
          <div className="sec3-cards">
            {services.map(service => (
            <div key={service.path} className="sec3-card">
              <img src={service.img} alt={service.Title} className="sec3-img" />
              <div className="sec3-body">
                <h3>{service.Title}</h3>
                <p>{service.Content}</p>
                <Button
                  className="sec3-btn"
                  onClick={() => navigate(service.path)}
                >
                  {service.btn}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DashboardSec3;
