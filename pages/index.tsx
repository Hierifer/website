import { NextPage } from 'next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import VanillaSection from '../components/home/VanillaSection'
import CybermonSection from '../components/home/CybermonSection'
import ToffeeSection from '../components/home/ToffeeSection'
import BrownieSection from '../components/home/BrownieSection'

const TRANSITION_DURATION = 900
const WHEEL_DAMPING = 0.72
const MOMENTUM_THRESHOLD = 60

const SECTIONS = [
  {
    id: 'vanilla',
    heading: 'Vanilla',
    tag: 'Beta',
    subheading: '陪伴型日常辅助小伙伴',
    description: '支持 iOS 和 Android',
    phoneVideo: '/vanilla.mp4',
    cta: { label: '了解更多', href: 'https://vanilla.neo-hex.com' },
  },
  {
    id: 'studio',
    heading: 'Toffee',
    subheading: '你的 AI 投资顾问',
    description: '支持 iOS 和 Android',
    cta: { label: '敬请期待', href: 'https://vanilla.neo-hex.com' },
  },
  {
    id: 'craft',
    heading: 'Cybermon',
    subheading: '你的战斗怪兽',
    description: '支持 iOS 和 Android',
    video: '/cbyermon.mp4',
    cta: { label: '敬请期待', href: 'https://vanilla.neo-hex.com' },
  },
  {
    id: 'collaborate',
    heading: 'Brownie',
    subheading: 'NEO-HEX 的 Agentic CEO & CTO',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80',
    spotlightVideo: '/Brownie.mp4',
  },
  {
    id: 'future',
    heading: 'Contact',
    subheading: 'hierifer@hotmail.com',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  },
]

const Home: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
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

  const jumpToSection = useCallback((targetIndex: number) => {
    if (animatingRef.current) return
    animatingRef.current = true

    setActiveIndex(prev => {
      const next = clampIndex(targetIndex, prev)
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
              className={`relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden ${section.id === 'collaborate' ? 'bg-white text-slate-900' : ''}`}
            >
              {/* Video background for sections with video */}
              {section.video && (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={section.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}

              {/* Gray overlay for cybermon */}
              {section.id === 'craft' && (
                <div className="absolute inset-0 bg-black/40" />
              )}

              {/* Content */}
              {section.id === 'vanilla' ? (
                <VanillaSection
                  heading={section.heading}
                  tag={section.tag}
                  subheading={section.subheading}
                  description={section.description ?? ''}
                  phoneVideo={section.phoneVideo}
                  cta={section.cta}
                />
              ) : section.id === 'craft' ? (
                <CybermonSection
                  heading={section.heading}
                  subheading={section.subheading}
                  description={section.description ?? ''}
                  video={section.video}
                  cta={section.cta}
                />
              ) : section.id === 'collaborate' ? (
                <BrownieSection
                  heading={section.heading}
                  subheading={section.subheading}
                  video={section.spotlightVideo}
                />
              ) : section.id === 'studio' ? (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.45), rgba(10, 10, 30, 0.65)), url(${section.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-[900ms]"
                    style={{
                      backgroundColor: 'rgba(16, 16, 30, 0.35)',
                      opacity: index === activeIndex ? 0.15 : 0.3,
                    }}
                  />
                  <ToffeeSection
                    heading={section.heading}
                    subheading={section.subheading}
                    cta={section.cta}
                  />
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.45), rgba(10, 10, 30, 0.65)), url(${section.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  />
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

        <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 space-x-4">
          {SECTIONS.map((section, index) => (
            <div
              key={`${section.id}-indicator`}
              className="group relative flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => jumpToSection(index)}
                className="h-2 rounded-full bg-white/30 transition-all"
                style={{
                  opacity: index === activeIndex ? 1 : 0.4,
                  transform: index === activeIndex ? 'scaleX(1.25)' : 'scaleX(1)',
                  transition: 'all 260ms ease-out',
                  width: index === activeIndex ? '2.4rem' : '1.2rem',
                }}
                aria-label={`Jump to ${section.heading}`}
              />
              <span className="pointer-events-none absolute -top-8 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-900 opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
                {section.heading}
              </span>
            </div>
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
