"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  SignIn,
  UserPlus,
  Lock,
  EnvelopeSimple,
  Clock,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useRef, useState, useEffect } from "react";

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = Array(6).fill(0).map(() => useRef(null));
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const progressLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Check which step is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.7 }
    );

    stepRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      stepRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

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

  const stepVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const steps = [
    {
      icon: SignIn,
      title: "Sign Up",
      description: "Create your secure account with a simple login and two-factor authentication to begin protecting your legacy.",
    },
    {
      icon: UserPlus,
      title: "Add Nominees",
      description: "Designate the loved ones or trusted individuals who will inherit your assets with customizable access levels.",
    },
    {
      icon: Lock,
      title: "Secure Your Details",
      description: "Upload your financial, property, and personal details into our encrypted vault with military-grade protection.",
    },
    {
      icon: EnvelopeSimple,
      title: "Set Alerts",
      description: "Define custom conditions—like unanswered messages or inactivity periods—to trigger the notification process.",
    },
    {
      icon: Clock,
      title: "We Monitor",
      description: "Our intelligent system watches silently, checking in only when needed while respecting your privacy at all times.",
    },
    {
      icon: CheckCircle,
      title: "Pass to Nominees",
      description: "When the time comes, your legacy is securely shared with your chosen nominees through our verified handover process.",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-background py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={stepVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How It{" "}
              <span className="text-primary relative inline-block">
                Works
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              A seamless journey from safeguarding your life's work to passing it on with care and precision.
            </p>
          </motion.div>

          {/* Progress Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-[300px] bottom-[100px] w-1 bg-muted/30 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-primary rounded-full"
              style={{ height: progressLineHeight }}
            />
          </div>

          {/* Steps Timeline */}
          <div className="relative max-w-5xl mx-auto">
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  ref={stepRefs[index]}
                  data-index={index}
                  variants={stepVariants}
                  className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Step icon - larger for desktop */}
                  <motion.div 
                    className="hidden md:flex relative w-32 h-32 bg-primary/10 rounded-xl items-center justify-center shrink-0 mx-8"
                    whileInView={{ scale: [0.8, 1.1, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 0.8 }}
                  >
                    <step.icon size={48} className="text-primary" weight="duotone" />
                    <div className={`absolute w-3 h-3 bg-primary rounded-full ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} top-1/2 -translate-y-1/2`} />
                    
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </motion.div>

                  {/* Step content */}
                  <motion.div 
                    className="relative bg-background p-7 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all z-10 max-w-xl mx-auto md:mx-0"
                    whileHover={{ y: -5 }}
                  >
                    {/* Mobile icon with number */}
                    <div className="md:hidden absolute -top-4 -left-4 w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                      <step.icon size={28} className="text-primary" weight="duotone" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mt-6 md:mt-0">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground text-lg">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}