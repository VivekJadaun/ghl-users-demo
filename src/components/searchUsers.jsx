import React from 'react'

export const SearchUsers = ({ search, resultCount = 0 }) => {

  const onSearch = (e) => {
    search(e.target.value);
  };

  return (
    <div>
      Search users by title:
      <span style={{ marginLeft: 8 }}>
        <input type="text" onChange={onSearch} autoFocus />
      </span>
      <span style={{ marginLeft: 8 }}>
        ({resultCount})
      </span>
    </div>
  );
}
