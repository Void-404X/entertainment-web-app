import {useEffect, useRef, useState, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTrailers} from '../features/trailers/trailerThunks'
import {
	selectError,
	selectLoading,
	selectTrailers,
} from '../features/trailers/trailerSlice'
import type {AppDispatch} from '../app/store'
import Search from './Search'

interface MainProps {
	selectedGenre: string
	onlyNewYear: boolean
	currentYear: number
}

function Main({selectedGenre, onlyNewYear, currentYear}: MainProps) {
	const dispatch = useDispatch<AppDispatch>()
	const trailers = useSelector(selectTrailers)
	const loadingFromStore = useSelector(selectLoading)
	const error = useSelector(selectError)
	
	const [hoveredTrailerId, setHoveredTrailerId] = useState<number | null>(null)
	const [fullscreenVideoId, setFullscreenVideoId] = useState<number | null>(null)
	
	const [searchQuery, setSearchQuery] = useState('')
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	
	const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
	const watchedTime = useRef<Record<number, number>>({})
	
	const TRAILERS_PER_PAGE = 6
	
	// Вычисляем поисковые значения напрямую вместо useState
	const isSearching = searchQuery.trim().length > 0
	
	const genreFilteredTrailers = useMemo(() => {
		let result = trailers

		if (selectedGenre !== 'All') {
			const normalized = selectedGenre.toLowerCase()
			result = result.filter(trailer =>
				trailer.genre.toLowerCase().includes(normalized)
			)
		}

		if (onlyNewYear) {
			result = result.filter(
				trailer => trailer.release_year === currentYear
			)
		}

		return result
	}, [trailers, selectedGenre, onlyNewYear, currentYear])

	const filteredTrailers = useMemo(() => {
		if (!isSearching) return genreFilteredTrailers

		const query = searchQuery.toLowerCase().trim()
		return genreFilteredTrailers.filter(
			trailer =>
				trailer.title.toLowerCase().includes(query) ||
				trailer.genre.toLowerCase().includes(query) ||
				trailer.release_year.toString().includes(query)
		)
	}, [searchQuery, genreFilteredTrailers, isSearching])
	
	// Fetch trailers
	useEffect(() => {
		dispatch(fetchTrailers())
	}, [dispatch])
	
	useEffect(() => {
		if (!loadingFromStore) {
			const timer = setTimeout(() => setLoading(false), 1000)
			return () => clearTimeout(timer)
		}
	}, [loadingFromStore])
	
	// Pagination
	const allTrailers = isSearching ? filteredTrailers : genreFilteredTrailers
	
	const hasMore = useMemo(
		() => page * TRAILERS_PER_PAGE < allTrailers.length,
		[page, allTrailers]
	)
	
	const displayedTrailers = allTrailers.slice(
		0,
		page * TRAILERS_PER_PAGE
	)
	
	const handleSearch = (query: string) => {
		setSearchQuery(query)
		setPage(1)
	}
	
	// Hover video
	const handleMouseEnter = (id: number) => {
		setHoveredTrailerId(id)
		const video = videoRefs.current[id]
		if (video) {
			video.currentTime = watchedTime.current[id] ?? 0
			video.play().catch(() => {})
		}
	}
	
	const handleMouseLeave = (id: number) => {
		setHoveredTrailerId(null)
		const video = videoRefs.current[id]
		if (video && fullscreenVideoId !== id) {
			video.pause()
		}
	}
	
	const handleTimeUpdate = (id: number) => {
		const video = videoRefs.current[id]
		if (video) watchedTime.current[id] = video.currentTime
	}
	
	// Fullscreen
	const handleFullscreen = (id: number) => {
		const video = videoRefs.current[id]
		if (!video) return
		
		video.currentTime = watchedTime.current[id] ?? video.currentTime
		
		video.requestFullscreen?.().then(() => {
			video.play()
			setFullscreenVideoId(id)
		})
	}
	
	useEffect(() => {
		const onFullscreenChange = () => {
			if (!document.fullscreenElement) setFullscreenVideoId(null)
		}
		document.addEventListener('fullscreenchange', onFullscreenChange)
		return () =>
			document.removeEventListener('fullscreenchange', onFullscreenChange)
	}, [])
	
	if (error) return <p className="text-red-500">{error}</p>
	
	return (
		<div className="text-white space-y-10 px-4 md:px-8 lg:px-12 py-6 md:ml-24 lg:ml-28">
			<div className="mt-0">
				<Search onSearch={handleSearch} />
			</div>
			
			{isSearching && !loading ? (
				<h2 className="text-xl font-light">
					{filteredTrailers.length
						? `Found ${filteredTrailers.length} results for "${searchQuery}"`
						: `No results for "${searchQuery}"`}
				</h2>
			) : !loading ? (
				<h2 className="text-xl font-light">Recommended for you</h2>
			) : null}
			
			<section className="space-y-8">
				{loading ? (
					<div className="flex flex-col items-center justify-center py-20">
						<div className="w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mb-4" />
						<p className="text-gray-400">Loading trailers...</p>
					</div>
				) : displayedTrailers.length ? (
					<>
						<div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
							{displayedTrailers.map((trailer, index) => {
								const startIndex = (page - 1) * TRAILERS_PER_PAGE
								const isNew = index >= startIndex
								const delaySeconds = isNew ? (index - startIndex) * 0.08 : 0

								return (
								<div
									key={trailer.id}
										className={`relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition${isNew ? ' trailer-reveal' : ''}`}
										style={isNew ? {animationDelay: `${delaySeconds}s`} : undefined}
									onClick={() => handleFullscreen(trailer.id)}
								>
									<div
										className="relative w-full h-64"
										onMouseEnter={() => handleMouseEnter(trailer.id)}
										onMouseLeave={() => handleMouseLeave(trailer.id)}
									>
										<video
											ref={el => {
												if (el) videoRefs.current[trailer.id] = el
											}}
											src={trailer.video_file}
											muted
											playsInline
											onTimeUpdate={() => handleTimeUpdate(trailer.id)}
											className="w-full h-full object-cover"
										/>
										
										{hoveredTrailerId !== trailer.id && (
											<img
												src={trailer.preview_image}
												alt={trailer.title}
												className="absolute inset-0 w-full h-full object-cover"
											/>
										)}
										
										<div className="absolute bottom-0 left-0 right-0 h-1/3 from-black/90 to-transparent" />
										
										<div className="absolute bottom-0 left-0 right-0 p-4">
											<div className="text-sm text-gray-300 mb-2 flex gap-2">
												<span>{trailer.release_year}</span>
												<span>•</span>
												<span>{trailer.genre}</span>
												<span>•</span>
												<span>{trailer.age_rating}</span>
											</div>
											<h3 className="text-lg font-semibold line-clamp-1">
												{trailer.title}
											</h3>
										</div>
									</div>
								</div>
							)
							})}
						</div>
						
						{hasMore && (
							<div className="flex justify-center mt-12">
								<button
									onClick={() => setPage(p => p + 1)}
									className="px-8 py-3 bg-blue-600 cursor-pointer rounded-lg transition font-medium"
								>
									Load more
								</button>
							</div>
						)}
					</>
				) : (
					<p className="text-center text-gray-400">
						Nothing found. Try another search.
					</p>
				)}
			</section>
		</div>
	)
}

export default Main