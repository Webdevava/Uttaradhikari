"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MenuIcon,
  X,
  Lock,
  Shield,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import LoginDialog from "@/components/auth/login-dialog";
import SignUpDialog from "@/components/auth/signup-dialog";

export default function HeroWithNavbar() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enhanced scroll handling for smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      // Calculate offset to account for fixed navbar
      const navbarHeight = 80; // Approximate navbar height, adjust as needed
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  // Calculate opacity and blur based on scroll position
  const calculateNavbarStyles = () => {
    // Start transition at 20px scroll, complete by 120px
    const scrollThreshold = 20;
    const maxScrollEffect = 120;

    if (scrollY <= scrollThreshold) {
      return {
        opacity: 0,
        blur: 0,
        background: "transparent",
        shadow: "shadow-none",
      };
    } else {
      // Calculate values between 0 and 1 based on scroll position
      const progress = Math.min(
        (scrollY - scrollThreshold) / (maxScrollEffect - scrollThreshold),
        1
      );
      return {
        opacity: progress * 0.8, // Max opacity of 0.8
        blur: progress * 12, // Max blur of 12px
        background: `rgba(249, 250, 251, ${progress * 0.95})`,
        shadow: progress > 0.5 ? "shadow-md" : "shadow-none",
      };
    }
  };

  const navStyles = calculateNavbarStyles();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <>
      {/* Enhanced Navbar with smooth transitions */}
      <div className="flex items-center justify-center">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: navStyles.background,
            backdropFilter: `blur(${navStyles.blur}px)`,
            WebkitBackdropFilter: `blur(${navStyles.blur}px)`,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className={`fixed top-0 left-0 right-0 z-50 ${
            scrollY > 20
              ? "rounded-b-xl lg:rounded-full w-full lg:w-auto lg:max-w-4xl lg:mx-auto lg:mt-2 border border-slate-200 " +
                navStyles.shadow
              : "bg-transparent w-full"
          }`}
        >
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-10 h-16 md:h-20">
              {/* Logo */}

              <Link href="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center">
                  <img
                    src="/logos/logo_lg.png"
                    alt="Uttaradhikari Logo"
                    className=" h-8 block md:hidden"
                  />
                  <img
                    src="/logos/logo_md.png"
                    alt="Uttaradhikari Logo"
                    className=" h-8 hidden md:block lg:hidden"
                  />
                  <img
                    src="/logos/logo_lg.png"
                    alt="Uttaradhikari Logo"
                    className="h-8 hidden lg:block"
                  />
                </div>
              </Link>

              {/* Desktop Navigation - Updated with smooth scroll */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
                {[
                  { name: "Features", href: "#features", id: "features" },
                  { name: "Pricing", href: "#pricing", id: "pricing" },
                  { name: "About", href: "#about", id: "about" },
                  { name: "FAQ", href: "#faq", id: "faq" },
                ].map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                      className="text-slate-700 font-medium hover:text-primary flex items-center text-sm lg:text-base cursor-pointer"
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                      )}
                    </a>

                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                        <div className="py-1">
                          {[
                            "Asset Security",
                            "Digital Legacy",
                            "Future Messages",
                          ].map((subItem) => (
                            <a
                              key={subItem}
                              href="#"
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              {subItem}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA Buttons with dialog integration */}
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <LoginDialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-700 hover:bg-slate-100 text-sm"
                  >
                    Log In
                  </Button>
                </LoginDialog>

                <SignUpDialog>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-indigo-700 text-white text-sm"
                  >
                    Sign Up
                  </Button>
                </SignUpDialog>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu with dialog integration - Updated with smooth scroll */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
              {[
                { name: "Features", id: "features" },
                { name: "Pricing", id: "pricing" },
                { name: "About", id: "about" },
                { name: "FAQ", id: "faq" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  className="block py-2 px-4 text-slate-700 font-medium border-b border-slate-100 text-sm"
                  onClick={(e) => handleSmoothScroll(e, item.id)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-3">
                <LoginDialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-slate-700 border-slate-200 w-full text-sm"
                  >
                    Log In
                  </Button>
                </LoginDialog>

                <SignUpDialog>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-indigo-700 text-white w-full text-sm"
                  >
                    Sign Up
                  </Button>
                </SignUpDialog>
              </div>
            </div>
          </motion.div>
        </motion.header>
      </div>

      {/* Hero Section with Light Theme - Responsive Improvements */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] w-full overflow-hidden bg-gradient-to-b from-indigo-50 via-slate-50 to-white pt-12">
        {/* Enhanced Background with Patterns */}
        <div className="absolute inset-0 z-0">
          {/* Abstract Patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute top-1/4 -left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-indigo-200/40 rounded-full blur-3xl animate-pulse-slow"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute bottom-1/4 -right-20 w-40 sm:w-60 md:w-96 h-40 sm:h-60 md:h-96 bg-sky-200/40 rounded-full blur-3xl animate-pulse-slow-delayed"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-[90vh] lg:min-h-screen w-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center py-16 lg:py-0"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Main Content - 7 columns on large screens */}
              <motion.div
                variants={fadeInUp}
                className="text-slate-800 space-y-6 lg:space-y-8 lg:col-span-7 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
              >
                <motion.div
                  variants={fadeIn}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Headline with adjusted sizing and spacing */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-sky-500">
                      Your Life. Your Legacy.
                    </span>
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 -mt-1 sm:-mt-2">
                    Protected & Shared When It Matters.
                  </h2>

                  {/* Subheading with improved spacing and width constraint */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                    Your hard-earned assets and investments should never be lost
                    or forgotten. Secure them and ensure they reach your loved
                    ones—at the right time, in the right way.
                  </p>
                </motion.div>

                {/* Buttons with enhanced design */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <SignUpDialog>
                    <Button
                      size="default"
                      className="group relative overflow-hidden bg-primary text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started Today{" "}
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Button>
                  </SignUpDialog>
                  <Button
                    size="default"
                    variant="outline"
                    className="border-2 border-slate-200 text-slate-700 bg-white/80 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-medium hover:border-indigo-200 hover:bg-slate-50 transition-all duration-300"
                  >
                    Explore Features
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 pt-6 lg:pt-8 border-t border-slate-200"
                >
                  {[
                    { value: "12M+", text: "Assets Secured" },
                    { value: "15K+", text: "Families Protected" },
                    { value: "99.9%", text: "Uptime Guarantee" },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center lg:items-start"
                    >
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-sky-500">
                        {metric.value}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {metric.text}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hero Feature Card - 5 columns on large screens */}
              <motion.div variants={fadeInUp} className="lg:col-span-5">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  {/* Decorative dots */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[radial-gradient(#e0e7ff_1.5px,transparent_1.5px)] [background-size:12px_12px] z-0 rounded-lg opacity-80" />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[radial-gradient(#e0e7ff_1.5px,transparent_1.5px)] [background-size:12px_12px] z-0 rounded-lg opacity-80" />

                  {/* Card */}
                  <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(224,231,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(224,231,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Card header */}
                    <div className="relative p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800">
                          Legacy Vault
                        </h3>
                      </div>
                      <div className="bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                        <span className="text-green-600 text-xs sm:text-sm font-medium">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                      {/* Feature items */}
                      {[
                        {
                          title: "Time-Based Access Control",
                          desc: "Define exactly when your content becomes accessible",
                        },
                        {
                          title: "Advanced Encryption",
                          desc: "AES-256 encryption ensures your data stays private",
                        },
                        {
                          title: "Proof of Life Verification",
                          desc: "Multiple verification methods prevent early access",
                        },
                      ].map((feature, i) => (
                        <div
                          key={i}
                          className="flex gap-3 sm:gap-4 items-start"
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-slate-800 text-sm sm:text-base md:text-lg font-medium">
                              {feature.title}
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Action button */}
                      <Button className="w-full bg-primary hover:bg-indigo-700 text-white mt-2 sm:mt-4 text-sm sm:text-base py-1.5 sm:py-2">
                        Explore All Features
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0 text-white">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 80L60 73.3C120 66.7 240 53.3 360 50C480 46.7 600 53.3 720 56.7C840 60 960 60 1080 56.7C1200 53.3 1320 46.7 1380 43.3L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
