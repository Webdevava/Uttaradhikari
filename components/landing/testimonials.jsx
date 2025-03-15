"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChatsCircle, CaretLeft, CaretRight, Star, Quotes } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
      name: "Amit Sharma",
      location: "Mumbai",
      image: "/api/placeholder/100/100",
      content: "After my father's passing, we had no idea about his investments. It took us months to figure things out. If this platform had existed back then, our financial stability wouldn't have been affected.",
      rating: 5,
      highlightWords: ["father's passing", "investments", "financial stability"],
    },
    {
      name: "Neha Jadhav",
      location: "Pune",
      image: "/api/placeholder/100/100",
      content: "I have assets that I don't want my family to know about right now, but I also don't want them to go to waste. This platform gives me the peace of mind to disclose them at the right time.",
      rating: 5,
      highlightWords: ["assets", "peace of mind", "right time"],
    },
    {
      name: "Shweta Rathi",
      location: "Nagpur",
      image: "/api/placeholder/100/100",
      content: "I now have complete peace of mind knowing my family won't struggle to find my important documents and financial details if anything happens to me.",
      rating: 5,
      highlightWords: ["peace of mind", "documents", "financial details"],
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

  // Highlight specific words in testimonials
  const highlightText = (text, wordsToHighlight) => {
    if (!wordsToHighlight || wordsToHighlight.length === 0) return text;
    
    const parts = text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi'));
    return parts.map((part, index) => {
      const isHighlighted = wordsToHighlight.some(word => 
        part.toLowerCase() === word.toLowerCase()
      );
      return isHighlighted ? 
        <span key={index} className="text-primary font-medium">{part}</span> : 
        <span key={index}>{part}</span>;
    });
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
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-primary/15 rounded-full blur-2xl" />
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
              Real Stories, <span className="text-primary">Real Impact</span>
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Hear how our platform has helped families navigate difficult times
            </motion.p>
            
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
            <div className="relative min-h-[400px]">
              <div className="absolute -top-16 -left-16 text-primary/10 hidden md:block">
                <Quotes size={150} weight="fill" />
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
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`bg-background/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-lg border border-primary/10 ${activeIndex === index ? 'block' : 'hidden'}`}
                >
                  <div className="md:flex items-start gap-8">
                    {/* Left column - testimonial content */}
                    <div className="md:flex-1">
                      <div className="flex items-center space-x-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={20} 
                            weight={i < testimonial.rating ? "fill" : "regular"} 
                            className={i < testimonial.rating ? "text-amber-400" : "text-muted-foreground/30"} 
                          />
                        ))}
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                      >
                        <Quotes size={30} weight="fill" className="absolute -top-4 -left-2 text-primary/20" />
                        <p className="text-lg md:text-xl text-foreground/90 mb-8 italic leading-relaxed pl-6">
                          {highlightText(testimonial.content, testimonial.highlightWords)}
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center space-x-4"
                      >
                        <Avatar className="w-14 h-14 border-2 border-primary/30">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-foreground text-lg">{testimonial.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">Verified User</Badge>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Right column - decorative elements */}
                    <div className="hidden md:flex flex-col items-center mt-4 md:mt-0">
                      <div className="h-52 w-1 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 rounded-full mb-8"></div>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="space-y-4 w-60"
                      >
                        <div className="bg-background/80 p-4 rounded-lg border border-primary/20 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Verified Experience</span>
                        </div>
                        
                        <div className="bg-background/80 p-4 rounded-lg border border-primary/20 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Data Protection</span>
                        </div>
                        
                        <div className="bg-background/80 p-4 rounded-lg border border-primary/20 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Timely Legacy</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation controls */}
            <div className="flex items-center justify-between mt-12">
              <div className="flex items-center space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary w-10' : 'bg-primary/30 w-3'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors duration-300"
                  aria-label="Previous testimonial"
                >
                  <CaretLeft size={20} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors duration-300"
                  aria-label="Next testimonial"
                >
                  <CaretRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}