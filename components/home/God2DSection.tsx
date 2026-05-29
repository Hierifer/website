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
    <div className="relative z-10 flex h-full w-full max-w-6xl flex-col-reverse items-center justify-center gap-6 px-6 min-[800px]:flex-row min-[800px]:justify-between min-[800px]:gap-16 min-[800px]:px-20">
      {/* Left — text */}
      <div className="flex flex-col items-center min-[800px]:flex-1 min-[800px]:items-start">
        <h2 className="mb-2 text-3xl font-bold tracking-wide min-[800px]:mb-4 min-[800px]:text-6xl">
          {heading}
        </h2>
        <p className="text-base font-light text-white/90 min-[800px]:text-2xl">
          {subheading}
        </p>
        <p className="mt-2 text-xs font-light text-white/50 min-[800px]:mt-3 min-[800px]:text-base">
          {description}
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs font-light text-white/50 min-[800px]:mt-3 min-[800px]:text-base">
          <MacOSIcon className="h-3 w-3 fill-white min-[800px]:h-4 min-[800px]:w-4" />
          macOS
          <span className="text-white/30">|</span>
          <img src="/windows.svg" className="h-3 w-3 invert min-[800px]:h-4 min-[800px]:w-4" alt="Windows" />
          Windows
          <span className="text-white/30">|</span>
          <img src="/linux.svg" className="h-3 w-3 invert min-[800px]:h-4 min-[800px]:w-4" alt="Linux" />
          Linux
        </p>
        {cta && (
          <a
            href={cta.href}
            className="mt-5 inline-block rounded-full border border-white/40 px-6 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 min-[800px]:mt-10 min-[800px]:px-8 min-[800px]:py-3 min-[800px]:text-sm"
          >
            {cta.label}
          </a>
        )}
      </div>

      {/* Right — editor window mockup */}
      <div className="flex w-full items-center justify-center min-[800px]:flex-1">
        <div className="relative w-full max-w-xs min-[800px]:max-w-lg">
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
