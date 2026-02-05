import {useState} from "react";
import searchIcon from '../assets/icon-search.svg';

interface SearchProps {
	onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
	const [searchQuery, setSearchQuery] = useState('');
	
	return (
		<div className="w-full">
			<div className="relative">
				<img
					src={searchIcon}
					alt="Search"
					className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
				/>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						onSearch(e.target.value); // фильтрация при каждой букве
					}}
					placeholder="Search for movies or TV series"
					className="w-full bg-transparent text-white text-xl font-light pl-14 pr-4 py-4
						border-b border-gray-700 focus:outline-none focus:border-gray-400
						placeholder-gray-500"
				/>
			</div>
		</div>
	);
}

export default Search;
