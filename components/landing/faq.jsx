"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { CaretDown, QuestionMark, Lightbulb, Shield, Clock } from "@phosphor-icons/react/dist/ssr";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const rotateBackground = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  const faqs = [
    {
      icon: Shield,
      question: "How secure is my data?",
      answer: "Your data is encrypted with military-grade security and stored in a vault that only activates when conditions are met. We use end-to-end encryption and zero-knowledge architecture to ensure that only you and your designated nominees can access your information when the time is right.",
    },
    {
      icon: Clock,
      question: "What happens if I don't respond to alerts?",
      answer: "After five unanswered emails or notifications, your pre-set plan triggers, securely passing your assets to your nominees. This automated system ensures nothing falls through the cracks, while giving you ample opportunity to respond if you're simply on vacation or temporarily unreachable.",
    },
    {
      icon: QuestionMark,
      question: "Can I change my nominees?",
      answer: "Yes, you can update your nominees anytime through your secure dashboard. We've made the process simple while maintaining strict security protocols to verify your identity before any changes are made to your succession plan.",
    },
    {
      icon: Lightbulb,
      question: "Is there a limit to the assets I can add?",
      answer: "No limits—add as many financial, property, or personal assets as you need. Our flexible system accommodates everything from traditional assets like real estate and bank accounts to digital assets such as cryptocurrencies and online accounts.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/20" id="faq">
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-70"
        style={{ rotate: rotateBackground }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-70"
        style={{ rotate: rotateBackground }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-16 max-w-4xl mx-auto"
        >
          {/* Heading */}
          <div className="text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-foreground"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked{" "}
              <span className="text-primary relative inline-block">
                Questions
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Everything you need to know about securing your legacy with confidence and clarity.
            </motion.p>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-xl overflow-hidden"
              >
                <div 
                  className={`p-6 rounded-xl bg-background border border-border shadow-sm ${
                    activeIndex === index 
                      ? "border-primary/50 shadow-primary/10" 
                      : "hover:border-primary/30"
                  } transition-all cursor-pointer`}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <faq.icon size={24} className="text-primary" weight="duotone" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{faq.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary"
                    >
                      <CaretDown size={24} weight="bold" />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-6 pt-6 border-t border-border">
                          <p className="text-muted-foreground text-lg">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Support */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-muted-foreground">
              Still have questions? {" "}
              <motion.a 
                href="#contact" 
                className="text-primary font-medium inline-flex items-center"
                whileHover={{ x: 5 }}
              >
                Contact our support team
                <motion.span className="ml-1">→</motion.span>
              </motion.a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}