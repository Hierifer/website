import React, { useEffect, useState } from 'react'
import AndroidIcon from '../../asset/Android.svg'
import IOSIcon from '../../asset/iOS.svg'
import SteamIcon from '../../asset/steam.svg'
import CursorIcon from '../../asset/cursor.svg'
import { STEAM_ICON_COLOR } from '../../styles/colors'

const GREETINGS = [
  '你好，我能帮你吗？',
  'Hello, can I help you?',
  'こんにちは、お手伝いしましょうか？',
  '안녕하세요, 도와드릴까요?',
  'Hola, ¿puedo ayudarte?',
  'Bonjour, puis-je vous aider ?',
  'Hallo, kann ich Ihnen helfen?',
  'Olá, posso ajudá-lo?',
  'Привет, могу я вам помочь?',
  'مرحبًا، هل يمكنني مساعدتك؟',
]

interface TypewriterProps {
  text: string
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)

  const phrases = [text, '懂你的智能伴侣']
  const currentPhrase = phrases[phraseIndex % phrases.length]

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1))
        }, 50)
      } else {
        setIsDeleting(false)
        setPhraseIndex((prev) => prev + 1)
      }
    } else {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1))
        }, 80)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 3000)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentPhrase])

  return (
    <span className="inline-flex items-center">
      {displayText}
      <CursorIcon className="ml-1 h-[1em] w-[1em] fill-amber-300 animate-pulse" />
    </span>
  )
}

interface VanillaSectionProps {
  heading: string
  tag?: string
  subheading: string
  description: string
  phoneVideo?: string
  cta?: { label: string; href: string }
}

const VanillaSection: React.FC<VanillaSectionProps> = ({
  heading,
  tag,
  subheading,
  description,
  phoneVideo,
  cta,
}) => {
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [greetingStyle, setGreetingStyle] = useState({
    opacity: 1,
    transform: 'translateY(0px)',
    transition: 'all 500ms ease-out',
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      // Exit: Move Up and Fade Out
      setGreetingStyle({
        opacity: 0,
        transform: 'translateY(-30px)',
        transition: 'all 500ms ease-in',
      })

      window.setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % GREETINGS.length)

        // Reset to Bottom (No transition)
        setGreetingStyle({
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'none',
        })

        // Enter: Move Up to Center
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setGreetingStyle({
              opacity: 1,
              transform: 'translateY(0px)',
              transition: 'all 500ms ease-out',
            })
          })
        })
      }, 500)
    }, 3000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative z-10 flex h-full w-full max-w-6xl flex-col-reverse items-center justify-center gap-6 px-6 min-[800px]:flex-row min-[800px]:justify-between min-[800px]:gap-16 min-[800px]:px-20">
      {/* Left — text */}
      <div className="flex flex-col items-center min-[800px]:flex-1 min-[800px]:items-start">
        <h2 className="mb-2 flex items-center gap-3 text-3xl font-bold tracking-wide min-[800px]:mb-4 min-[800px]:text-6xl">
          {heading}
          {tag && (
            <span className="rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white/70 min-[800px]:px-3 min-[800px]:py-1 min-[800px]:text-xs">
              {tag}
            </span>
          )}
        </h2>
        <p className="text-base font-light text-white/90 min-[800px]:text-2xl">
          <Typewriter text={subheading} />
        </p>
        {description && (
          <p className="mt-2 flex items-center gap-2 text-xs font-light text-white/50 min-[800px]:mt-3 min-[800px]:text-base">
            <IOSIcon className="h-3 w-3 fill-white min-[800px]:h-4 min-[800px]:w-4" />
            iOS
            <span className="text-white/30">|</span>
            <AndroidIcon className="h-3 w-3 min-[800px]:h-4 min-[800px]:w-4" />
            Android
            <span className="text-white/30">|</span>
            <SteamIcon className="h-3 w-3 min-[800px]:h-4 min-[800px]:w-4" style={{ fill: STEAM_ICON_COLOR }} />
            Steam
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border border-white/40 px-6 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 min-[800px]:mt-10 min-[800px]:px-8 min-[800px]:py-3 min-[800px]:text-sm"
          >
            {cta.label}
          </a>
        )}
      </div>

      {/* Right — phone mockup */}
      <div className="flex items-center justify-center min-[800px]:flex-1">
        <div className="relative scale-[0.65] min-[800px]:scale-100">
          {/* Chat bubble */}
          <div
            className="absolute right-full top-32 mr-6 hidden whitespace-nowrap rounded-2xl bg-white/15 px-5 py-2.5 text-sm text-white backdrop-blur-md min-[800px]:block"
            style={greetingStyle}
          >
            {GREETINGS[greetingIndex]}
            {/* Bubble tail */}
            <div
              className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white/15 backdrop-blur-md"
            />
          </div>

          <div
            className="overflow-hidden rounded-[40px] border-[6px] border-white/20 bg-black shadow-2xl"
            style={{ width: 280, height: 580 }}
          >
            {/* Dynamic Island Notch */}
            <div
              className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/90"
              style={{ width: 96, height: 26 }}
            />
            {/* Screen */}
            {phoneVideo && (
              <video
                className="h-full w-full object-cover"
                src={phoneVideo}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VanillaSection
