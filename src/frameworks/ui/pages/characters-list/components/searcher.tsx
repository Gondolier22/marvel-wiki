import { FC } from 'react';

type SearcherProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Searcher: FC<SearcherProps> = ({ onChange, value }) => {
  return (
    <div>
      <img src="searcher_icon.svg" alt="Searcher icon" />
      <input
        type="text"
        value={value}
        placeholder="Search a character..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
