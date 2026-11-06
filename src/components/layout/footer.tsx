"use client"

import Link from "next/link"
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { Instagram, Facebook, Linkedin } from "lucide-react"

import { LogoIcon } from "../logo-icon"
import { cn } from "@/lib/utils"

const CloudyBackground = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
    const background = useTransform(
      [mouseX, mouseY],
      ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, hsl(var(--primary) / 0.2), transparent 40%)`
    );

    return (
        <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background }}
        />
    );
};

const AnimatedBlob = ({ className, animationVariants }: { className: string, animationVariants: Variants }) => {
    return (
        <motion.div
            className={cn("absolute rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:mix-blend-lighten", className)}
            variants={animationVariants}
            initial="initial"
            animate="animate"
        />
    );
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (containerRef.current) {
          const { left, top } = containerRef.current.getBoundingClientRect();
          mouseX.set(e.clientX - left);
          mouseY.set(e.clientY - top);
      }
  };
  
  const handleMouseLeave = () => {
      mouseX.set(-200);
      mouseY.set(-200);
  };

  const blobAnimation1: Variants = {
      initial: { x: '0%', y: '20%', scale: 1 },
      animate: {
          x: ['0%', '50%', '10%', '0%'],
          y: ['20%', '-20%', '70%', '20%'],
          scale: [1, 1.1, 0.9, 1],
          transition: { duration: 30, repeat: Infinity, ease: 'easeInOut' }
      }
  };

  const blobAnimation2: Variants = {
      initial: { x: '100%', y: '80%', scale: 1.1 },
      animate: {
          x: ['100%', '20%', '-10%', '100%'],
          y: ['80%', '110%', '30%', '80%'],
          scale: [1.1, 0.8, 1.2, 1.1],
          transition: { duration: 35, repeat: Infinity, ease: 'easeInOut' }
      }
  };

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-background relative overflow-hidden border-t"
    >
      <div className="absolute inset-0 -z-10">
        <AnimatedBlob className="w-80 h-80 bg-primary/30" animationVariants={blobAnimation1} />
        <AnimatedBlob className="w-80 h-80 bg-accent/30" animationVariants={blobAnimation2} />
      </div>
      <CloudyBackground mouseX={mouseX} mouseY={mouseY} />
      
      <div className="relative z-10">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-2 flex flex-col items-start space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <LogoIcon className="h-10 w-10" imageUrl="/images/logo.png" />
                <span className="font-bold text-2xl font-headline tracking-tighter">FuelMails</span>
              </Link>
              <p className="text-muted-foreground">Fueling your marketing momentum.</p>
              <div className="flex space-x-4 pt-2 text-muted-foreground">
                <Link href="https://www.facebook.com/profile.php?id=61592075892291" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4 hover:text-primary transition-colors" />
                </Link>
                <Link href="https://www.instagram.com/fuelmails/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4 hover:text-primary transition-colors" />
                </Link>
                <Link href="https://www.linkedin.com/company/fuel-mails//" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h4 className="font-semibold text-foreground">Product</h4>
              <Link href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="font-semibold text-foreground">Company</h4>
              <Link href="/#about-us" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            </div>
            
             <div className="flex flex-col space-y-2">
              <h4 className="font-semibold text-foreground">Contact</h4>
              <Link href="/#schedule" className="text-sm text-muted-foreground hover:text-primary transition-colors">Schedule a Demo</Link>
              <Link href="mailto:bishalya.gautam@fuelmails.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bishalya.gautam@fuelmails.com</Link>
              <Link href="mailto:anish.pantha@fuelmails.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Anish.pantha@fuelmails.com</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t bg-background/50">
          <div className="container py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            {isClient && <p>&copy; {new Date().getFullYear()} FuelMails. All rights reserved.</p>}
             <div className="flex gap-4 mt-4 sm:mt-0">
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}