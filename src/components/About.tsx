import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const skills = [
  { name: 'React & Next.js', level: 95, color: 'bg-blue-500' },
  { name: 'Three.js & WebGL', level: 88, color: 'bg-purple-500' },
  { name: 'TypeScript', level: 92, color: 'bg-cyan-500' },
  { name: 'Node.js', level: 85, color: 'bg-green-500' },
  { name: 'UI/UX Design', level: 90, color: 'bg-pink-500' },
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
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate developer who loves creating immersive digital experiences 
            that blend creativity with cutting-edge technology.
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
                With over 5 years of experience in web development, I specialize in creating 
                interactive 3D experiences and modern web applications. I'm passionate about 
                pushing the boundaries of what's possible on the web.
              </p>
            </Card>
            
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of storytelling through technology. Every project 
                is an opportunity to create something that not only functions beautifully 
                but also inspires and engages users on an emotional level.
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