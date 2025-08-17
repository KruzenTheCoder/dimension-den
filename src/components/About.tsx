import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const skills = [
  { name: 'React & Next.js', level: 95, color: 'bg-blue-500' },
  { name: 'Node.js & Express', level: 92, color: 'bg-green-500' },
  { name: 'TypeScript', level: 90, color: 'bg-cyan-500' },
  { name: '.NET (C#)', level: 88, color: 'bg-purple-500' },
  { name: 'Python & AI', level: 85, color: 'bg-yellow-500' },
  { name: 'ERPNext/Frappe', level: 95, color: 'bg-orange-500' },
  { name: 'Database Design', level: 90, color: 'bg-red-500' },
  { name: 'DevOps & Docker', level: 85, color: 'bg-indigo-500' },
];

export default function About() {
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
            About <span className="text-gradient">Kruz</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Full-stack developer with 8 years of experience building scalable solutions 
            that solve real-world problems and drive business impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Kruz Naidoo, a 27-year-old Full-Stack Developer & IT Engineer with 8 years of experience 
                delivering enterprise-grade solutions across BPO, finance, electrical construction, and 
                technology-driven industries. I specialize in building scalable applications, optimizing 
                workflows, and integrating intelligent systems that transform how businesses operate.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a background that spans Software Development and Network Engineering, I bring a rare 
                mix of skills that allow me to design robust infrastructure and user-friendly applications 
                that work seamlessly together.
              </p>
            </Card>
            
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">What I Do</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🔹 Full-Stack Development</h4>
                  <p className="text-sm">
                    I build high-performance, end-to-end solutions using C#, ASP.NET MVC, React.js, Next.js, 
                    Node.js, Express.js, Python, Tailwind CSS, Material-UI, and SQL/NoSQL databases.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🔹 Network Engineering & Infrastructure</h4>
                  <p className="text-sm">
                    From configuring routers, switches, and firewalls to implementing secure TCP/IP, DNS, 
                    and VPN networks, I design resilient infrastructure that scales with growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🔹 Workflow Automation & ERP Solutions</h4>
                  <p className="text-sm">
                    I excel at optimizing SOPs, automating repetitive tasks, and building ERPNext and custom 
                    solutions that improve efficiency and reduce errors.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🔹 AI & Intelligent Systems</h4>
                  <p className="text-sm">
                    I integrate AI-driven automation, LLM training, and optimization into enterprise 
                    solutions—enabling smarter decision-making and productivity boosts.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">My Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                I don't just write code—I solve business problems. My work bridges the gap between technical 
                precision and business strategy, ensuring every solution I deliver is practical, impactful, 
                and future-ready. I thrive on continuous learning, adopting emerging technologies to keep 
                my solutions ahead of the curve.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold mb-8">Skills & Expertise</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}