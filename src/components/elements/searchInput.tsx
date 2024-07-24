import React, { useState } from "react";

type SearchInputProps = {
  onSearch: (keyword: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [keyword, setKeyword] = useState<string>("");
  return (
    <div className='flex w-96 shadow-md items-center relative bg-transparent rounded-md border py-2 px-4 hover:bg-gray-100'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(keyword);
        }}>
        <input
          type='text'
          className='w-full bg-transparent outline-none'
          placeholder='Cari produk '
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type='submit'
          onClick={() => onSearch(keyword)}
          className='absolute right-0 top-0 bottom-0 bg-red-500 rounded-md px-4'>
          <img src='/search.svg' alt='search' />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
