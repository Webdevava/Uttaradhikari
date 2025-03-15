"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X, CaretUp, Crown, Star, Table, Calendar } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useRef, useState } from "react";

export default function PricingSection() {
  const sectionRef = useRef(null);
  const [activePlan, setActivePlan] = useState(1); // Default to Standard plan
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Plan details
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      icon: CaretUp,
      color: "bg-blue-500",
      tagline: "Basic features",
      features: [
        { text: "Limited Personal Data Storage", available: true },
        { text: "Basic Account Tracking", available: true },
        { text: "1 Nominee", available: true },
        { text: "Inactivity Verification", available: true },
        { text: "Advanced Features", available: false },
      ],
    },
    {
      name: "Standard",
      price: "₹9",
      period: "/month",
      icon: Star,
      color: "bg-primary",
      tagline: "Most popular choice",
      features: [
        { text: "Full Financial Asset Tracking", available: true },
        { text: "Up to 5 Nominees", available: true },
        { text: "10 Document Storage", available: true },
        { text: "Custom Time Delay for Nominees", available: true },
        { text: "24/7 Priority Support", available: true },
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "₹49",
      period: "/month",
      icon: Crown,
      color: "bg-purple-600",
      tagline: "Complete protection",
      badge: "1 Month FREE",
      features: [
        { text: "Unlimited Storage & Nominees", available: true },
        { text: "Hidden Transaction Storage", available: true },
        { text: "Advanced Analytics & Reports", available: true },
        { text: "Customizable Notifications", available: true },
        { text: "Premium Support & Security", available: true },
      ],
    },
  ];

  // Function to render feature value in the table
  const renderFeatureValue = (value) => {
    if (value === true) {
      return <Check size={20} weight="bold" className="text-green-500 mx-auto" />;
    } else if (value === false) {
      return <X size={20} className="text-red-500 mx-auto" />;
    } else {
      return <span className="text-sm font-medium">{value}</span>;
    }
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="pricing">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/10 z-0" 
        style={{ y: backgroundY }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-600" />
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-70" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Pricing{" "}
              <span className="text-primary relative inline-block">
                Plans
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible plans to suit your needs. Choose what fits you best and get the security and control you deserve.
            </p>
          </motion.div>

          {/* Tabs */}
          <div>
            <Tabs defaultValue="plans" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-2 w-56 mx-auto">
                <TabsTrigger value="plans" className="flex items-center gap-2">
                  <Calendar size={18} weight="duotone" />
                  Plans
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center gap-2">
                  <Table size={18} weight="duotone" />
                  Features
                </TabsTrigger>
              </TabsList>
              
              {/* Plans Tab Content */}
              <TabsContent value="plans" className="mt-8">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 max-w-6xl mx-auto">
                  {plans.map((plan, index) => {
                    const isActive = activePlan === index;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        // whileHover={{ 
                        //   y: -8, 
                        //   scale: 1.02,
                        //   transition: { duration: 0.2 }
                        // }}
                        onClick={() => setActivePlan(index)}
                        className={`w-full lg:w-1/3 bg-background rounded-2xl border-2 transition-all duration-200 cursor-pointer
                          ${isActive 
                            ? `border-${plan.color.replace('bg-', '')} shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] shadow-${plan.color.replace('bg-', '')}/20 z-20 scale-[1.03] lg:scale-105` 
                            : 'border-border shadow-md hover:shadow-lg z-10'
                          } 
                          ${index === 1 ? 'lg:-mx-2' : ''}
                        `}
                        style={{ 
                          transformOrigin: 'center bottom',
                        }}
                      >
                        {/* Badge for special offers */}
                        {/* {plan.badge && (
                          <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md z-30 border border-yellow-500">
                            {plan.badge}
                          </div>
                        )} */}
                        
                        {/* Plan header */}
                        <div className={`${plan.color} text-white p-6 rounded-t-xl relative overflow-hidden`}>
                          {/* Background pattern */}
                          <div className="absolute inset-0 opacity-20">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id={`${plan.name}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                                  <path d="M 0,20 L 20,0" stroke="white" strokeWidth="1" fill="none" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill={`url(#${plan.name}-grid)`} />
                            </svg>
                          </div>
                          
                          <div className="flex items-center justify-between relative z-10">
                            <div>
                              <h3 className="text-xl font-bold">{plan.name}</h3>
                              <p className="text-white/80 text-sm mt-1">{plan.tagline}</p>
                            </div>
                            <plan.icon size={28} weight="duotone" className="opacity-90" />
                          </div>
                          
                          <div className="mt-4 flex items-baseline">
                            <span className="text-3xl font-bold">{plan.price}</span>
                            <span className="ml-1 opacity-80">{plan.period}</span>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="p-6 space-y-3">
                          {plan.features.map((feature, i) => (
                            <div 
                              key={i} 
                              className={`flex items-center gap-3 p-2 rounded-lg transition-colors
                                ${feature.available 
                                  ? 'text-foreground' 
                                  : 'text-muted-foreground'
                                }
                                ${isActive && feature.available ? 'bg-muted/50' : ''}
                              `}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center
                                ${feature.available 
                                  ? `${plan.color} text-white` 
                                  : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {feature.available ? (
                                  <Check size={12} weight="bold" />
                                ) : (
                                  <X size={12} />
                                )}
                              </div>
                              <span className="font-medium text-sm">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* CTA Button */}
                        <div className="p-6 pt-2">
                          <Button
                            className={`w-full py-5 rounded-xl font-medium text-white
                              ${isActive 
                                ? plan.color
                                : 'bg-muted text-foreground hover:bg-muted/80'
                              }`}
                          >
                            {index === 0 ? 'Sign Up Free' : isActive ? 'Get Started Now' : 'Select Plan'}
                          </Button>
                          
                          {/* No credit card message */}
                          <p className="text-center text-sm text-muted-foreground mt-3">
                            {index === 0 ? 'No payment required' : 'No credit card required for 14-day trial'}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Bottom details */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="bg-muted/30 p-6 rounded-xl border border-border max-w-3xl mx-auto text-center mt-12"
                >
                  <h4 className="font-semibold text-foreground">All plans include:</h4>
                  <p className="mt-2 text-muted-foreground">
                    Industry-leading security, inactivity verification, data encryption, 24/7 monitoring, and 30-day money-back guarantee.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    <Button variant="link" className="text-primary">
                      Learn more about security
                    </Button>
                    <Button variant="link" className="text-foreground">
                      Enterprise options
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
              
              {/* Features Comparison Tab Content */}
              <TabsContent value="features" className="mt-8">
                <div className="overflow-auto max-w-6xl mx-auto bg-background rounded-xl border border-border shadow-sm">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-muted/70">
                        <th className="p-4 text-left font-semibold text-lg text-foreground border-b">Feature</th>
                        <th className="p-4 text-center font-semibold text-lg text-blue-500 border-b whitespace-nowrap w-24">
                          <div className="flex flex-col items-center">
                            <CaretUp size={20} weight="duotone" className="mb-1" />
                            Free 
                          </div>
                        </th>
                        <th className="p-4 text-center font-semibold text-lg text-primary border-b whitespace-nowrap w-24">
                          <div className="flex flex-col items-center">
                            <Star size={20} weight="duotone" className="mb-1" />
                            Standard
                          </div>
                        </th>
                        <th className="p-4 text-center font-semibold text-lg text-purple-600 border-b whitespace-nowrap w-24">
                          <div className="flex flex-col items-center">
                            <Crown size={20} weight="duotone" className="mb-1" />
                            Premium
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Storage Features */}
                      <tr className="bg-muted/40">
                        <td colSpan={4} className="p-3 pl-4 font-medium text-foreground">
                          Storage Features
                        </td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Secure Personal Data Storage</td>
                        <td className="p-3 text-center">Limited</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Bank Accounts, FD/RD, EPF/PPF Tracking</td>
                        <td className="p-3 text-center">Limited</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Insurance (Life, Health, Vehicle, etc.)</td>
                        <td className="p-3 text-center">Limited</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Investments (Stocks, Mutual Funds, Crypto)</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Gold/Silver/Ornaments Asset Tracking</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Property & Utility Bill Management</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>

                      {/* Nominee & Security Features */}
                      <tr className="bg-muted/40">
                        <td colSpan={4} className="p-3 pl-4 font-medium text-foreground">
                          Nominee & Security Features
                        </td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Nominee Assignment & Notifications</td>
                        <td className="p-3 text-center">1 Nominee</td>
                        <td className="p-3 text-center">Up to 5</td>
                        <td className="p-3 text-center">Unlimited</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Secure Document Upload & Storage</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">Up to 10 Docs</td>
                        <td className="p-3 text-center">Unlimited</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Inactivity Verification (Triple Check)</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Custom Time Delay for Nominee Disclosure</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>

                      {/* Advanced Features */}
                      <tr className="bg-muted/40">
                        <td colSpan={4} className="p-3 pl-4 font-medium text-foreground">
                          Advanced Features
                        </td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Alerts & Reminders for Financial Planning</td>
                        <td className="p-3 text-center">Limited</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Advanced Analytics & Reports</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Downloadable PDF/Excel Reports</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Undocumented Money & Hidden Transactions Storage</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">24/7 Priority Customer Support</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                      <tr className="border-b border-border/70 hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 text-sm">Customizable Notification Preferences</td>
                        <td className="p-3 text-center">{renderFeatureValue(false)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                        <td className="p-3 text-center">{renderFeatureValue(true)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Premium promotion box */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-12 bg-gradient-to-r from-purple-600/10 via-purple-600/15 to-purple-600/10 p-6 rounded-xl border border-purple-600/30 max-w-4xl mx-auto"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="text-left flex-1">
                      <h3 className="text-xl font-bold text-purple-600 flex items-center">
                        <Crown size={24} weight="duotone" className="mr-2" /> 
                        Why Upgrade to Premium?
                      </h3>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-start gap-2">
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Unlimited Data Storage – No limits on documents or financial records</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Hidden Transaction Storage – Store confidential assets safely</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Full Nominee Control – Assign unlimited nominees with custom access</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-center bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-600/20">
                        <p className="text-sm font-medium">Limited Time Offer</p>
                        <p className="font-bold text-lg">1 Month FREE</p>
                        <Button className="mt-2 bg-white text-purple-600 hover:bg-white/90 transition-colors">
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  );
}