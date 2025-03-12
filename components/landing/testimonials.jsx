"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChatsCircle, CaretLeft, CaretRight, Star, Quotes } from "@phosphor-icons/react/dist/ssr";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const testimonialsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 0.8]);
  
  const testimonials = [
    {
      name: "Rajiv Sharma",
      role: "Business Owner",
      image: "/api/placeholder/100/100",
      content: "As someone with multiple business interests, Uttaradhikari has simplified my estate planning significantly. The peace of mind knowing my family will have clear instructions is invaluable.",
      rating: 5,
    },
    {
      name: "Priya Mehta",
      role: "Parent & Homeowner",
      image: "/api/placeholder/100/100",
      content: "I've worried for years about what would happen to my children if something happened to me. This platform has taken that worry away, knowing everything is organized and accessible when needed.",
      rating: 5,
    },
    {
      name: "Vikram Patel",
      role: "Investment Banker",
      image: "/api/placeholder/100/100",
      content: "The encryption and security measures on this platform are impressive. As someone who deals with sensitive financial information daily, I trust Uttaradhikari with my most important assets.",
      rating: 4,
    },
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, testimonials.length]);
  
  // Pause autoplay when hovering over testimonials
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ opacity: testimonialsOpacity }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center justify-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4"
            >
              <ChatsCircle size={20} className="text-primary" weight="duotone" />
              <span className="text-sm font-medium text-primary">Testimonials</span>
            </motion.div>
            
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              What Our Users <span className="text-primary">Say</span>
            </motion.h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-1 w-24 bg-primary/40 mx-auto mt-6"
            />
          </div>
          
          {/* Testimonial slider */}
          <div className="relative">
            {/* Main testimonial display */}
            <div className="relative h-full">
              <div className="absolute -top-12 -left-12 text-primary/10">
                <Quotes size={120} weight="fill" />
              </div>
              
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : activeIndex > index ? -100 : 100,
                    scale: activeIndex === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`bg-background/60 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-xl border border-border/60 ${activeIndex === index ? 'block' : 'hidden'}`}
                >
                  <div className="md:flex items-start gap-8">
                    {/* Testimonial content */}
                    <div className="md:flex-1">
                      <div className="flex items-center space-x-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            weight={i < testimonial.rating ? "fill" : "regular"} 
                            className={i < testimonial.rating ? "text-amber-400" : "text-muted-foreground/30"} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-lg md:text-xl text-foreground/90 mb-8 italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="md:flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="hidden md:block h-52 w-1 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 rounded-full mt-8">
                    </div>
                    
                    {/* Verification badges */}
                    <div className="hidden md:block w-48 space-y-4 mt-8">
                      <div className="bg-background/80 p-3 rounded-lg border border-border/60 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Verified User</span>
                      </div>
                      
                      <div className="bg-background/80 p-3 rounded-lg border border-border/60 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Secure Legacy</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation controls */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary w-8' : 'bg-primary/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all"
                  aria-label="Previous testimonial"
                >
                  <CaretLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all"
                  aria-label="Next testimonial"
                >
                  <CaretRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}