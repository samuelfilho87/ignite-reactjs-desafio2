import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresContextProps {
  children: ReactNode;
}

interface GenresContexData {
  genres: Genre[];
  selectedGenre: Genre;
  updateSelectedGenre: Function;
}

const GenresContext = createContext<GenresContexData>({} as GenresContexData);

export function GenresProvider({ children }: GenresContextProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });

    api.get<Genre>(`genres/1`).then(response => {
      setSelectedGenre(response.data);
    })
  }, []);

  function updateSelectedGenre(genre: Genre) {
    setSelectedGenre(genre);
  }

  return (
    <GenresContext.Provider value={{ genres, selectedGenre, updateSelectedGenre }}>
      {children}
    </GenresContext.Provider>
  )
}

export function useGenres() {
  const context = useContext(GenresContext);

  return context;
}