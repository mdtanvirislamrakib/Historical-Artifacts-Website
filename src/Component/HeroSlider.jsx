import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import sliderImage1 from "../assets/sliderImage1.jpg";
import sliderImage2 from "../assets/image2.jpg";
import sliderImage3 from "../assets/sliderImage3.jpg";
import sliderImage4 from "../assets/sliderImage4.jpg";

const slides = [
  {
    img: sliderImage1,
    title: "Preserving the Past",
    desc: "Explore rare and ancient artifacts from around the world.",
    highlight: "New arrivals just added!",
    cta: { label: "Explore Now", href: "#explore" }
  },
  {
    img: sliderImage2,
    title: "Unlock Hidden Stories",
    desc: "Every artifact tells a unique story. Embark on a journey of discovery and connect with history.",
    highlight: "Curator's Picks • June 2025",
    cta: { label: "Browse Stories", href: "/artifacts" }
  },
  {
    img: sliderImage3,
    title: "A Digital Museum",
    desc: "Access a curated collection of humanity's greatest treasures, anytime, anywhere. Experience immersive virtual tours.",
    highlight: "Experience our 3D Gallery",
    cta: { label: "Start Tour", href: "/virtual-gallery" }
  },
  {
    img: sliderImage4,
    title: "Your Portal to History",
    desc: "Join HistoriVault and be part of a global community of explorers. Share, favorite, and discuss your discoveries.",
    highlight: "Create your free account",
    cta: { label: "Get Started", href: "/signup" }
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const zoomVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center bg-black/90 overflow-hidden select-none">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: rgba(255,255,255,0.7); margin: 0 6px;"></span>`;
          },
        }}
        className="w-full h-full relative"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        speed={1200} // smooth transition between slides
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[75vh] flex items-center justify-center">
              {/* Background image with zoom animation */}
              <motion.img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55] blur-[1.5px] scale-105"
                draggable="false"
                loading="eager"
                initial="hidden"
                animate="visible"
                variants={zoomVariants}
                key={idx}
              />

              {/* Glass overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-amber-900/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />

              {/* Content container with staggered animations */}
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`content-${activeIndex}`} // Re-mount on slide change for fresh animation
              >
                {/* Highlight badge */}
                <motion.div
                  className="mb-4 flex items-center gap-2 bg-amber-400/20 text-amber-200 px-4 py-1 rounded-full font-semibold text-xs uppercase tracking-widest shadow shadow-amber-300/10 backdrop-blur-md border border-amber-300/20"
                  variants={itemVariants}
                >
                  <span>{slide.highlight}</span>
                </motion.div>

                {/* Title with typewriter-effect */}
                <motion.h1
                  className="min-h-[56px] md:min-h-[72px] text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-600 drop-shadow-2xl mb-4"
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 80,
                        damping: 10,
                        delay: 0.2
                      }
                    }
                  }}
                >
                  {activeIndex === idx && (
                    <Typewriter
                      key={activeIndex}
                      options={{
                        strings: slide.title,
                        autoStart: true,
                        delay: 55,
                        deleteSpeed: 36,
                        pauseFor: 2600,
                        loop: false,
                        cursor: "_"
                      }}
                    />
                  )}
                  {/* If not active, just show raw */}
                  {activeIndex !== idx && <span>{slide.title}</span>}
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-2xl text-gray-200/90 font-medium mb-6 max-w-2xl drop-shadow-xl"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.8
                      }
                    }
                  }}
                >
                  {slide.desc}
                </motion.p>

                {/* CTA Button */}
                <motion.a
                  href={slide.cta.href}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-700 text-black font-bold text-lg shadow-xl hover:scale-105 hover:from-amber-400 hover:to-amber-600 transition-all duration-300 border border-amber-100/20"
                  variants={{
                    hidden: { scale: 0.8, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                        delay: 0.6
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slide.cta.label}
                  <ArrowRight className="h-5 w-5 ml-1" />
                </motion.a>

                {/* Info Row */}
                <motion.div
                  className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.8
                      }
                    }
                  }}
                >
                  <motion.div 
                    className="flex items-center gap-1 text-amber-300/80 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-300/10"
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      visible: { x: 0, opacity: 1 }
                    }}
                  >
                    <span className="font-extrabold">10,000+</span> Artifacts
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1 text-amber-300/80 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-300/10"
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                  >
                    Trusted by <span className="font-extrabold">200+ Museums</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1 text-amber-300/80 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-300/10"
                    variants={{
                      hidden: { x: 20, opacity: 0 },
                      visible: { x: 0, opacity: 1 }
                    }}
                  >
                    <span className="font-extrabold">Global Community</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div 
                className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/30 rounded-full blur-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-40 h-40 bg-amber-700/20 rounded-full blur-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              />
              <motion.div 
                className="absolute top-10 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent opacity-30 pointer-events-none"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styling */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          bottom: 30px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          z-index: 10;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.7);
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #f59e0b;
          width: 12px;
          height: 12px;
          transform: scale(1.2);
        }
      `}</style>

      {/* Overlay for reflection */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      {/* Subtle Reflection/Highlight */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      />
    </section>
  );
};

export default HeroSlider;