import { ModernHero } from './components/sections/ModernHero';
import { Navbar } from './components/ui/Navbar';
import { EmergencyButton } from './components/ui/EmergencyButton';
import { MoodTracker } from './pages/MoodTracker';
import { AuthPage } from './pages/AuthPage';
import { AIChatBubble } from './components/ui/AIChatBubble';
import { BackgroundPathsDemo } from './pages/BackgroundPathsDemo';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Users, CloudRain } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { MeshBackground } from './components/canvas/MeshBackground';
import { InteractiveElement } from './components/canvas/InteractiveElement';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

function App() {
  const [view, setView] = useState<'home' | 'mood' | 'demo' | 'auth'>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (v: 'home' | 'mood' | 'demo' | 'auth') => {
    // If going to mood tracker without auth, redirect to auth
    if (v === 'mood' && !user) {
      setView('auth');
      return;
    }
    setView(v);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('home');
  };

  return (
    <main className="min-h-screen w-full bg-obsidian-deep font-sans selection:bg-accent-glow selection:text-obsidian overflow-hidden">
      <Navbar onNavigate={handleNavigate} user={user} onSignOut={handleSignOut} />

      {/* 3D Global Background Layer - Persists across views for Zen atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#bbfaf0" castShadow />
          <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
          <MeshBackground />
          <InteractiveElement />
        </Canvas>
      </div>

      {view === 'home' && (
        <div className="relative">
          <ModernHero onNavigate={handleNavigate} />

          {/* Premium Ecosystem Section */}
          <section id="support" className="relative z-10 overflow-hidden px-6 pb-40 mt-20">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              >
                {[
                  { icon: <Users size={32} />, title: 'Peer Sync', desc: 'Find your perfect listener matching your life experiences.', color: 'accent-glow' },
                  { icon: <Brain size={32} />, title: 'AI Grounding', desc: 'Interactive CBT-based exercises for immediate relief.', color: 'white' },
                  { icon: <Heart size={32} />, title: 'Safe Vault', desc: 'Securely track your mood trends with total anonymity.', color: 'accent-soft' },
                  { icon: <CloudRain size={32} />, title: '24/7 De-escalation', desc: 'Intelligent systems designed to help you breathe.', color: 'safe-400' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-4xl border border-white/5 bg-white/3 p-8 backdrop-blur-3xl transition-all hover:bg-white/8"
                  >
                    <div className="mb-6 h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent-glow transition-transform group-hover:scale-110 group-hover:bg-accent-glow group-hover:text-obsidian flex">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-2xl font-black tracking-tight text-white">{feature.title}</h3>
                    <p className="text-white/40 leading-relaxed font-medium">{feature.desc}</p>

                    {/* Decorative Background Glow */}
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-accent-glow/5 blur-[80px] group-hover:bg-accent-glow/20 transition-all"></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Ecosystem Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mt-32 rounded-[3rem] bg-linear-to-br from-accent-glow to-safe-500 p-12 md:p-20 text-center shadow-[0_0_100px_-20px_var(--color-accent-glow)] overflow-hidden relative"
              >
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="mb-8 text-5xl font-black tracking-tighter text-obsidian sm:text-7xl">
                    READY TO FEEL <span className="text-white">BETTER?</span>
                  </h2>
                  <p className="mb-12 text-xl font-bold text-obsidian/60 sm:text-2xl">
                    Join 50,000+ members who have found their sanctuary in SafeZone.
                  </p>
                  <button
                    onClick={() => handleNavigate('mood')}
                    className="rounded-full bg-obsidian px-12 py-5 text-xl font-black text-white hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-obsidian/40"
                  >
                    START YOUR JOURNEY
                  </button>
                </div>

                {/* Abstract Shapes in background */}
                <div className="absolute top-0 right-0 h-full w-1/3 bg-white/10 blur-[100px] transform rotate-12"></div>
                <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-black/5 blur-[80px] transform -rotate-45"></div>
              </motion.div>
            </div>
          </section>
        </div>
      )}

      {view === 'auth' && <AuthPage onSuccess={() => setView('home')} />}
      {view === 'mood' && <MoodTracker />}
      {view === 'demo' && <BackgroundPathsDemo />}

      <EmergencyButton />
      <div className="fixed bottom-10 left-10 z-50">
        <AIChatBubble />
      </div>
    </main>
  );
}

export default App;

