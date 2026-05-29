import React, { useEffect, useState } from 'react'
import MacOSIcon from '../../asset/macos.svg'

const TERMINAL_LINES = [
  { prompt: '$ ', text: 'claude', delay: 0, color: 'cmd' },
  { prompt: '', text: '✻ Welcome to Claude Code!  /help for help', delay: 600, color: 'brand' },
  { prompt: '', text: '', delay: 900, color: 'dim' },
  { prompt: '', text: '  ⊞  多窗口    并行运行多个 Agent', delay: 1100, color: 'feature' },
  { prompt: '', text: '  ▤  tmux      原生会话管理，随时恢复', delay: 1700, color: 'feature' },
  { prompt: '', text: '  ♪  语音输入  说话即可下达指令', delay: 2300, color: 'feature' },
  { prompt: '', text: '', delay: 2700, color: 'dim' },
  { prompt: '> ', text: '🎙 重构 auth 模块，同时跑测试', delay: 3100, color: 'input' },
  { prompt: '', text: '', delay: 3400, color: 'dim' },
  { prompt: '', text: '● [窗口 1]  Edit    src/auth/login.ts', delay: 3600, color: 'tool' },
  { prompt: '', text: '● [窗口 2]  Bash    pnpm test --watch', delay: 4000, color: 'tool' },
  { prompt: '', text: '', delay: 4400, color: 'dim' },
  { prompt: '', text: '✓ Done  2 agents · 3 files changed · all tests passed', delay: 4700, color: 'success' },
]

interface MatSectionProps {
  heading: string
  subheading: string
  description: string
  cta?: { label: string; href: string }
}

const MatSection: React.FC<MatSectionProps> = ({ heading, subheading, description, cta }) => {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1)
        }, line.delay)
      )
    })

    // Loop the animation
    const loopTimer = setTimeout(() => {
      setVisibleLines(0)
      // Restart after a brief pause
      const restartTimer = setTimeout(() => {
        setVisibleLines(0)
      }, 500)
      timers.push(restartTimer)
    }, 7500)
    timers.push(loopTimer)

    return () => timers.forEach(clearTimeout)
  }, [visibleLines === 0])

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
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn group relative mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 min-[800px]:mt-10 min-[800px]:px-8 min-[800px]:py-3 min-[800px]:text-sm"
          >
            <span className="transition-opacity duration-200 group-hover:opacity-0">{cta.label}</span>
            <img src="/download.svg" className="download-icon absolute h-4 w-4 invert" alt="" />
          </a>
        )}
      </div>

      {/* Right — terminal mockup */}
      <div className="flex w-full items-center justify-center min-[800px]:flex-1">
        <div className="relative w-full max-w-xs min-[800px]:max-w-lg">
          {/* Gradient glow */}
          <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl rounded-3xl" />

          {/* Terminal window */}
          <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-white/40 font-mono">Mat Terminal</span>
            </div>

            {/* Terminal content */}
            <div className="px-5 py-4 font-mono text-sm leading-relaxed" style={{ minHeight: 240 }}>
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => {
                const promptColor = line.prompt === '> ' ? 'text-white/60' : 'text-cyan-400'
                const textColor =
                  line.color === 'brand'   ? 'text-[#a78bfa]' :
                  line.color === 'input'   ? 'text-white' :
                  line.color === 'tool'    ? 'text-white/50' :
                  line.color === 'success' ? 'text-emerald-400' :
                  line.color === 'feature' ? 'text-cyan-300/80' :
                  line.color === 'cmd'     ? 'text-white/90' :
                  'text-white/20'
                return (
                  <div key={i} className="flex">
                    {line.prompt && (
                      <span className={`${promptColor} select-none mr-1`}>{line.prompt}</span>
                    )}
                    <span className={textColor}>{line.text}</span>
                  </div>
                )
              })}
              {visibleLines > 0 && visibleLines < TERMINAL_LINES.length && (
                <span className="inline-block h-4 w-2 bg-white/60 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatSection
