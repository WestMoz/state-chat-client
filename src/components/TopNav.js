import React from 'react';

export default function TopNav() {
  const [search, setSearch] = React.useState('');
  return (
    <div>
      <div>Home</div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search posts..."
      />
      <button>Search</button>
      {search}
    </div>
  );
}
