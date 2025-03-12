"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X, CaretUp, Crown, Star } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export default function PricingSection() {
  const sectionRef = useRef(null);
  const [activePlan, setActivePlan] = useState(1); // Default to Standard plan
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Plan details
  const plans = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      icon: CaretUp,
      color: "bg-blue-500",
      tagline: "For getting started",
      features: [
        { text: "5 Assets", available: true },
        { text: "1 Nominee", available: true },
        { text: "Email Alerts", available: true },
        { text: "Advanced Encryption", available: false },
        { text: "Priority Support", available: false },
      ],
    },
    {
      name: "Standard",
      price: "$19",
      period: "/month",
      icon: Star,
      color: "bg-primary",
      tagline: "Most popular choice",
      features: [
        { text: "20 Assets", available: true },
        { text: "5 Nominees", available: true },
        { text: "Email + SMS Alerts", available: true },
        { text: "Advanced Encryption", available: true },
        { text: "Priority Support", available: false },
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "$39",
      period: "/month",
      icon: Crown,
      color: "bg-purple-600",
      tagline: "Complete protection",
      features: [
        { text: "Unlimited Assets", available: true },
        { text: "Unlimited Nominees", available: true },
        { text: "Email + SMS Alerts", available: true },
        { text: "Advanced Encryption", available: true },
        { text: "Priority Support", available: true },
      ],
    },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/20 z-0" 
        style={{ y: backgroundY }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-primary to-purple-600" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Pricing{" "}
              <span className="text-primary relative inline-block">
                Plans
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure your legacy with a plan that perfectly balances your needs and budget.
            </p>
          </motion.div>

          {/* Pricing Cards - 3D Carousel */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const isActive = activePlan === index;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => setActivePlan(index)}
                  className={`w-full lg:w-1/3 bg-background rounded-2xl border-2 transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? `border-${plan.color.replace('bg-', '')} shadow-xl shadow-${plan.color.replace('bg-', '')}/20 z-20 scale-105 lg:scale-110` 
                      : 'border-border shadow-md hover:shadow-lg z-10'
                    } 
                    ${index === 1 ? 'lg:-mx-4' : ''}
                  `}
                  style={{ 
                    transformOrigin: 'center bottom',
                  }}
                >
                  {/* Plan header */}
                  <div className={`${plan.color} text-white p-6 rounded-t-xl relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`${plan.name}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 0,20 L 20,0" stroke="white" strokeWidth="1" fill="none" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#${plan.name}-grid)`} />
                      </svg>
                    </div>
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{plan.tagline}</p>
                      </div>
                      <plan.icon size={28} weight="duotone" className="opacity-90" />
                    </div>
                    
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 opacity-80">{plan.period}</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="p-6 space-y-4">
                    {plan.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors
                          ${feature.available 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                          }
                          ${isActive && feature.available ? 'bg-muted/50' : ''}
                        `}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center
                          ${feature.available 
                            ? `${plan.color} text-white` 
                            : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {feature.available ? (
                            <Check size={14} weight="bold" />
                          ) : (
                            <X size={14} />
                          )}
                        </div>
                        <span className="font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="p-6 pt-2">
                    <Button
                      className={`w-full py-6 rounded-xl font-medium text-white
                        ${isActive 
                          ? plan.color
                          : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                    >
                      {isActive ? 'Get Started Now' : 'Select Plan'}
                    </Button>
                    
                    {/* No credit card message */}
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      No credit card required for 14-day trial
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Bottom details */}
          <motion.div 
            variants={itemVariants}
            className="bg-muted/30 p-6 rounded-xl border border-border max-w-3xl mx-auto text-center"
          >
            <h4 className="font-semibold text-foreground">All plans include:</h4>
            <p className="mt-2 text-muted-foreground">
              Industry-leading security, automated backups, 24/7 monitoring, and 30-day money-back guarantee.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Button variant="link" className="text-primary">
                Compare all features
              </Button>
              <Button variant="link" className="text-foreground">
                Enterprise options
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}