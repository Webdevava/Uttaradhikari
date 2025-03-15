"use client";

import { motion } from "framer-motion";
import {
  LockKey,
  ShieldCheck,
  Gear,
  Eye,
  Database,
  UserCircle
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";

export default function SecurityPrivacySection() {
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
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Security & Privacy
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              How We Keep You Safe
            </p>
          </motion.div>

          {/* Security shield visual */}
          <motion.div 
            variants={itemVariants}
            className="relative mx-auto mb-16 w-32 h-32 md:w-40 md:h-40"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-full"
            >
              <ShieldCheck size={64} weight="duotone" className="text-primary" />
            </motion.div>
          </motion.div>

          {/* Main Features */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Bank-Grade Security */}
            <Card className="overflow-hidden border-border hover:border-primary/40 transition-all">
              <motion.div
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <LockKey size={28} weight="duotone" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Bank-Grade Security</h3>
                  <p className="text-muted-foreground">
                    AES-256 encryption ensures maximum protection of all your sensitive information.
                  </p>
                </CardContent>
              </motion.div>
            </Card>

            {/* Triple Verification */}
            <Card className="overflow-hidden border-border hover:border-primary/40 transition-all">
              <motion.div
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={28} weight="duotone" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Triple Verification</h3>
                  <p className="text-muted-foreground">
                    No premature disclosure of your data. We verify thoroughly before any information is shared.
                  </p>
                </CardContent>
              </motion.div>
            </Card>

            {/* Complete Control */}
            <Card className="overflow-hidden border-border hover:border-primary/40 transition-all">
              <motion.div
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Gear size={28} weight="duotone" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Complete Control</h3>
                  <p className="text-muted-foreground">
                    You control what's revealed, when, and to whom. Your data remains under your authority at all times.
                  </p>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>

          {/* Privacy Promises */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20"
          >
            <div className="absolute -top-5 -left-5">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Eye size={20} weight="duotone" className="text-primary" />
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-foreground mb-4">Our Privacy Promise</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Database size={24} className="text-primary flex-shrink-0 mt-1" weight="duotone" />
                <p className="text-muted-foreground">
                  We respect your privacy. Your data remains yours—always.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <UserCircle size={24} className="text-primary flex-shrink-0 mt-1" weight="duotone" />
                <p className="text-muted-foreground">
                  Your data is never shared, sold, or accessed without your consent.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-foreground italic">
                "Security isn't just a feature—it's the foundation of everything we build."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
    </section>
  );
}