import React, { useEffect, useState } from 'react'
import AndroidIcon from '../../asset/Android.svg'
import IOSIcon from '../../asset/iOS.svg'
import SteamIcon from '../../asset/steam.svg'

interface IndexData {
  symbol: string
  name: string
  nameCn: string
  price: number
  change: number
  changePercent: number
}

interface ToffeeSectionProps {
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

const ToffeeSection: React.FC<ToffeeSectionProps> = ({ heading, subheading, cta }) => {
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
      <div key={index.symbol} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
        <div>
          <div className="text-sm font-medium text-white/90">{index.name}</div>
          <div className="text-xs text-white/50">{index.nameCn}</div>
        </div>
        <div className="text-right">
          {loading ? (
            <div className="text-sm font-semibold text-white/50">--</div>
          ) : (
            <>
              <div className="text-sm font-semibold text-white/90">
                {formatNumber(index.price)}
              </div>
              <div className={`text-xs ${colorClass}`}>
                {sign}{formatNumber(index.changePercent)}%
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

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

      {/* Right — Index quotes and Toffee logo */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-md">
          {/* Gradient background */}
          <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-amber-500/20 to-orange-600/20 blur-2xl rounded-3xl" />

          {/* Index quotes panel */}
          <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Header with Toffee logo */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">T</span>
                </div>
                <span className="text-xl font-semibold text-white/90">Toffee</span>
              </div>
              {loading && (
                <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
              )}
            </div>

            {/* Index quotes */}
            <div className="space-y-2 px-4 py-3">
              {loading && indices.length === 0
                ? Array(5).fill(null).map((_, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                      <div className="space-y-1">
                        <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                        <div className="h-3 w-12 rounded bg-white/5 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
                        <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
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

export default ToffeeSection
