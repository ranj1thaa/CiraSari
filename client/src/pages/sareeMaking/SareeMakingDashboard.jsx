import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import '../../style/sareeMakingDashboard.css';
import bgIMG from '../../assets/bgIMG1.jpeg'; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SareeMakingDashboard = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    api.get("/saree/making/process")
      .then(res => setSteps(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="saree-dashboard">
      <div className="bg-image">
        <img src={bgIMG} alt="Background" />
      </div>
      <div className="bg-overlay"></div>

      <h1 className="saree-dashboard-title">Saree Making Process</h1>

      <div className="saree-cards-container">
        {steps.map((step, idx) => (
          <div className="saree-card wide-card" key={step._id}>
            
            <div className="saree-card-left">{idx + 1}</div>

            <div className="saree-card-middle">
              <h2>{step.title}</h2>
              <p>{step.description}</p>

              {step.regions && step.regions.length > 0 && (
                <div>
                  <strong>Regions:</strong>
                  <ul>
                    {step.regions.map((region, i) => (
                      <li key={i}>{region.district}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {step.images && step.images.length > 0 && (
              <div className="saree-card-right">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  loop={false} 
                  className="saree-swiper"
                >
                  {step.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} alt={step.title} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default SareeMakingDashboard;
