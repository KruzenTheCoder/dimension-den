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
              <p className="text-muted-foreground leading-relaxed">
                I'm Kruz Naidoo, a 27-year-old full-stack developer with 8 years of experience 
                spanning BPO, enterprise solutions, and diverse industries. I specialize in 
                building scalable applications using React, Node.js, .NET, Python, and ERPNext.
              </p>
            </Card>
            
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">My Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                I thrive on solving real-world problems by designing reliable, user-friendly 
                applications that make a tangible impact. From automation workflows to ERP 
                solutions, I focus on efficiency and innovation.
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