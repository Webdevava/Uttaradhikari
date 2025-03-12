// app/components/FeaturesSection.jsx
"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Clock,
  Shield,
  FileText,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";

export default function FeaturesSection() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Features That{" "}
              <span className="text-primary">Secure Your Legacy</span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Tools Designed with Care and Precision
            </p>
          </motion.div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Secure Storage */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Lock
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Fortified Storage
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Your financial details, properties, and nominee information
                  are encrypted and stored with unbreakable security.
                </p>
              </div>
            </motion.div>

            {/* Timed Release */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Clock
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Perfectly Timed Release
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Assets are shared only after careful verification—never too
                  soon, always on time.
                </p>
              </div>
            </motion.div>

            {/* Privacy Protection */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Shield
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Uncompromised Privacy
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Your sensitive information stays hidden until you’re ready to
                  pass it forward.
                </p>
              </div>
            </motion.div>

            {/* Document Management */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <FileText
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Seamless Documentation
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Upload, organize, and assign your documents with ease—everything
                  in one secure place.
                </p>
              </div>
            </motion.div>

            {/* Smart Notifications */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <EnvelopeSimple
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Smart Notifications
                </h3>
                <p className="mt-1 text-muted-foreground">
                  We check in periodically—five missed responses trigger your
                  legacy plan with precision.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}