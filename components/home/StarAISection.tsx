import React, { useCallback, useEffect, useRef, useState } from 'react'
import AndroidIcon from '../../asset/Android.svg'
import IOSIcon from '../../asset/iOS.svg'

interface StarAISectionProps {
  heading: string
  subheading: string
  description: string
  cta?: { label: string; href: string }
}

const LIVE_COMMENTS = [
  { user: '小星星', text: '好好看！' },
  { user: 'Luna_fan', text: '跳得太棒了' },
  { user: '追光者', text: '什么时候出新歌？' },
  { user: 'dreamer', text: '每天都来看直播' },
  { user: '星河', text: '太可爱了吧！' },
  { user: 'AI偶像粉', text: '这也太真实了' },
  { user: '夜空', text: '支持支持！' },
  { user: 'melody', text: '声音好甜' },
]

const HEART_EMOJIS = ['❤️', '💖', '💗', '💕', '💜', '🩷']

interface FloatingHeart {
  id: number
  emoji: string
  x: number
  drift: number
  startTime: number
}

const StarAISection: React.FC<StarAISectionProps> = ({ heading, subheading, description, cta }) => {
  const [visibleComments, setVisibleComments] = useState<typeof LIVE_COMMENTS>([])
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const heartIdRef = useRef(0)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setVisibleComments(prev => {
        const next = [...prev, LIVE_COMMENTS[index % LIVE_COMMENTS.length]]
        if (next.length > 4) next.shift()
        return next
      })
      index++
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  // Auto-generate hearts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      spawnHeart()
    }, 1500)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clean up hearts after animation completes
  useEffect(() => {
    if (hearts.length === 0) return
    const timer = setTimeout(() => {
      setHearts(prev => prev.filter(h => Date.now() - h.startTime < 2000))
    }, 2100)
    return () => clearTimeout(timer)
  }, [hearts])

  const spawnHeart = useCallback(() => {
    const id = heartIdRef.current++
    const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)]
    const x = Math.random() * 20 - 10
    const drift = (Math.random() * 16 - 8)
    setHearts(prev => [...prev.slice(-12), { id, emoji, x, drift, startTime: Date.now() }])
  }, [])

  const handleHeartClick = useCallback(() => {
    // Spawn 3-5 hearts on click
    const count = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnHeart(), i * 80)
    }
  }, [spawnHeart])

  return (
    <div className="relative z-10 flex h-full w-full max-w-6xl items-center justify-between gap-16 px-12 md:px-20">
      {/* Left — text */}
      <div className="flex flex-1 flex-col items-start">
        <h2 className="starai-heading mb-4 text-5xl font-bold tracking-wide md:text-6xl">
          {heading}
        </h2>
        <p className="text-xl font-light text-white/90 md:text-2xl">
          {subheading}
        </p>
        <p className="mt-3 flex items-center gap-2 text-base font-light text-white/50">
          <IOSIcon className="h-4 w-4 fill-white" />
          iOS
          <span className="text-white/30">|</span>
          <AndroidIcon className="h-4 w-4" />
          Android
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

      {/* Right — phone mockup with TikTok live overlay */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative">
          {/* Gradient glow — purple/pink idol theme */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-gradient-to-br from-purple-500/25 to-pink-500/25 blur-3xl rounded-full" />

          <div
            className="relative overflow-hidden rounded-[40px] border-[6px] border-white/20 bg-black shadow-2xl"
            style={{ width: 280, height: 580 }}
          >
            {/* Dynamic Island Notch */}
            <div
              className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-black/90"
              style={{ width: 96, height: 26 }}
            />

            {/* Video background */}
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/123.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* TikTok Live UI overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between">
              {/* Top bar */}
              <div className="pointer-events-none flex items-center justify-between px-4 pt-12">
                {/* Streamer info */}
                <div className="flex items-center gap-2 rounded-full bg-black/40 py-1 pl-1 pr-3 backdrop-blur-sm">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">★</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-white leading-tight">StarAI</span>
                    <span className="text-[8px] text-white/60 leading-tight">虚拟偶像</span>
                  </div>
                </div>
                {/* Viewer count */}
                <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-white">12.8k</span>
                </div>
              </div>

              {/* Bottom section */}
              <div className="relative px-3 pb-6">
                {/* Floating hearts — anchored above heart button */}
                <div className="pointer-events-none absolute bottom-12 right-3" style={{ width: 36, height: 200 }}>
                  {hearts.map(heart => (
                    <span
                      key={heart.id}
                      className="absolute bottom-0 text-lg"
                      style={{
                        left: `calc(50% + ${heart.x}px)`,
                        '--drift': `${heart.drift}px`,
                        animation: 'floatHeartUp 2s ease-out forwards',
                      } as React.CSSProperties}
                    >
                      {heart.emoji}
                    </span>
                  ))}
                </div>

                {/* Live comments */}
                <div className="pointer-events-none mb-3 flex flex-col gap-1.5">
                  {visibleComments.map((comment, i) => (
                    <div
                      key={`${comment.user}-${i}`}
                      className="flex items-start gap-1.5"
                      style={{
                        opacity: i === 0 && visibleComments.length >= 4 ? 0.4 : 1,
                        transition: 'opacity 300ms',
                      }}
                    >
                      <span className="inline-flex items-center rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-sm">
                        <span className="text-[9px] font-semibold text-cyan-300 leading-none">{comment.user}</span>
                        <span className="ml-1 text-[9px] text-white/90 leading-none">{comment.text}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom action bar */}
                <div className="flex items-center gap-2">
                  <div className="pointer-events-none flex flex-1 items-center rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-[10px] text-white/40 leading-none">说点什么...</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="pointer-events-none flex h-7 w-7 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                      <span className="text-xs">🎁</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleHeartClick}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-transform active:scale-125 cursor-pointer"
                    >
                      <span className="text-xs">❤️</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default StarAISection
