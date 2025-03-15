// app/components/FeaturesSection.jsx
"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Clock,
  Shield,
  FileText,
  EnvelopeSimple,
  ChartPieSlice,
  UserCirclePlus,
  Bell,
  Eye,
  CreditCard,
  ChartLine
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
    <section className="bg-background py-20" id="features">
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
            {/* Secure Asset & Debt Storage */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Lock
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Secure Asset & Debt Storage
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Your financial footprint, safeguarded until the right moment. Store all your transactions, 
                  assets, debts—whether your family knows about them or not.
                </p>
              </div>
            </motion.div>

            {/* Nominee Management */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <UserCirclePlus
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Nominee Management & Controlled Access
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Your loved ones should never be left in the dark. Assign nominees, define access levels, 
                  and control when they receive the information.
                </p>
              </div>
            </motion.div>

            {/* Smart Inactivity Detection */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Bell
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Smart Inactivity Detection
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Because mistakes are not an option. Before we disclose any information to your nominees, 
                  we verify your inactivity at least 3 times through multiple communication channels.
                </p>
              </div>
            </motion.div>

            {/* Hidden or Delayed Asset Disclosure */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <Eye
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Hidden or Delayed Asset Disclosure
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Protect your family's future the way you want. You decide when and how your financial 
                  secrets are revealed, preventing sudden wealth from making them lazy or careless.
                </p>
              </div>
            </motion.div>

            {/* Unaccounted Transactions */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <CreditCard
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Unaccounted Transactions
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Your secrets, protected and revealed on your terms. If you have transactions or assets that you want 
                  to disclose only after your passing, you can store them here securely.
                </p>
              </div>
            </motion.div>

            {/* Insights & Reports */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <ChartLine
                size={32}
                className="text-primary flex-shrink-0"
                weight="duotone"
              />
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Insights & Reports
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Your financial roadmap, always clear. Understand your total assets, liabilities, 
                  and nominee allocations with advanced analytics.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}