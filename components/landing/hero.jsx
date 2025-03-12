"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MenuIcon, X, Lock, Shield, ChevronDown, ChevronRight } from "lucide-react";
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
        shadow: "shadow-none"
      };
    } else {
      // Calculate values between 0 and 1 based on scroll position
      const progress = Math.min((scrollY - scrollThreshold) / (maxScrollEffect - scrollThreshold), 1);
      return {
        opacity: progress * 0.8, // Max opacity of 0.8
        blur: progress * 12, // Max blur of 12px
        background: `rgba(0, 0, 0, ${progress * 0.6})`,
        shadow: progress > 0.5 ? "shadow-md" : "shadow-none"
      };
    }
  };

  const navStyles = calculateNavbarStyles();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
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
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className={`fixed top-0 left-0 right-0 z-50 ${
            scrollY > 20 ? "rounded-full w-fit mx-auto m-2 " + navStyles.shadow : "bg-transparent w-full"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-10 h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Uttaradhikari</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { name: "Features", href: "#features", hasDropdown: true },
                  { name: "Pricing", href: "#pricing" },
                  { name: "About", href: "#about" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <div key={item.name} className="relative group">
                    <Link 
                      href={item.href}
                      className="text-white/90 font-medium hover:text-white flex items-center"
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4 opacity-70" />}
                    </Link>
                    
                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                        <div className="py-1">
                          {["Asset Security", "Digital Legacy", "Future Messages"].map((subItem) => (
                            <Link 
                              key={subItem}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA Buttons with dialog integration */}
              <div className="hidden md:flex items-center space-x-4">
                <LoginDialog>
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Log In
                  </Button>
                </LoginDialog>
                
                <SignUpDialog>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Sign Up
                  </Button>
                </SignUpDialog>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu with dialog integration */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: mobileMenuOpen ? "auto" : 0, 
              opacity: mobileMenuOpen ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-gradient-to-b from-black/90 to-gray-900/90 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
              {["Features", "Pricing", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 px-4 text-white font-medium border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <LoginDialog>
                  <Button variant="ghost" className="text-white border border-white/20 w-full">
                    Log In
                  </Button>
                </LoginDialog>
                
                <SignUpDialog>
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                    Sign Up
                  </Button>
                </SignUpDialog>
              </div>
            </div>
          </motion.div>
        </motion.header>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black ">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ua1.jpeg"
            alt="Background"
            fill
            priority
            className="object-cover opacity-40 scale-110"
            style={{ filter: 'blur(5px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow-delayed"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-screen w-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20 lg:py-0"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Main Content - 7 columns on large screens */}
              <motion.div 
                variants={fadeInUp}
                className="text-white space-y-8 lg:col-span-7 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
              >
                <motion.div 
                  variants={fadeIn}
                  className="space-y-6"
                >
                  <motion.div 
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Digital Legacy Platform</span>
                  </motion.div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/80">
                      Secure Your Legacy
                    </span>
                    <br />
                    <span className="text-white/90">For Generations</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                    Uttaradhikari preserves your digital assets, memories, and final wishes with 
                    military-grade encryption, ensuring they reach your loved ones exactly when 
                    you intend—no earlier, no later.
                  </p>
                </motion.div>

                {/* Buttons with enhanced design */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                    <SignUpDialog>
                  <Button 
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-white px-8 py-6 text-lg rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                  </SignUpDialog>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm px-8 py-6 text-lg rounded-full font-medium hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                  >
                    Watch Demo
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                  variants={fadeInUp}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/20"
                >
                  {[
                    { value: "12M+", text: "Assets Secured" },
                    { value: "15K+", text: "Families Protected" },
                    { value: "99.9%", text: "Uptime Guarantee" }
                  ].map((metric, index) => (
                    <div key={index} className="flex flex-col items-center lg:items-start">
                      <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80">
                        {metric.value}
                      </p>
                      <p className="text-white/70 text-sm">{metric.text}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hero Feature Card - 5 columns on large screens */}
              <motion.div 
                variants={fadeInUp}
                className="lg:col-span-5"
              >
                <div className="relative">
                  {/* Decorative dots */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-dots-white/10 bg-[length:10px_10px] z-0 rounded-lg" />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-dots-white/10 bg-[length:10px_10px] z-0 rounded-lg" />
                  
                  {/* Card */}
                  <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px]" />
                    
                    {/* Card header */}
                    <div className="relative p-6 border-b border-white/10 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Legacy Vault</h3>
                      </div>
                      <div className="bg-green-500/20 px-3 py-1 rounded-full">
                        <span className="text-green-400 text-sm font-medium">Active</span>
                      </div>
                    </div>
                    
                    {/* Card body */}
                    <div className="p-6 space-y-6">
                      {/* Feature items */}
                      {[
                        { title: "Time-Based Access Control", desc: "Define exactly when your content becomes accessible" },
                        { title: "Military-Grade Encryption", desc: "AES-256 encryption ensures your data stays private" },
                        { title: "Proof of Life Verification", desc: "Multiple verification methods prevent early access" }
                      ].map((feature, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white text-lg font-medium">{feature.title}</h4>
                            <p className="text-white/70 text-sm mt-1">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Action button */}
                      <Button className="w-full bg-white text-black hover:bg-white/90 mt-4">
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
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#111827" />
          </svg>
        </div>
      </section>
    </>
  );
}

// Add this to your global CSS or styles module
const additionalCss = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.2; }
  }
  
  @keyframes pulse-slow-delayed {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.15; }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 6s infinite ease-in-out;
  }
  
  .animate-pulse-slow-delayed {
    animation: pulse-slow-delayed 8s infinite ease-in-out;
  }
  
  .bg-grid-white\/5 {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }
  
  .bg-dots-white\/10 {
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  }
`;