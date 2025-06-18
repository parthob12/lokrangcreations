import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Main App component
function App() {
  console.log("App component rendering"); // Debug log

  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentPortfolioPage, setCurrentPortfolioPage] = useState(null); // null, 'corporate', 'music', etc.

  // Function to handle scroll and update active section
  useEffect(() => {
    console.log("App component mounted"); // Debug log
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  // Helper function to scroll to a section
  const scrollToSection = (sectionId) => {
    setCurrentPortfolioPage(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBackToPortfolio = () => {
    setCurrentPortfolioPage(null);
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Home Section
  const HomeSection = () => (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img
          src="/optimized-images/LogoBlack.png"
          alt="LOKRANG CREATIONS"
          className="w-full max-w-lg h-auto object-contain mb-6 drop-shadow-xl"
          style={{ background: 'transparent' }}
        />
      </div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-20">
      <div className="relative max-w-5xl w-full mx-auto text-center bg-gray-800 p-12 md:p-20 rounded-3xl shadow-2xl border-4 border-transparent bg-clip-padding"
        style={{ borderImage: 'linear-gradient(90deg, #ea33b3, #e6806a, #911cbb, #7420c2, #59c2d2) 1' }}>
        {/* Decorative Gradient Line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-40 h-2 rounded-full bg-gradient-to-r from-[#ea33b3] via-[#e6806a] via-[#911cbb] via-[#7420c2] to-[#59c2d2] shadow-lg"></div>
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white tracking-tight drop-shadow-lg">
          ABOUT US
        </h2>
        <p className="text-2xl md:text-3xl leading-relaxed mb-6 text-gray-200 font-medium">
          Every brand, every individual, every moment has a unique story.<br/>
          Some stories inspire, some move people, and some transform.
        </p>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
          At <span className="font-bold text-white">Lokrang Creations</span>, we help you discover your story and bring it to life through powerful visuals and compelling narratives.<br/>
          Whether it's building your brand, growing your business, or creating a stunning portfolio, we've got you covered.<br/>
          <span className="font-semibold text-white">Let's craft something meaningful, together.</span>
        </p>
      </div>
    </section>
  );

  // Our Forte Section
  const ForteSection = () => (
    <section id="forte" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto text-center bg-gray-800 p-12 md:p-20 rounded-3xl shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          OUR FORTE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* FILMS */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#ea33b3] to-[#911cbb]">
            <h3 className="text-2xl font-semibold mb-3">FILMS</h3>
            <p className="text-md text-white">
              We produce cinematic films with compelling storytelling, high production value, and artistic vision.
            </p>
          </div>
          {/* CREATIVE AD VIDEOS */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#e6806a] to-[#ea33b3]">
            <h3 className="text-2xl font-semibold mb-3">CREATIVE AD VIDEOS</h3>
            <p className="text-md text-white">
              Catchy and creative ad videos perfect for digital campaigns, TVCs, and product launches.
            </p>
          </div>
          {/* BRAND VIDEOS */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#911cbb] to-[#59c2d2]">
            <h3 className="text-2xl font-semibold mb-3">BRAND VIDEOS</h3>
            <p className="text-md text-white">
              Videos that reflect your brand identity, core values, authenticity, and unique selling proposition.
            </p>
          </div>
          {/* DOCUMENTARIES */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#7420c2] to-[#e6806a]">
            <h3 className="text-2xl font-semibold mb-3">DOCUMENTARIES</h3>
            <p className="text-md text-white">
              Introduce your brand, team, or personal journey with a polished, engaging documentary.
            </p>
          </div>
          {/* SCRIPTING */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#59c2d2] to-[#ea33b3]">
            <h3 className="text-2xl font-semibold mb-3">SCRIPTING</h3>
            <p className="text-md text-white">
              From basic idea seed to the final blueprint, we offer expertise in crafting your story.
            </p>
          </div>
          {/* EDITING */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#e6806a] to-[#59c2d2]">
            <h3 className="text-2xl font-semibold mb-3">EDITING</h3>
            <p className="text-md text-white">
              From raw footage to refined final cuts, we offer seamless editing to bring your vision to life.
            </p>
          </div>
          {/* DIGITAL MARKETING */}
          <div className="p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700 bg-gradient-to-br from-[#911cbb] to-[#7420c2]">
            <h3 className="text-2xl font-semibold mb-3">DIGITAL MARKETING</h3>
            <p className="text-md text-white">
              We craft websites, run campaigns, manage PR, and find you just the right collaborators.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // PortfolioCard component
  const PortfolioCard = ({ img, title, desc, link, page }) => {
    const handleClick = () => {
      if (page) {
        setCurrentPortfolioPage(page);
      }
      if (link) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    };
    return (
      <div onClick={handleClick} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 w-72 h-[18rem] flex flex-col items-center justify-start mx-auto cursor-pointer">
        <img src={img} alt={title} className="w-full h-48 object-cover rounded-lg mb-1" style={{ objectFit: 'cover', width: '100%', height: '12rem' }} />
        <h3 className="text-lg font-bold text-white mb-0 text-center w-full px-2">{title}</h3>
      </div>
    );
  };

  // Portfolio Overview Section
  const Portfolio = () => (
    <section id="portfolio" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-8">Our Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div onClick={() => setCurrentPortfolioPage('corporate')} className="cursor-pointer">
          <PortfolioCard 
            img="https://placehold.co/300x300/333/FFF?text=Corporate+Films" 
            title="Corporate Films" 
            desc="Showcasing our professional corporate video production expertise." 
            // link="https://youtu.be/pKZ3f8XlhMo?si=q2E7sKo1ezR1Zan9" 
            page="corporate" 
          />
        </div>
        <div onClick={() => setCurrentPortfolioPage('music')} className="cursor-pointer">
          <PortfolioCard 
            img="https://placehold.co/300x300/333/FFF?text=Music+Videos" 
            title="Music Videos" 
            desc="Captivating music videos that bring songs to life." 
            // link="https://youtu.be/dNmHibwmvqI?si=wxyIJHsY2LggTfkf" 
            page="music" 
          />
        </div>
        <div onClick={() => setCurrentPortfolioPage('short')} className="cursor-pointer">
          <PortfolioCard 
            img="https://placehold.co/300x300/333/FFF?text=Short+Films" 
            title="Short Films" 
            desc="Compelling narratives in concise storytelling format." 
            // link="https://youtu.be/irysurGDovw?si=BTB2RLiadAo_gM32" 
            page="short" 
          />
        </div>
        <div onClick={() => setCurrentPortfolioPage('webseries')} className="cursor-pointer">
          <PortfolioCard 
            img="https://placehold.co/300x300/333/FFF?text=Web+Series" 
            title="Web Series" 
            desc="Engaging episodic content for digital platforms." 
            // link="https://youtube.com/playlist?list=PLsdgdmaYXaR9n1bhQsT1DAZz5Jw2kXAGh&si=Fasfbb0uQ4sPLxec" 
            page="webseries" 
          />
        </div>
        <div onClick={() => setCurrentPortfolioPage('socialmedia')} className="cursor-pointer">
          <PortfolioCard 
            img="https://placehold.co/300x300/333/FFF?text=Social+Media" 
            title="Social Media" 
            desc="Viral-worthy content for social media platforms." 
            // link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            page="socialmedia" 
          />
        </div>
      </div>
    </section>
  );

  // Add Back to Portfolio button to each portfolio category component
  const BackToPortfolioBtn = () => (
    <button
      onClick={handleBackToPortfolio}
      className="mb-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
    >
      ← Back to Portfolio
    </button>
  );

  const CorporateFilms = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <BackToPortfolioBtn />
      <h2 className="text-4xl font-bold mb-8">Corporate Films</h2>
      <div className="flex justify-center w-full">
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <PortfolioCard img="/optimized-images/ved_vasudev.jpeg" title="Ved Vasudev Prathisthan" desc="" link="https://youtu.be/pKZ3f8XlhMo?si=q2E7sKo1ezR1Zan9" page="corporate" />
          <PortfolioCard img="/optimized-images/asahi_india.jpeg" title="Asahi India Glass LTD" desc="" link="https://youtu.be/i3i0L4LdC8M" page="corporate" />
          <PortfolioCard img="/optimized-images/happy_eggs.jpeg" title="Happy Eggs" desc=""link="https://youtu.be/J212YpeAPUo?si=A1p_AA1yj81PZMpI" page="corporate" />
          {/* <PortfolioCard img="https://placehold.co/350x350/333/FFF?text=Film+4" title="Film 4" desc="" /> */}
        </div>
      </div>
    </div>
  );
  const MusicVideos = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <BackToPortfolioBtn />
      <h2 className="text-4xl font-bold mb-8">Music Videos</h2>
      <div className="flex justify-center w-full">
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <PortfolioCard img="/optimized-images/vande_mataram.png" title="Vande Mataram" desc="" link="https://youtu.be/dNmHibwmvqI?si=wxyIJHsY2LggTfkf" page="music" />
          <PortfolioCard img="/optimized-images/bhakti_geet.png" title="Bhakti Geet" desc="" link="https://youtu.be/rDgTH4Gp3HE?si=tsmh0mvP6JsR6VMY" page="music" />
          <PortfolioCard img="/optimized-images/gondhal.jpeg" title="Gondhal" desc="" link="https://youtu.be/TcVf62iYbks?si=PuMB7veUTuGpx7Yf" page="music" />
          {/* <PortfolioCard img="https://placehold.co/350x350/333/FFF?text=Film+4" title="Film 4" desc="" /> */}
        </div>
      </div>
    </div>
  );
  const ShortFilms = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <BackToPortfolioBtn />
      <h2 className="text-4xl font-bold mb-8">Short Films</h2>
      <div className="flex justify-center w-full">
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <PortfolioCard img="/optimized-images/motichor_ke_laddo.png" title="Motichoor Ke Laddoo" desc="" link="https://youtu.be/irysurGDovw?si=BTB2RLiadAo_gM32" page="short" />
          <PortfolioCard img="/optimized-images/saarthi.png" title="Saarthi" desc="" link="https://youtu.be/xgOMM4izozs?si=tQRsbBV60XYQ_rk0" page="short" />
          <PortfolioCard img="/optimized-images/tv_2.jpeg" title="TV" desc="" link="" page="short" /> //Link not available
          {/* <PortfolioCard img="https://placehold.co/350x350/333/FFF?text=Film+4" title="Film 4" desc="" /> */}
        </div>
      </div>
    </div>
  );
  const WebSeries = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <BackToPortfolioBtn />
      <h2 className="text-4xl font-bold mb-8">Web Series</h2>
      <div className="flex justify-center w-full">
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <PortfolioCard img="/optimized-images/mai_bhi_youtuber.png" title="Mai Bhi Youtuber" desc="" link="https://youtube.com/playlist?list=PLsdgdmaYXaR9n1bhQsT1DAZz5Jw2kXAGh&si=Fasfbb0uQ4sPLxec" page="webseries" />
          <PortfolioCard img="/optimized-images/dverb_archives.png" title="Dverb Archives" desc="" link="https://youtube.com/playlist?list=PL6MF45xwWlcAn3wkG848hjP4jOz9KihQ0&si=MOtiVGmfbEXJ5avb" page="webseries" />
          <PortfolioCard img="/optimized-images/antarpat.jpeg" title="Antarpat" desc="" link ="https://youtu.be/U_Yme-0BoCw?si=iG2F0tGA9q8wB-bi" page="webseries" />
        </div>
      </div>
    </div>
  );
  const SocialMedia = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <BackToPortfolioBtn />
      <h2 className="text-4xl font-bold mb-8">Social Media</h2>
      <div className="flex justify-center w-full">
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <PortfolioCard img="/optimized-images/download.png" title="The Mad Riyazi" desc="" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" page="socialmedia" />
          <PortfolioCard img="/optimized-images/firodiya_karandak.png" title="Firodiya Karanadak" desc="" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" page="socialmedia" />
          <PortfolioCard img="/optimized-images/footloose_journeys.png" title="Footloose Journeys" desc="" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" page="socialmedia" />
          <PortfolioCard img="/optimized-images/mahua_store.png" title="Mahua Store" desc="" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" page="socialmedia" />
        </div>
      </div>
    </div>
  );

  // Team Section
  const TeamSection = () => (
    <section id="team" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          OUR TEAM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Abhishek Shinde */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700">
            <img
              src="/optimized-images/abhishek_profile.jpg"
              alt="Abhishek Shinde"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-400"
            />
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">Abhishek Shinde</h3>
            <p className="text-gray-300">
              A prolific Director to whom the actors often turn for mentorship
            </p>
          </div>
          {/* Vedant Naik */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700">
            <img
              src="/optimized-images/vedant_profile.jpg"
              alt="Vedant Naik"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-pink-400"
            />
            <h3 className="text-2xl font-semibold mb-2 text-pink-400">Vedant Naik</h3>
            <p className="text-gray-300">
              Trained at FTII, he will not say action unless the script is absolutely perfect. A true visionary.
            </p>
          </div>
          {/* Yogish */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-700">
            <img
              src="/optimized-images/yogish_profile.png"
              alt="Yogish"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-400"
            />
            <h3 className="text-2xl font-semibold mb-2 text-purple-400">Yogish Deshmukh</h3>
            <p className="text-gray-300">
              An incredible talent behind the camera, Yog brings every scene to life with his unique perspective.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );

  // Contact Section
  const ContactSection = () => (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-4xl w-full mx-auto text-center bg-gray-800 p-12 md:p-20 rounded-3xl shadow-2xl border-4 border-transparent bg-clip-padding">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          LET'S CONNECT
        </h2>
        <div className="space-y-8 text-lg md:text-xl">
          <p className="flex items-center justify-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 8237498412
          </p>
          <p className="flex items-center justify-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0h18" />
            </svg>
            lokrangcreation@gmail.com
          </p>
          <div className="flex items-center justify-center space-x-8">
            {/* Social Media Icons */}
            <a href="https://youtube.com/@lokrangcreations?si=PSVJ1bQ-gMOUCWqz" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/lokrang_creations?igsh=MXN2enJnaTRidTEw" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.254-.148-4.769-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0 2.163c-3.204 0-3.584.012-4.85.07-2.89.132-3.96 1.487-4.092 4.092-.058 1.265-.07 1.646-.07 4.85s.012 3.584.07 4.85c.132 2.89 1.487 3.96 4.092 4.092 1.265.058 1.646.07 4.85.07s3.584-.012 4.85-.07c2.89-.132 3.96-1.487 4.092-4.092.058-1.265.07-1.646.07-4.85s-.012-3.584-.07-4.85c-.132-2.89-1.487-3.96-4.092-4.092-1.265-.058-1.646-.07-4.85-.07zm0 3.627c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5zm0 2.163c1.265 0 2.337 1.072 2.337 2.337s-1.072 2.337-2.337 2.337-2.337-1.072-2.337-2.337 1.072-2.337 2.337-2.337zm6.406-7.062c-.815 0-1.478.663-1.478 1.478s.663 1.478 1.478 1.478 1.478-.663 1.478-1.478-.663-1.478-1.478-1.478z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/19EWnTDY44/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </div>
        </div>
        <p className="mt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} LOKRANG CREATIONS. All rights reserved.
        </p>
      </div>
    </section>
  );

  // Main Render
  return (
    <Router>
      <div className="font-inter antialiased">
        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Custom CSS for animations */}
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

          body {
            font-family: 'Inter', sans-serif;
          }

          /* Fade In Animation */
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }

          /* Slide Up Animation */
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
          }
          .animate-slide-up-delay {
            animation: slide-up 0.8s ease-out 0.2s forwards;
          }
          .animate-slide-up-delay-2 {
            animation: slide-up 0.8s ease-out 0.4s forwards;
          }

          /* Zoom In Animation */
          @keyframes zoom-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-zoom-in {
            animation: zoom-in 0.8s ease-out forwards;
          }

          /* Scale In Animation */
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
            animation: scale-in 0.8s ease-out forwards;
          }

          /* Navigation link hover effect */
          .nav-link {
            position: relative;
            display: inline-block;
            padding-bottom: 4px; /* Space for the underline */
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #6366f1; /* Indigo-500 */
            transition: width 0.3s ease-in-out;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          main {
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            height: 100vh;
          }

          section {
            scroll-snap-align: start;
          }
          `}
        </style>

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-lg z-50 p-4">
          <div className="w-full flex justify-between items-center">
            {/* Logo/Brand Name */}
            <button onClick={() => scrollToSection('home')} className="text-white text-2xl font-bold tracking-wide flex items-center space-x-2 focus:outline-none pl-0 ml-0">
              <img
                src="/optimized-images/LogoBlack.png"
                alt="Lokrang Creations Logo"
                className="h-10 w-auto object-contain mr-2"
              />
              <span
                className="bg-gradient-to-r from-[#ea33b3] via-[#e6806a] via-[#911cbb] via-[#7420c2] to-[#59c2d2] bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                LOKRANG CREATIONS
              </span>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6 text-lg">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors duration-300 nav-link focus:outline-none">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors duration-300 nav-link focus:outline-none">About Us</button>
              <button onClick={() => scrollToSection('forte')} className="text-gray-300 hover:text-white transition-colors duration-300 nav-link focus:outline-none">Our Forte</button>
              <div className="relative group">
                <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-white transition-colors duration-300 nav-link focus:outline-none">Portfolio</button>
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top">
                  <button onClick={() => setCurrentPortfolioPage('corporate')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md focus:outline-none">Corporate Films</button>
                  <button onClick={() => setCurrentPortfolioPage('music')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md focus:outline-none">Music Videos</button>
                  <button onClick={() => setCurrentPortfolioPage('short')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md focus:outline-none">Short Films</button>
                  <button onClick={() => setCurrentPortfolioPage('webseries')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md focus:outline-none">Web Series</button>
                  <button onClick={() => setCurrentPortfolioPage('socialmedia')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md focus:outline-none">Social Media</button>
                </div>
              </div>
              <button onClick={() => scrollToSection('team')} className="text-gray-300 hover:text-white transition-colors duration-300 nav-link focus:outline-none">Our Team</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors duration-300 nav-link focus:outline-none">Connect</button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg py-4 animate-fade-in-down">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-6 py-3 text-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-6 py-3 text-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('forte')}
                className="block w-full text-left px-6 py-3 text-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
              >
                Our Forte
              </button>
              {/* Portfolio dropdown for mobile */}
              <div className="relative">
                <button
                  onClick={() => { /* Toggle portfolio sub-menu if needed, for now just a button */ }}
                  className="block w-full text-left px-6 py-3 text-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
                >
                  Portfolio
                </button>
                <div className="pl-8">
                  <button onClick={() => setCurrentPortfolioPage('corporate')} className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Corporate Films</button>
                  <button onClick={() => setCurrentPortfolioPage('music')} className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Music Videos</button>
                  <button onClick={() => setCurrentPortfolioPage('short')} className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Short Films</button>
                  <button onClick={() => setCurrentPortfolioPage('webseries')} className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Web Series</button>
                  <button onClick={() => setCurrentPortfolioPage('socialmedia')} className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Social Media</button>
                </div>
              </div>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left px-6 py-3 text-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Our Team</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-6 py-3 text-white hover:bg-gray-700 transition-colors duration-300 focus:outline-none">Connect</button>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {console.log("Rendering main content")} {/* Debug log */}
          {currentPortfolioPage === null ? (
            <>
              <HomeSection />
              <AboutSection />
              <ForteSection />
              <Portfolio />
              <TeamSection />
              <ContactSection />
            </>
          ) : currentPortfolioPage === 'corporate' ? (
            <CorporateFilms />
          ) : currentPortfolioPage === 'music' ? (
            <MusicVideos />
          ) : currentPortfolioPage === 'short' ? (
            <ShortFilms />
          ) : currentPortfolioPage === 'webseries' ? (
            <WebSeries />
          ) : currentPortfolioPage === 'socialmedia' ? (
            <SocialMedia />
          ) : null}
        </main>
      </div>
    </Router>
  );
}

export default App;
