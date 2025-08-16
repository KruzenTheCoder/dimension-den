import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "ERPNext Automation Suite",
    description: "Complete attendance, payroll, inventory, and project management solution for electrical construction companies.",
    tech: ["ERPNext", "Frappe", "Python", "JavaScript", "MySQL"],
    gradient: "from-purple-500 to-pink-500",
    image: "/api/placeholder/400/300"
  },
  {
    title: "OCR Invoice Parser",
    description: "Intelligent document processing system with automatic data extraction and supplier matching for Purchase Invoices.",
    tech: ["Python", "OCR", "ERPNext", "Machine Learning", "API Integration"],
    gradient: "from-blue-500 to-cyan-500",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Omnichannel CRM Platform",
    description: "Unified communication platform integrating multiple channels with backend CRM systems for seamless workflow.",
    tech: ["React", "Node.js", "REST APIs", "CRM Integration", "TypeScript"],
    gradient: "from-green-500 to-teal-500",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Candidate Vetting Workflow",
    description: "Automated recruitment system with AI-powered candidate assessment, skill matching, and automated reporting.",
    tech: ["Laserfiche", "Python", "AI Integration", "Workflow Automation", "Email APIs"],
    gradient: "from-orange-500 to-red-500",
    image: "/api/placeholder/400/300"
  }
];

export default function Projects() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my latest work combining creativity, technology, and user experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass-card overflow-hidden h-full">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      size="sm" 
                      className="glow-button flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-glass-border/50 bg-glass-bg/20 backdrop-blur-sm hover:bg-glass-bg/30"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}