"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock } from "@phosphor-icons/react/dist/ssr";
import SignUpDialog from "../auth/signup-dialog";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 z-0" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-accent/80" />
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-2xl" />

      {/* Animated Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 rounded-full border-4 border-primary/20 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-20 h-20 rounded-full border-4 border-accent/20 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-background rounded-2xl shadow-xl p-10 border border-border relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Card Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/30 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            {/* Text Content */}
            <div className="text-left space-y-6 flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Ready to <span className="text-primary">Secure</span> Your
                  Legacy?
                </h2>

                <div className="w-20 h-1 bg-primary mt-4 rounded-full" />

                <p className="text-lg md:text-xl text-muted-foreground mt-6">
                  Take the first step to protect your life's work and ensure it
                  reaches those you love—exactly when it matters most.
                </p>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={20}
                    className="text-primary"
                    weight="fill"
                  />
                  <span className="text-sm font-medium">
                    Bank-Level Security
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={20} className="text-primary" weight="fill" />
                  <span className="text-sm font-medium">
                    Privacy Guaranteed
                  </span>
                </div>
              </motion.div>
            </div>

            {/* CTA Button Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-primary/5 p-6 rounded-xl border border-primary/20 w-full md:w-auto"
            >
              <div className="text-center space-y-4">
                <p className="font-medium text-foreground">
                  Start your 14-day free trial
                </p>
                <SignUpDialog>
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all w-full flex items-center justify-center gap-2 py-6"
                  >
                    <span>Get Started Now</span>
                    <ArrowRight size={18} weight="bold" />
                  </Button>
                </SignUpDialog>
                <p className="text-xs text-muted-foreground">
                  No credit card required
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
