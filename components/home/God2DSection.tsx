import React from 'react'
import MacOSIcon from '../../asset/macos.svg'

interface God2DSectionProps {
  heading: string
  subheading: string
  description: string
  cta?: { label: string; href: string }
}

const God2DSection: React.FC<God2DSectionProps> = ({ heading, subheading, description, cta }) => {
  return (
    <div className="relative z-10 flex h-full w-full max-w-6xl items-center justify-between gap-16 px-12 md:px-20">
      {/* Left — text */}
      <div className="flex flex-1 flex-col items-start">
        <h2 className="mb-4 text-5xl font-bold tracking-wide md:text-6xl">
          {heading}
        </h2>
        <p className="text-xl font-light text-white/90 md:text-2xl">
          {subheading}
        </p>
        <p className="mt-3 text-base font-light text-white/50">
          {description}
        </p>
        <p className="mt-3 flex items-center gap-2 text-base font-light text-white/50">
          <MacOSIcon className="h-4 w-4 fill-white" />
          macOS
          <span className="text-white/30">|</span>
          <img src="/windows.svg" className="h-4 w-4 invert" alt="Windows" />
          Windows
          <span className="text-white/30">|</span>
          <img src="/linux.svg" className="h-4 w-4 invert" alt="Linux" />
          Linux
        </p>
        {cta && (
          <a
            href={cta.href}
            className="mt-10 inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            {cta.label}
          </a>
        )}
      </div>

      {/* Right — editor window mockup */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-lg">
          {/* Gradient glow — green/cyan Godot theme */}
          <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-2xl rounded-3xl" />

          {/* macOS-style window */}
          <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-white/40 font-mono">God2D Editor</span>
            </div>

            {/* Editor screenshot */}
            <img src="/editor.png" alt="God2D Editor" className="block w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default God2DSection
