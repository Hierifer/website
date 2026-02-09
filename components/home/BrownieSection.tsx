import React, { useEffect, useRef } from 'react'

interface BrownieSectionProps {
	heading: string
	subheading: string
	video: string
}

const LOOP_END_TIME = 3

const BrownieSection: React.FC<BrownieSectionProps> = ({ heading, subheading, video }) => {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		const node = videoRef.current
		if (!node) return

		const restartSegment = () => {
			node.currentTime = 0
			node.play().catch(() => undefined)
		}

		const handleTimeUpdate = () => {
			if (node.currentTime >= LOOP_END_TIME) {
				restartSegment()
			}
		}

		const handleLoaded = () => {
			restartSegment()
		}

		restartSegment()
		node.addEventListener('timeupdate', handleTimeUpdate)
		node.addEventListener('loadedmetadata', handleLoaded)

		return () => {
			node.removeEventListener('timeupdate', handleTimeUpdate)
			node.removeEventListener('loadedmetadata', handleLoaded)
		}
	}, [])

	return (
		<div className="relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-between gap-12 px-12 text-white md:flex-row md:gap-20 md:px-20">
			<div className="flex w-full flex-1 justify-center md:max-w-xl">
				<div className="relative w-full">
					<div className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px] bg-amber-500/25 blur-3xl opacity-70" />
					<div className="aspect-[4/5] overflow-hidden rounded-[36px] border border-white/15 bg-black/80 shadow-2xl">
						<video
							ref={videoRef}
							className="h-full w-full object-cover"
							src={video}
							autoPlay
							muted
							playsInline
							preload="auto"
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-1 flex-col items-start text-left">
				<h2 className="mb-4 text-4xl font-semibold tracking-wide md:text-5xl">
					{heading}
				</h2>
				<p className="text-lg font-light text-white/80 md:text-xl">{subheading}</p>
			</div>
		</div>
	)
}

export default BrownieSection
