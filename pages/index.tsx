import { NextPage } from 'next'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const TRANSITION_DURATION = 900
const WHEEL_DAMPING = 0.72
const MOMENTUM_THRESHOLD = 60

const SECTIONS = [
  {
    id: 'studio',
    heading: '创意源于热爱',
    subheading: 'Ideas thrive where passion leads.',
    image: 'https://images.unsplash.com/photo-1526481280695-3c4693f20703?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'craft',
    heading: '探索新的边界',
    subheading: 'We keep pushing for the unexpected.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'collaborate',
    heading: '与世界连接',
    subheading: 'Every project is a global conversation.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'future',
    heading: '设计更好的未来',
    subheading: 'We build experiences that feel inevitable.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
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
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
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
              style={{
                backgroundImage: `linear-gradient(rgba(10, 10, 20, 0.45), rgba(10, 10, 30, 0.65)), url(${section.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
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
      </div>
    </main>
  )
}

export default Home
