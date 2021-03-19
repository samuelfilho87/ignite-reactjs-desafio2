import { Button } from '../components/Button';
import { useGenres } from '../hooks/useGenres';

export function SideBar() {
  const { genres, selectedGenre, updateSelectedGenre } = useGenres();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => updateSelectedGenre(genre)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}