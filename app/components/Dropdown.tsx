import { useState } from 'react';

interface DropdownProps {
  setSortOrder: (order: string) => void;
}

export default function Dropdown({ setSortOrder }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState('Lowest Number (First)');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setSortOrder(value);
  };

  return (
    <div className="mt-4 container mx-auto flex justify-end items-center">
      <label htmlFor="sort" className="block text-base tracking-tight text-zinc-500 dark:text-zinc-400 mt-3 mr-5">
        Or you can sort by:
      </label>
      <select
        id="sort"
        name="sort"
        value={selectedOption}
        onChange={handleChange}
        className="mt-2 block pl-4 pr-8 py-3 text-base bg-white dark:bg-zinc-100 border border-zinc-300 rounded-xl dark:text-zinc-500 text-zinc-600 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
      >
        <option>Lowest Number (First)</option>
        <option>Highest Number (First)</option>
        <option>A-Z</option>
        <option>Z-A</option>
      </select>
    </div>
  );
}
