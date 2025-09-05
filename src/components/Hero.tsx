import Scene3D from './Scene3D';
import ProjectsModal from './ProjectsModal';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, Rocket, Zap } from 'lucide-react';

export default function Hero() {
  const [showProjects, setShowProjects] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D className="w-full h-full" />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/70 z-10" />
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Code Comment */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left max-w-md mx-auto font-mono text-sm text-accent/80"
            >
              <span className="text-muted-foreground">// const developer = new</span>
              <br />
              <span className="text-primary">FullStackDev()</span>
              <span className="animate-pulse">█</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block text-foreground mb-2">Your Next</span>
              <span className="text-gradient">Developer</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Full-stack developer building <span className="text-accent font-semibold">scalable solutions</span> that solve 
              real-world problems and drive <span className="text-primary font-semibold">business growth</span>
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-8"
            >
              {[
                { icon: Code2, number: "5+", label: "Years Experience" },
                { icon: Rocket, number: "50+", label: "Projects Completed" },
                { icon: Zap, number: "100%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-lg bg-gradient-hero">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button 
                size="lg" 
                className="glow-button px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                onClick={() => setShowProjects(true)}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-glass-border/50 hover:border-primary/50 hover:bg-glass-bg/10 px-6 sm:px-8 py-3 text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Code Snippet at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-xs sm:text-sm font-mono text-muted-foreground/60 max-w-xs mx-auto"
            >
              <div className="text-left space-y-1">
                <div><span className="text-green-400">$</span> npm run dev</div>
                <div><span className="text-blue-400">{">"}</span> Ready on http://localhost:3000</div>
                <div><span className="text-green-400">✓</span> Compiled successfully!</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Decorative Elements - Hidden on mobile for performance */}
          <div className="hidden md:block absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl float animate-glow-pulse" />
          <div className="hidden md:block absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl float-delayed animate-glow-pulse" />
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Projects Modal */}
      <ProjectsModal isOpen={showProjects} onClose={() => setShowProjects(false)} />
    </>
  );
}