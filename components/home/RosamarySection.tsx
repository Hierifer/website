import React, { useEffect, useState } from 'react'
import AndroidIcon from '../../asset/Android.svg'
import IOSIcon from '../../asset/iOS.svg'
import SteamIcon from '../../asset/steam.svg'
import { STEAM_ICON_COLOR } from '../../styles/colors'

interface IndexData {
  symbol: string
  name: string
  nameCn: string
  price: number
  change: number
  changePercent: number
}

interface RosamarySectionProps {
  heading: string
  subheading: string
  cta?: { label: string; href: string }
}

const INDICES: Omit<IndexData, 'price' | 'change' | 'changePercent'>[] = [
  { symbol: '^GSPC', name: 'S&P 500', nameCn: '标普500' },
  { symbol: '^IXIC', name: 'NASDAQ', nameCn: '纳斯达克' },
  { symbol: '^DJI', name: 'DOW', nameCn: '道琼斯' },
  { symbol: '^FTSE', name: 'FTSE 100', nameCn: '富时100' },
  { symbol: '^N225', name: 'Nikkei 225', nameCn: '日经225' },
]

const TEMP_INDEX_DATA: IndexData[] = [
  { symbol: '^GSPC', name: 'S&P 500', nameCn: '标普500', price: 4897.53, change: 18.42, changePercent: 0.38 },
  { symbol: '^IXIC', name: 'NASDAQ', nameCn: '纳斯达克', price: 15432.11, change: -52.67, changePercent: -0.34 },
  { symbol: '^DJI', name: 'DOW', nameCn: '道琼斯', price: 38512.45, change: 124.77, changePercent: 0.32 },
  { symbol: '^FTSE', name: 'FTSE 100', nameCn: '富时100', price: 7634.58, change: 9.31, changePercent: 0.12 },
  { symbol: '^N225', name: 'Nikkei 225', nameCn: '日经225', price: 33912.84, change: 205.63, changePercent: 0.61 },
]

const RosamarySection: React.FC<RosamarySectionProps> = ({ heading, subheading, cta }) => {
  const [indices, setIndices] = useState<IndexData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIndexData = async () => {
      try {
        // 暂时使用固定的临时数据，保留数据刷新流程
        setIndices(TEMP_INDEX_DATA)
      } finally {
        setLoading(false)
      }
    }

    fetchIndexData()

    // 每 60 秒刷新一次数据（保持现有逻辑，未来可替换为真实接口）
    const interval = setInterval(fetchIndexData, 60000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(num))
  }

  const renderIndex = (index: IndexData) => {
    const isPositive = index.changePercent >= 0
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400'
    const sign = isPositive ? '+' : ''

    return (
      <div key={index.symbol} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 min-[800px]:px-4 min-[800px]:py-3">
        <div>
          <div className="text-xs font-medium text-white/90 min-[800px]:text-sm">{index.name}</div>
          <div className="text-[10px] text-white/50 min-[800px]:text-xs">{index.nameCn}</div>
        </div>
        <div className="text-right">
          {loading ? (
            <div className="text-xs font-semibold text-white/50 min-[800px]:text-sm">--</div>
          ) : (
            <>
              <div className="text-xs font-semibold text-white/90 min-[800px]:text-sm">
                {formatNumber(index.price)}
              </div>
              <div className={`text-[10px] min-[800px]:text-xs ${colorClass}`}>
                {sign}{formatNumber(index.changePercent)}%
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 flex h-full w-full max-w-6xl flex-col-reverse items-center justify-center gap-4 px-6 pb-20 min-[800px]:flex-row min-[800px]:justify-between min-[800px]:gap-16 min-[800px]:px-20 min-[800px]:pb-0">
      {/* Left — text (bottom on mobile) */}
      <div className="flex flex-col items-center min-[800px]:flex-1 min-[800px]:items-start">
        <h2 className="mb-2 text-3xl font-bold tracking-wide min-[800px]:mb-4 min-[800px]:text-6xl">
          {heading}
        </h2>
        <p className="text-base font-light text-white/90 min-[800px]:text-2xl">
          {subheading}
        </p>
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

      {/* Right — Index quotes and Rosamary logo (top on mobile) */}
      <div className="flex w-full items-center justify-center min-[800px]:flex-1">
        <div className="relative w-full max-w-xs min-[800px]:max-w-md">
          {/* Gradient background */}
          <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-amber-500/20 to-orange-600/20 blur-2xl rounded-3xl" />

          {/* Index quotes panel */}
          <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden min-[800px]:rounded-3xl">
            {/* Header with Rosamary logo */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 min-[800px]:px-6 min-[800px]:py-4">
              <div className="flex items-center gap-2 min-[800px]:gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center min-[800px]:h-10 min-[800px]:w-10">
                  <span className="text-base font-bold text-white min-[800px]:text-xl">R</span>
                </div>
                <span className="text-base font-semibold text-white/90 min-[800px]:text-xl">Rosamary</span>
              </div>
              {loading && (
                <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
              )}
            </div>

            {/* Index quotes */}
            <div className="space-y-1.5 px-3 py-2 min-[800px]:space-y-2 min-[800px]:px-4 min-[800px]:py-3">
              {loading && indices.length === 0
                ? Array(5).fill(null).map((_, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 min-[800px]:px-4 min-[800px]:py-3">
                      <div className="space-y-1">
                        <div className="h-3 w-16 rounded bg-white/10 animate-pulse min-[800px]:h-4 min-[800px]:w-20" />
                        <div className="h-2.5 w-10 rounded bg-white/5 animate-pulse min-[800px]:h-3 min-[800px]:w-12" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-3 w-20 rounded bg-white/10 animate-pulse min-[800px]:h-4 min-[800px]:w-24" />
                        <div className="h-2.5 w-12 rounded bg-white/5 animate-pulse min-[800px]:h-3 min-[800px]:w-16" />
                      </div>
                    </div>
                  ))
                : indices.map(renderIndex)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RosamarySection
