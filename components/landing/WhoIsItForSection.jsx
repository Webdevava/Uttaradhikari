// app/components/WhoIsItForSection.jsx
"use client";

import { motion } from "framer-motion";
import {
  User,
  Users,
  House,
} from "@phosphor-icons/react/dist/ssr";

export default function WhoIsItForSection() {
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
    <section className="bg-muted/20 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Who{" "}
              <span className="text-primary">We Serve</span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Uttaradhikari is for anyone who wants to protect their life’s work
              and pass it on with care.
            </p>
          </motion.div>

          {/* Audience Cards */}
          <motion.div variants={sectionVariants} className="grid md:grid-cols-3 gap-8">
            {/* Individual */}
            <motion.div
              variants={itemVariants}
              className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
            >
              <User
                size={48}
                className="text-primary mb-4 mx-auto"
                weight="duotone"
              />
              <h3 className="text-xl font-semibold text-foreground">
                Individuals
              </h3>
              <p className="mt-2 text-muted-foreground">
                Secure your savings, investments, and wishes—ensuring they reach
                your loved ones seamlessly.
              </p>
            </motion.div>

            {/* Families */}
            <motion.div
              variants={itemVariants}
              className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
            >
              <Users
                size={48}
                className="text-primary mb-4 mx-auto"
                weight="duotone"
              />
              <h3 className="text-xl font-semibold text-foreground">
                Families
              </h3>
              <p className="mt-2 text-muted-foreground">
                Protect your family’s future with a plan that honors your
                legacy and supports your heirs.
              </p>
            </motion.div>

            {/* Property Owners */}
            <motion.div
              variants={itemVariants}
              className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
            >
              <House
                size={48}
                className="text-primary mb-4 mx-auto"
                weight="duotone"
              />
              <h3 className="text-xl font-semibold text-foreground">
                Property Owners
              </h3>
              <p className="mt-2 text-muted-foreground">
                Safeguard your assets—land, homes, or wealth—for those you
                choose, when the time comes.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}