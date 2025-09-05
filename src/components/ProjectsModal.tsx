import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveDemo?: string;
  github?: string;
  status: 'completed' | 'ongoing' | 'planning';
}

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Tailwind"],
    image: "🛒",
    liveDemo: "https://example.com",
    github: "https://github.com",
    status: "completed"
  },
  {
    id: 2,
    title: "AI Task Manager",
    description: "Intelligent task management app with AI-powered suggestions and automation. Built with Next.js and OpenAI API integration.",
    tech: ["Next.js", "OpenAI", "Prisma", "PostgreSQL", "TypeScript"],
    image: "🤖",
    liveDemo: "https://example.com",
    github: "https://github.com",
    status: "completed"
  },
  {
    id: 3,
    title: "Real-time Chat App",
    description: "Modern chat application with real-time messaging, file sharing, and video calls. Features end-to-end encryption and group chats.",
    tech: ["React", "Socket.io", "WebRTC", "Firebase", "Material-UI"],
    image: "💬",
    liveDemo: "https://example.com",
    github: "https://github.com",
    status: "completed"
  },
  {
    id: 4,
    title: "Portfolio Dashboard",
    description: "Interactive portfolio dashboard with analytics, project management, and client communication tools.",
    tech: ["Vue.js", "Express", "Chart.js", "Redis", "Docker"],
    image: "📊",
    github: "https://github.com",
    status: "completed"
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure voting platform using blockchain technology to ensure transparency and immutability of votes.",
    tech: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    image: "🗳️",
    github: "https://github.com",
    status: "ongoing"
  },
  {
    id: 6,
    title: "ML Data Visualizer",
    description: "Advanced data visualization tool for machine learning datasets with interactive charts and statistical analysis.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-learn"],
    image: "📈",
    liveDemo: "https://example.com",
    status: "planning"
  }
];

const statusColors = {
  completed: "bg-green-500/20 text-green-300 border-green-500/30",
  ongoing: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", 
  planning: "bg-blue-500/20 text-blue-300 border-blue-500/30"
};

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden glass-card border-glass-border/30">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gradient">
              My Projects Portfolio
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="hover:bg-glass-bg/20 rounded-full w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            A showcase of my completed and ongoing projects
          </p>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[70vh] pr-4 space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="glass-card p-6 border-glass-border/20 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gradient-hero flex items-center justify-center text-2xl">
                    {project.image}
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[project.status]} capitalize w-fit`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    {project.liveDemo && (
                      <Button size="sm" variant="outline" className="glow-button text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live Demo
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="ghost" className="text-xs hover:bg-glass-bg/20">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-glass-border/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">{projects.filter(p => p.status === 'completed').length}</span> completed • 
              <span className="text-yellow-400 font-semibold ml-1">{projects.filter(p => p.status === 'ongoing').length}</span> ongoing • 
              <span className="text-blue-400 font-semibold ml-1">{projects.filter(p => p.status === 'planning').length}</span> planning
            </div>
            <Button 
              onClick={onClose}
              className="glow-button text-sm px-6"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}