"use client";

import { useEffect, useRef, useState } from 'react';
import { MeshGradient, PulsingBorder } from '@paper-design/shaders-react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChartBar, Sparkles } from 'lucide-react';

interface ShaderShowcaseProps {
  headingId?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const LOGO_PARTICLES = [
  { delay: 0, left: '24%', top: '24%', x: 8 },
  { delay: 0.2, left: '62%', top: '28%', x: -7 },
  { delay: 0.4, left: '72%', top: '54%', x: 5 },
  { delay: 0.6, left: '34%', top: '68%', x: -9 },
  { delay: 0.8, left: '48%', top: '42%', x: 6 },
  { delay: 1, left: '58%', top: '70%', x: -4 },
];

const SHADER_MIN_PIXEL_RATIO = 2;
const SHADER_MAX_PIXEL_COUNT = 32_000_000;
const SHADER_CONTEXT = {
  alpha: true,
  antialias: true,
  depth: false,
  powerPreference: 'high-performance',
} satisfies WebGLContextAttributes;

export default function ShaderShowcase({
  headingId = 'landing-title',
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}: ShaderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);
    const container = containerRef.current;

    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      aria-labelledby={headingId}
      className="relative flex min-h-[100svh] overflow-hidden bg-black text-white"
      ref={containerRef}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              result="tint"
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="gooey"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={['#000000', '#06b6d4', '#0891b2', '#164e63', '#f97316']}
        distortion={0.8}
        grainMixer={0}
        grainOverlay={0}
        maxPixelCount={SHADER_MAX_PIXEL_COUNT}
        minPixelRatio={SHADER_MIN_PIXEL_RATIO}
        speed={isActive ? 0.42 : 0.28}
        style={{ backgroundColor: '#000000' }}
        swirl={0.1}
        webGlContextAttributes={SHADER_CONTEXT}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
        colors={['#000000', '#ffffff', '#06b6d4', '#f97316']}
        distortion={0.8}
        grainMixer={0}
        grainOverlay={0}
        maxPixelCount={SHADER_MAX_PIXEL_COUNT}
        minPixelRatio={SHADER_MIN_PIXEL_RATIO}
        speed={isActive ? 0.32 : 0.2}
        style={{ backgroundColor: 'transparent' }}
        swirl={0.1}
        webGlContextAttributes={SHADER_CONTEXT}
      />
      <motion.div
        animate={{ opacity: isActive ? 0.24 : 0.16 }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28))]"
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-20 flex min-h-[100svh] w-full flex-col">
        <header className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6">
          <motion.a
            aria-label="Weighted Matrix home"
            className="group relative flex items-center"
            href={`#${headingId}`}
            transition={{ damping: 10, stiffness: 400, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
          >
            <span
              className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/8 text-white shadow-[0_0_34px_rgba(6,182,212,0.22)] backdrop-blur-md transition duration-300 group-hover:border-cyan-300/40 group-hover:text-cyan-100"
              style={{ filter: 'url(#logo-glow)' }}
            >
              <ChartBar aria-hidden="true" className="size-5" strokeWidth={1.9} />
            </span>

            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {LOGO_PARTICLES.map((particle) => (
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, particle.x, 0],
                    y: [-10, -20, -10],
                  }}
                  className="absolute size-1 rounded-full bg-white/60"
                  key={`${particle.left}-${particle.top}`}
                  style={{ left: particle.left, top: particle.top }}
                  transition={{
                    delay: particle.delay,
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </span>
          </motion.a>

          <nav className="hidden items-center space-x-2 sm:flex" aria-label="Hero navigation">
            <a
              className="rounded-full px-3 py-2 text-xs font-light text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              href="#decision-matrix"
            >
              Workflow
            </a>
            <a
              className="rounded-full px-3 py-2 text-xs font-light text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              href="#decision-matrix"
            >
              Scoring
            </a>
            <a
              className="rounded-full px-3 py-2 text-xs font-light text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              href="#site-footer-note"
            >
              Local save
            </a>
          </nav>

          <div
            className="group relative flex items-center"
            style={{ filter: 'url(#gooey-filter)' }}
          >
            <button
              aria-label="Open matrix workspace"
              className="absolute right-0 z-0 flex h-8 -translate-x-10 cursor-pointer items-center justify-center rounded-full bg-white px-2.5 py-2 text-xs font-normal text-black transition-all duration-300 hover:bg-white/90 group-hover:-translate-x-[4.75rem]"
              onClick={onPrimaryCtaClick}
              type="button"
            >
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </button>
            <button
              className="z-10 flex h-8 cursor-pointer items-center rounded-full bg-white px-6 py-2 text-xs font-normal text-black transition-all duration-300 hover:bg-white/90"
              onClick={onPrimaryCtaClick}
              type="button"
            >
              Workspace
            </button>
          </div>
        </header>

        <main className="relative z-20 mt-auto max-w-3xl px-5 pb-8 pt-24 text-left sm:px-8 sm:pb-10 lg:pb-12">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            style={{ filter: 'url(#glass-effect)' }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="absolute left-1 right-1 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <Sparkles aria-hidden="true" className="relative z-10 size-4 text-cyan-100" />
            <span className="relative z-10 text-sm font-medium tracking-wide text-white/90">
              Interactive weighted decisions
            </span>
          </motion.div>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            aria-label="Weighted Matrix"
            className="mb-5 text-5xl font-bold leading-none tracking-normal text-white sm:text-6xl md:text-7xl lg:text-8xl"
            id={headingId}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              className="mb-2 block text-4xl font-light tracking-normal text-white/90 sm:text-5xl lg:text-6xl"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                background:
                  'linear-gradient(135deg, #ffffff 0%, #06b6d4 30%, #f97316 70%, #ffffff 100%)',
                backgroundClip: 'text',
                backgroundSize: '220% 220%',
                filter: 'url(#text-glow)',
              }}
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              Weighted
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl">
              Decision Matrix
            </span>
            <span className="block font-light italic text-white/80">Clarity</span>
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-7 max-w-xl text-base font-light leading-7 text-white/72 sm:text-lg sm:leading-8"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Compare choices with weighted priorities, live scoring, and a
            recommendation that stays grounded in what matters most.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              className="min-h-12 cursor-pointer rounded-full border-2 border-white/30 bg-transparent px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-100 sm:px-10 sm:py-4"
              onClick={onSecondaryCtaClick ?? onPrimaryCtaClick}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View workflow
            </motion.button>
            <motion.button
              className="min-h-12 cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 hover:shadow-xl sm:px-10 sm:py-4"
              onClick={onPrimaryCtaClick}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start scoring
            </motion.button>
          </motion.div>
        </main>
      </div>

      <div className="absolute bottom-8 right-8 z-30 hidden sm:block">
        <div className="relative flex size-20 items-center justify-center">
          <PulsingBorder
            bloom={0.9}
            colorBack="#00000000"
            colors={['#06b6d4', '#0891b2', '#f97316', '#00ff88', '#ffffff']}
            frame={9161408.251009725}
            intensity={0.75}
            pulse={0.1}
            roundness={1}
            scale={0.65}
            smoke={0.5}
            smokeSize={0.65}
            softness={0.2}
            speed={1.5}
            spotSize={0.1}
            spots={5}
            style={{
              borderRadius: '50%',
              height: '60px',
              width: '60px',
            }}
            thickness={0.1}
          />

          <motion.svg
            animate={{ rotate: 360 }}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            style={{ transform: 'scale(1.6)' }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Number.POSITIVE_INFINITY,
            }}
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                id="weighted-matrix-circle"
              />
            </defs>
            <text className="fill-white/80 text-sm font-medium">
              <textPath href="#weighted-matrix-circle" startOffset="0%">
                Weight priorities - Score options - Compare outcomes -
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
