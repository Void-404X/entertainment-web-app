import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import SideBar from "./components/SideBar.tsx";
import Main from "./components/Main.tsx"
import {selectTrailers} from "./features/trailers/trailerSlice";

function App() {
  const trailers = useSelector(selectTrailers)
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [onlyNewYear, setOnlyNewYear] = useState(false)
  const currentYear = new Date().getFullYear()

  const genres = useMemo(() => {
    const unique = new Set<string>()

    trailers.forEach(trailer => {
      trailer.genre
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .forEach(item => unique.add(item))
    })

    return ['All', ...Array.from(unique).sort()]
  }, [trailers])

  return (
    <div className="flex min-h-screen bg-gray-900">
      <SideBar
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        onlyNewYear={onlyNewYear}
        onToggleNewYear={setOnlyNewYear}
      />
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0"> {/* Добавлен pt-16 для мобильной навигации */}
        <Main
          selectedGenre={selectedGenre}
          onlyNewYear={onlyNewYear}
          currentYear={currentYear}
        />
      </main>
    </div>
  )
}

export default App