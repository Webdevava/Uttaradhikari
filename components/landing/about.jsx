"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  LockKey,
  EyeSlash,
  Quotes,
} from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const rotateQuotes = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scaleCards = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section ref={sectionRef} className="bg-background py-32 relative overflow-hidden" id="about">
      {/* Simplified Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right opacity-40"></div>
      <div className="absolute right-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl top-1/3"></div>
      
      {/* Simplified Quote Decorations */}
      <motion.div 
        className="absolute left-10 top-40 text-primary/5 hidden lg:block" 
        style={{ rotate: rotateQuotes }}
      >
        <Quotes size={120} weight="fill" />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto space-y-24"
        >
          {/* Heading with Simplified Background */}
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              variants={itemVariants}
              className="relative inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground relative">
                About{" "}
                <span className="text-primary font-extrabold">Uttaradhikari</span>
              </h2>
            </motion.div>
            <motion.p 
              variants={itemVariants} 
              className="mt-6 text-xl text-muted-foreground max-w-2xl text-center"
            >
              "Securing Your Story for Those You Love"
            </motion.p>
          </div>

          {/* Our Purpose - Simplified Split Design */}
          <motion.div 
            variants={itemVariants} 
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Left side - Headline and description */}
            <div className="space-y-8">
              <motion.div 
                className="w-16 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <h3 className="text-3xl font-semibold text-foreground">Our Purpose</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Life's twists and turns shouldn't unravel your legacy. We built
                Uttaradhikari to cradle your financial dreams, personal wishes,
                and chosen heirs in a safe embrace—revealed only when the moment
                is right.
              </p>
              <p className="text-lg text-foreground font-medium">
                Because what matters most deserves the greatest protection.
              </p>
            </div>
            
            {/* Right side - Legacy Shield Visual */}
            <div className="aspect-square relative flex items-center justify-center">
              {/* Central shield icon */}
              <motion.div
                className="relative z-10 bg-background p-8 rounded-xl shadow-md border border-primary/20"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  <ShieldCheck size={72} weight="duotone" className="text-primary" />
                  <div className="text-center">
                    <h4 className="font-bold text-2xl text-foreground">Your Legacy</h4>
                    <p className="font-medium text-primary mt-2">Securely Preserved</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Reduced decorative elements */}
              <motion.div 
                className="absolute w-12 h-12 rounded-full bg-primary/10 top-20 right-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>

          {/* What Sets Us Apart - Cleaner Card Layout */}
          <motion.div variants={itemVariants} className="space-y-12">
            <h3 className="text-3xl font-semibold text-foreground text-center">
              What Sets Us Apart
              <motion.span
                className="block mx-auto mt-4 w-16 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />
            </h3>
            
            <motion.div 
              style={{ scale: scaleCards }} 
              className="grid md:grid-cols-3 gap-8 mt-10"
            >
              {/* Card 1 */}
              <motion.div
                variants={itemVariants}
                className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <ShieldCheck
                  size={40}
                  className="text-primary mb-6"
                  weight="duotone"
                />
                <h4 className="text-xl font-semibold text-foreground">Beyond Storage</h4>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We don't just hold your details—we guard them until they're
                  needed most, with continuous monitoring and verification.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                variants={itemVariants}
                className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <LockKey
                  size={40}
                  className="text-primary mb-6"
                  weight="duotone"
                />
                <h4 className="text-xl font-semibold text-foreground">Verified Timing</h4>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Nothing is shared until we're certain—your wishes stay locked
                  until the right time through our multi-layered verification.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={itemVariants}
                className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <EyeSlash
                  size={40}
                  className="text-primary mb-6"
                  weight="duotone"
                />
                <h4 className="text-xl font-semibold text-foreground">Privacy First</h4>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Your secrets remain yours—hidden from all until you say
                  otherwise, with zero-knowledge encryption that protects your privacy.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Footer Tagline */}
          <motion.div 
            variants={itemVariants}
            className="text-center pt-8 border-t border-border"
          >
            <p className="text-xl text-foreground font-medium">
              At Uttaradhikari, we believe your legacy deserves more than just a vault.
            </p>
            <p className="text-primary mt-3 font-semibold text-xl">
              It deserves a guardian.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}