import Button from "react-bootstrap/Button";
import '../../style/headerSec1.css'
import {useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
const HeaderSec1 = () => {
  const titleRef=useRef()

  useGSAP(()=>{
    const words = titleRef.current.querySelectorAll(".word");
    gsap.fromTo(words, {y:0, opacity:0, color:'white'},{
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1.98,
      color:'#ADEBB3',
      ease: "power3.out",
      yoyo:true,
      repeat:1,
      delay:2,
    })
  },[])
  return (
    <div className="hero-section">
      <div className="hero-bg">
        <img src="/bg.jpeg" alt="Saree Background" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 ref={titleRef}>
          {"Discover the Art of Traditional Sarees...."
            .split(" ")
            .map((word, index) => (
              <span key={index} className="word">
                {word}&nbsp;
              </span>
            ))}
        </h1>
        <p>
          Explore the rich heritage of Indian handloom Sarees, learn about their
          making & ship authentic collections
        </p>
        <Button className="hero-btn">Explore Collections</Button>
      </div>
    </div>
  );
};

export default HeaderSec1;
