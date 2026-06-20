import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Activity, FileText, Award, Calendar, CreditCard, Cpu } from 'lucide-react';

interface NodeItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  angle: number; // angle in degrees
  distance: number; // distance from center in px
}

export const AcademicLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<'awakening' | 'core-formation' | 'connecting' | 'transmitting' | 'synchronizing' | 'reveal'>('awakening');
  const [terminalText, setTerminalText] = useState('Initializing Academic Intelligence...');

  // Setup stages timeline
  useEffect(() => {
    // 0ms - 1500ms: Awakening
    // 1500ms - 3000ms: Core Formation
    const t1 = setTimeout(() => {
      setStage('core-formation');
      setTerminalText('Quantum Core forming. Initializing Knowledge Nexus...');
    }, 1500);

    // 3000ms - 4800ms: Connecting Network
    const t2 = setTimeout(() => {
      setStage('connecting');
      setTerminalText('Syncing student directory & academic metrics...');
    }, 3000);

    // 4800ms - 6500ms: Transmitting Data
    const t3 = setTimeout(() => {
      setStage('transmitting');
      setTerminalText('Optimizing neural performance analytics...');
    }, 4800);

    // 6500ms - 7800ms: Synchronizing Core
    const t4 = setTimeout(() => {
      setStage('synchronizing');
      setTerminalText('All modules synchronized. Academy ecosystem online.');
    }, 6500);

    // 7800ms+: Reveal Dashboard
    const t5 = setTimeout(() => {
      setStage('reveal');
    }, 7800);

    const t6 = setTimeout(() => {
      setLoading(false);
    }, 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  // Generate background particles with different depths
  const particles = useMemo(() => {
    const arr = [];
    const depths: ('foreground' | 'midground' | 'background')[] = ['foreground', 'midground', 'background'];
    for (let i = 0; i < 45; i++) {
      const depth = depths[i % 3];
      arr.push({
        id: i,
        x: Math.random() * 100, // percentage x
        y: Math.random() * 100, // percentage y
        size: depth === 'foreground' ? Math.random() * 3 + 2 : depth === 'midground' ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5,
        duration: depth === 'foreground' ? Math.random() * 8 + 6 : depth === 'midground' ? Math.random() * 15 + 10 : Math.random() * 25 + 15,
        delay: Math.random() * -10, // negative delay so they are already moving
        depth,
      });
    }
    return arr;
  }, []);

  // Define our 7 academic knowledge nodes
  const nodes = useMemo<NodeItem[]>(() => [
    { id: 'students', label: 'Students', icon: <GraduationCap className="w-5 h-5" />, color: 'text-[#7C3AED]', glowColor: 'rgba(124,58,237,0.3)', angle: -90, distance: 180 }, // top
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" />, color: 'text-[#06B6D4]', glowColor: 'rgba(6,182,214,0.3)', angle: -38.5, distance: 190 }, 
    { id: 'analytics', label: 'Analytics', icon: <Activity className="w-5 h-5" />, color: 'text-[#10B981]', glowColor: 'rgba(16,185,129,0.3)', angle: 13, distance: 175 }, 
    { id: 'assignments', label: 'Assignments', icon: <FileText className="w-5 h-5" />, color: 'text-[#F59E0B]', glowColor: 'rgba(245,158,11,0.3)', angle: 64.3, distance: 185 }, 
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-5 h-5" />, color: 'text-[#EF4444]', glowColor: 'rgba(239,68,68,0.3)', angle: 115.7, distance: 180 }, 
    { id: 'attendance', label: 'Attendance', icon: <Calendar className="w-5 h-5" />, color: 'text-[#EC4899]', glowColor: 'rgba(236,72,153,0.3)', angle: 167.1, distance: 190 }, 
    { id: 'fees', label: 'Fees', icon: <CreditCard className="w-5 h-5" />, color: 'text-[#3B82F6]', glowColor: 'rgba(59,130,246,0.3)', angle: 218.5, distance: 175 }
  ], []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: 'blur(20px)',
              scale: 0.95,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] overflow-hidden"
          >
            {/* Parallax Particle Field */}
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className={`absolute rounded-full bg-white ${
                    p.depth === 'foreground' ? 'opacity-30 blur-[1px]' : p.depth === 'midground' ? 'opacity-50' : 'opacity-80'
                  }`}
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                  }}
                  animate={{
                    y: [0, -100],
                    x: [0, Math.sin(p.id) * 30],
                    opacity: p.depth === 'background' ? [0.2, 0.8, 0.2] : [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            {/* Futuristic Volumetric Ambient Light */}
            <motion.div 
              animate={{
                opacity: stage === 'awakening' ? 0.05 : [0.1, 0.25, 0.1],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[800px] h-[800px] rounded-full bg-[#7C3AED]/10 blur-[150px] pointer-events-none"
            />

            {/* Main Knowledge Nexus Visual Center */}
            <div className="relative w-[600px] h-[600px] flex items-center justify-center scale-90 sm:scale-100">
              
              {/* Core Formation Ring - Energy buildup */}
              <AnimatePresence>
                {stage !== 'awakening' && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: stage === 'synchronizing' ? [1, 1.8, 0] : 1, 
                      opacity: stage === 'synchronizing' ? [0.4, 1, 0] : 0.4 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: stage === 'synchronizing' ? 0.8 : 2.5, 
                      ease: stage === 'synchronizing' ? "easeOut" : [0.16, 1, 0.3, 1] 
                    }}
                    className="absolute w-44 h-44 rounded-full border border-[#7C3AED]/30 flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border-t border-[#06B6D4]/50 border-dashed"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Luminous Quantum Core (Orb) */}
              <AnimatePresence>
                {stage !== 'awakening' && (
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ 
                      scale: stage === 'reveal' ? 0 : 1, 
                      opacity: stage === 'reveal' ? 0 : 1,
                      boxShadow: stage === 'synchronizing' 
                        ? [
                            "0 0 60px rgba(124, 58, 237, 0.6)",
                            "0 0 200px rgba(124, 58, 237, 1)",
                            "0 0 60px rgba(124, 58, 237, 0)"
                          ]
                        : [
                            "0 0 40px rgba(124, 58, 237, 0.4)",
                            "0 0 80px rgba(6, 182, 212, 0.6)",
                            "0 0 40px rgba(124, 58, 237, 0.4)"
                          ]
                    }}
                    transition={{ 
                      duration: stage === 'synchronizing' ? 1.2 : 2.5, 
                      ease: "easeInOut",
                      repeat: stage === 'synchronizing' ? 0 : Infinity 
                    }}
                    className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4] flex items-center justify-center z-30"
                  >
                    {/* Inner core matrix */}
                    <div className="w-24 h-24 rounded-full bg-[#050816]/90 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                      {/* Grid background inside core */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-dashed border-[#7C3AED]/40 flex items-center justify-center"
                      >
                        <Cpu className="w-7 h-7 text-[#06B6D4]" />
                      </motion.div>
                      {/* Scanning glow effect */}
                      <motion.div 
                        animate={{ y: [-50, 50] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent blur-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connection Lines (SVG drawings) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {stage !== 'awakening' && stage !== 'core-formation' && (
                  <g>
                    {nodes.map((node) => {
                      const rad = (node.angle * Math.PI) / 180;
                      const toX = 300 + Math.cos(rad) * node.distance;
                      const toY = 300 + Math.sin(rad) * node.distance;
                      
                      return (
                        <g key={`group-${node.id}`}>
                          {/* Static Connection Line */}
                          <motion.line
                            x1="300"
                            y1="300"
                            x2={toX}
                            y2={toY}
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="1.5"
                          />
                          {/* Animated Cyber Connection Line */}
                          <motion.path
                            d={`M 300 300 L ${toX} ${toY}`}
                            stroke={`url(#gradient-${node.id})`}
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                          
                          {/* Gradient definition for lines */}
                          <defs>
                            <linearGradient id={`gradient-${node.id}`} x1="300" y1="300" x2={toX} y2={toY} gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.8} />
                              <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>

                          {/* Data transmission pulse stream */}
                          {stage === 'transmitting' && (
                            <motion.circle
                              r="3"
                              fill="#06B6D4"
                              filter="drop-shadow(0 0 4px #06B6D4)"
                              animate={{
                                cx: [300, toX],
                                cy: [300, toY],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                delay: Math.random() * 1.5,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>

              {/* Orbital Nodes Ecosystem */}
              {stage !== 'awakening' && stage !== 'core-formation' && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  {nodes.map((node, index) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const toX = 300 + Math.cos(rad) * node.distance;
                    const toY = 300 + Math.sin(rad) * node.distance;

                    return (
                      <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          // Procedural orbits / neural float
                          x: [0, Math.sin(index) * 8, Math.cos(index) * -6, Math.sin(index) * -8, 0],
                          y: [0, Math.cos(index) * -6, Math.sin(index) * 8, Math.cos(index) * -8, 0],
                        }}
                        transition={{
                          scale: { type: "spring", stiffness: 80, delay: index * 0.15 },
                          opacity: { duration: 0.5, delay: index * 0.15 },
                          x: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 9 + index, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute w-12 h-12 flex items-center justify-center"
                        style={{
                          left: toX - 24,
                          top: toY - 24,
                        }}
                      >
                        {/* Node bubble with back refraction glow */}
                        <div 
                          className="relative w-12 h-12 rounded-2xl bg-[#111827]/70 border border-white/10 flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:shadow-2xl hover:border-white/20"
                          style={{
                            boxShadow: `0 0 20px ${node.glowColor}`,
                          }}
                        >
                          {/* Inner glowing core of node */}
                          <div className={`z-10 ${node.color}`}>
                            {node.icon}
                          </div>
                          
                          {/* Label popping on connection synchronization */}
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: stage === 'synchronizing' || stage === 'transmitting' ? 0.7 : 0 }}
                            className="absolute -bottom-6 text-[10px] text-gray-400 font-medium whitespace-nowrap tracking-wider font-mono uppercase"
                          >
                            {node.label}
                          </motion.span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Typewriter Academic Interface log console */}
            <div className="absolute bottom-16 w-full max-w-md px-6 text-center z-30">
              <div className="font-mono text-xs text-gray-500 mb-2 tracking-widest uppercase flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-ping" />
                System Core Log
              </div>
              <motion.div
                key={terminalText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-mono text-sm text-gray-300 tracking-wide select-none min-h-[20px]"
              >
                {terminalText}
              </motion.div>
              
              {/* Small sleek progress bar showing system booting states */}
              <div className="w-full h-[1px] bg-white/5 mt-4 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: stage === 'awakening' ? '10%' 
                           : stage === 'core-formation' ? '35%' 
                           : stage === 'connecting' ? '65%' 
                           : stage === 'transmitting' ? '85%' 
                           : '100%' 
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main dashboard grows from the network */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
