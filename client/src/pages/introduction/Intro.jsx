import { Link } from "react-router-dom";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const Intro = () => {
  useGSAP(()=>{
    gsap.from(".intro", {
      y:-800,
      opacity:0,
      duration:1.2,
    })

    gsap.to(".btn-exp", {
      y:-800,
      opacity:0.3,
      yoyo:true,
      repeat:1,
    })
  })

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className=" w-full max-w-2xl flex flex-col items-center text-center gap-6 sm:gap-8 card text-[var(--ivory)] px-6 py-10 sm:px-10 sm:py-14 intro">
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-[var(--royal-gold)] shadow-lg">
          <img src="/logo.jpg" alt="CiraSari Logo" className="w-full h-full object-cover"/>
        </div>

        <h1 className="text-xl sm:text-2xl tracking-widest text-[var(--royal-gold)]">
          CiraSari
        </h1>

        <div className="divider-gold" />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug text-[var(--ivory)]">
          Discover the Art of <br className="sm:hidden" />
          Traditional Sarees
        </h2>

        <p className="max-w-md text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
          Connect with authentic weavers, explore handcrafted sarees,
          and experience heritage woven with passion.
        </p>

        <Link to="/login" className="mt-4 primary-btn px-8 btn-exp">
          Explore Collection
        </Link>
      </div>
    </section>
  );
};

export default Intro;
