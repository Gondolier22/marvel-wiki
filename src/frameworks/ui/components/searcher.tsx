import { FC } from 'react';

// Define las propiedades del componente Searcher
type SearcherProps = {
  value: string;
  totalResults: number;
  onChange: (value: string) => void;
};

// Componente funcional Searcher
export const Searcher: FC<SearcherProps> = ({ onChange, value, totalResults }) => {
  return (
    <div className="c-searcher">
      <div className="c-searcher__input-container">
        <img src="searcher_icon.svg" alt="Searcher icon" className="c-searcher__icon" />
        <input
          type="text"
          value={value}
          placeholder="Search a character..."
          onChange={(e) => onChange(e.target.value)}
          className="c-searcher__input"
        />
      </div>
      <p className="c-searcher__results">{totalResults} results</p>
    </div>
  );
};
