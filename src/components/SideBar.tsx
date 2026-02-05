import {motion} from "framer-motion";
import logo from "../assets/logo.svg";
import homeIcon from "../assets/icon-nav-home.svg";
import moviesIcon from "../assets/icon-nav-movies.svg";
import tvIcon from "../assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../assets/icon-nav-bookmark.svg";
import newTrailerIcon from "../assets/new_trailer.svg";
import avatar from "../assets/image-avatar.png";


interface SideBarProps {
	genres: string[];
	selectedGenre: string;
	onSelectGenre: (genre: string) => void;
	onlyNewYear: boolean;
	onToggleNewYear: (enabled: boolean) => void;
}

function SideBar({
	genres,
	selectedGenre,
	onSelectGenre,
	onlyNewYear,
	onToggleNewYear,
}: SideBarProps) {
	return (
		<>
			{/* Mobile Navbar */}
				<nav className="fixed top-0 left-0 right-0 bg-blue-900 h-16 flex justify-between items-center px-4 md:hidden">
					{/* Logo слева */}
					<motion.img
						src={logo}
						alt="logo"
						className="w-8 h-6 cursor-pointer"
						whileHover={{ scale: 1.1 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					/>
					
					{/* Меню по центру */}
					<div className="flex gap-8">
						<motion.img
							src={homeIcon}
							alt="home"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
						<motion.img
							src={moviesIcon}
							alt="movies"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
						<motion.img
							src={tvIcon}
							alt="tv series"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
						<motion.img
							src={bookmarkIcon}
							alt="bookmarks"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
					</div>
					
					{/* Профиль справа */}
					<motion.img
						src={avatar}
						alt="profile"
						className="w-8 h-8 rounded-full border-2 border-[#F2F5F9] cursor-pointer"
						whileHover={{ scale: 1.1 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					/>
				</nav>
			
			{/* Desktop Sidebar */}
				<aside className="hidden md:flex fixed top-8 left-8 h-[calc(100vh-4rem)] w-20 bg-blue-900 rounded-2xl flex-col items-center py-8">
					{/* Logo */}
					<div className="mb-10">
						<motion.img
							src={logo}
							alt="logo"
							className="w-8 h-6 mb-8 cursor-pointer"
							whileHover={{ scale: 1.1 }}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
					</div>
					
					{/* Menu */}
					<nav className="flex flex-col gap-8">
						<motion.img
							src={homeIcon}
							alt="home"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
						<motion.img
							src={moviesIcon}
							alt="movies"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
						<motion.img
							src={tvIcon}
							alt="tv series"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
						<motion.img
							src={bookmarkIcon}
							alt="bookmarks"
							className="w-6 h-6 cursor-pointer"
							whileHover={{
								scale: 1.1,
								filter: "brightness(0) invert(1)"
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						/>
					</nav>

					<div className="mt-8 w-full px-3 flex flex-col gap-3">
					<select
						value={selectedGenre}
						onChange={(event) => onSelectGenre(event.target.value)}
						className="w-full bg-blue-950 text-white text-xs rounded-md px-2 py-2 outline-none"
					>
						{genres.map(genre => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
					<motion.button
						type="button"
						onClick={() => onToggleNewYear(!onlyNewYear)}
						className={`w-full rounded-md px-2 py-2 transition flex justify-center ${
							onlyNewYear ? 'bg-red-500' : 'bg-blue-950'
						}`}
						whileHover={{ scale: 1.1 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
					>
						<img
							src={newTrailerIcon}
							alt="new trailers"
							className="w-6 h-6"
						/>
					</motion.button>
				</div>
				
			{/* Avatar снизу */}
			<motion.img
				src={avatar}
				alt="profile"
				className="w-10 h-10 rounded-full border-2 border-[#F2F5F9] mt-auto cursor-pointer"
				whileHover={{ scale: 1.1 }}
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
			/>
			</aside>
		</>
	);
}

export default SideBar;