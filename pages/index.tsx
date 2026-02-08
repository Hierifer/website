import { NextPage } from 'next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AndroidIcon from '../asset/Android.svg'
import IOSIcon from '../asset/iOS.svg'
import SteamIcon from '../asset/steam.svg'
import CursorIcon from '../asset/cursor.svg'

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

const TRANSITION_DURATION = 900
const WHEEL_DAMPING = 0.72
const MOMENTUM_THRESHOLD = 60

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
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

const SECTIONS = [
  {
    id: 'vanilla',
    heading: 'Vanilla',
    tag: 'Beta',
    subheading: '陪伴型日常辅助小伙伴',
    description: '支持 iOS 和 Android',
    video: '/vanilla.mp4',
    cta: { label: '了解更多', href: 'https://vanilla.neo-hex.com' },
  },
  {
    id: 'studio',
    heading: 'Toffee',
    subheading: '你的金融顾问',
    image: 'https://images.unsplash.com/photo-1526481280695-3c4693f20703?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'craft',
    heading: 'Cyberster',
    subheading: '连接你的 cyber 战斗怪兽',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'collaborate',
    heading: 'Brownie',
    subheading: 'NEO-HEX 的 agentic CEO',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'future',
    heading: '联系我们',
    subheading: 'contact@neo-hex.com',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
  },
]

const Home: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [greetingStyle, setGreetingStyle] = useState({
    opacity: 1,
    transform: 'translateY(0px)',
    transition: 'all 500ms ease-out',
  })
  const stageRef = useRef<HTMLDivElement | null>(null)
  const momentumRef = useRef(0)
  const animatingRef = useRef(false)
  const touchStartYRef = useRef(0)
  const animationTimeoutRef = useRef<number>()

  const clampIndex = useCallback((nextIndex: number, currentIndex: number) => {
    if (nextIndex < 0) return currentIndex
    if (nextIndex >= SECTIONS.length) return currentIndex
    return nextIndex
  }, [])

  const shiftSection = useCallback((direction: number) => {
    if (animatingRef.current) return
    animatingRef.current = true

    setActiveIndex(prev => {
      const next = clampIndex(prev + direction, prev)
      if (next === prev) {
        animatingRef.current = false
        return prev
      }
      momentumRef.current = 0
      window.clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = window.setTimeout(() => {
        animatingRef.current = false
      }, TRANSITION_DURATION + 120)
      return next
    })
  }, [clampIndex])

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    if (animatingRef.current) return

    const adjusted = momentumRef.current * WHEEL_DAMPING + event.deltaY
    momentumRef.current = adjusted

    if (Math.abs(adjusted) < MOMENTUM_THRESHOLD) return

    const direction = adjusted > 0 ? 1 : -1
    shiftSection(direction)
  }, [shiftSection])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      shiftSection(1)
    }
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      shiftSection(-1)
    }
  }, [shiftSection])

  useEffect(() => {
    const node = stageRef.current
    if (!node) return

    node.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      node.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [handleKeyDown, handleWheel])

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? 0
  }, [])

  const handleTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current
    const delta = touchStartYRef.current - endY

    if (Math.abs(delta) < 50) return
    shiftSection(delta > 0 ? 1 : -1)
  }, [shiftSection])

  const translateValue = `translate3d(0, ${-activeIndex * 100}vh, 0)`

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

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#050A14] text-white">
      <div
        ref={stageRef}
        className="relative h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            transform: translateValue,
            transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 0.9, 0.36, 1)`,
            willChange: 'transform',
          }}
        >
          {SECTIONS.map((section, index) => (
            <section
              key={section.id}
              className="relative flex h-screen w-screen shrink-0 items-center justify-center"
              style={
                section.video
                  ? undefined
                  : {
                      backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.45), rgba(10, 10, 30, 0.65)), url(${section.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }
              }
            >
              {section.video ? (
                <div className="relative z-10 flex h-full w-full max-w-6xl items-center justify-between gap-16 px-12 md:px-20">
                  {/* Left — text */}
                  <div className="flex flex-1 flex-col items-start">
                    <h2 className="mb-4 flex items-center gap-3 text-5xl font-bold tracking-wide md:text-6xl">
                      {section.heading}
                      {section.tag && (
                        <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/70">
                          {section.tag}
                        </span>
                      )}
                    </h2>
                    <p className="text-xl font-light text-white/90 md:text-2xl">
                      {section.id === 'vanilla' ? (
                        <Typewriter text={section.subheading} />
                      ) : (
                        section.subheading
                      )}
                    </p>
                    {section.description && (
                      <p className="mt-3 flex items-center gap-2 text-base font-light text-white/50">
                        <IOSIcon className="h-4 w-4 fill-white" />
                        iOS
                        <span className="text-white/30">|</span>
                        <AndroidIcon className="h-4 w-4" />
                        Android
                        <span className="text-white/30">|</span>
                        <SteamIcon className="h-4 w-4" style={{ fill: '#144476' }} />
                        Steam
                      </p>
                    )}
                    {section.cta && (
                      <a
                        href={section.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
                      >
                        {section.cta.label}
                      </a>
                    )}
                  </div>

                  {/* Right — phone mockup */}
                  <div className="flex flex-1 items-center justify-center">
                    <div className="relative">
                      {/* Chat bubble */}
                      <div
                        className="absolute right-full top-32 mr-6 whitespace-nowrap rounded-2xl bg-white/15 px-5 py-2.5 text-sm text-white backdrop-blur-md"
                        style={greetingStyle}
                      >
                        {GREETINGS[greetingIndex]}
                        {/* Bubble tail */}
                        <div
                          className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white/15 backdrop-blur-md"
                        />
                      </div>

                      {/* Shader / Glow behind phone */}
                      <div className="absolute -inset-10 -z-10 bg-blue-500/20 blur-3xl rounded-full opacity-60 pointer-events-none" />

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
                      <video
                        className="h-full w-full object-cover"
                        src={section.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative z-10 max-w-2xl px-6 text-center">
                    <h2 className="mb-4 text-4xl font-semibold tracking-wider md:text-5xl">
                      {section.heading}
                    </h2>
                    <p className="mx-auto text-lg font-light md:text-xl">
                      {section.subheading}
                    </p>
                  </div>
                  <div
                    className="absolute inset-0 transition-opacity duration-[900ms]"
                    style={{
                      backgroundColor: 'rgba(16, 16, 30, 0.35)',
                      opacity: index === activeIndex ? 0.15 : 0.3,
                    }}
                  />
                </>
              )}
            </section>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
          {SECTIONS.map((section, index) => (
            <span
              key={`${section.id}-indicator`}
              className="block h-2 w-10 rounded-full bg-white/30"
              style={{
                opacity: index === activeIndex ? 1 : 0.4,
                transform: index === activeIndex ? 'scaleX(1.25)' : 'scaleX(1)',
                transition: 'all 260ms ease-out',
              }}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 w-full -translate-x-1/2 text-center text-xs text-white/30 transition-opacity duration-300"
          style={{ opacity: activeIndex === SECTIONS.length - 1 ? 1 : 0 }}
        >
          iOS，安卓，steam 商标归版权方所有
        </div>
      </div>
    </main>
  )
}

export default Home
