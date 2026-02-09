import React from 'react'
import AndroidIcon from '../../asset/Android.svg'
import IOSIcon from '../../asset/iOS.svg'
import SteamIcon from '../../asset/steam.svg'
import { STEAM_ICON_COLOR } from '../../styles/colors'

interface CybermonSectionProps {
  heading: string
  subheading: string
  description: string
  video: string
  cta?: { label: string; href: string }
}

const CybermonSection: React.FC<CybermonSectionProps> = ({
  heading,
  subheading,
  description,
  video,
  cta,
}) => {
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
        {description && (
          <p className="mt-3 flex items-center gap-2 text-base font-light text-white/50">
            <IOSIcon className="h-4 w-4 fill-white" />
            iOS
            <span className="text-white/30">|</span>
            <AndroidIcon className="h-4 w-4" />
            Android
            <span className="text-white/30">|</span>
            <SteamIcon className="h-4 w-4" style={{ fill: STEAM_ICON_COLOR }} />
            Steam
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            {cta.label}
          </a>
        )}
      </div>

      {/* Right — feature reel */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px] bg-purple-500/20 blur-3xl opacity-60" />
          {/* no video needed here */}
        </div>
      </div>
    </div>
  )
}

export default CybermonSection
