import React from 'react'

export const SearchUsers = ({ search }) => {

  const onSearch = (event) => {
    search(event.target.value);
  };

  return (
    <div>
      Search users by title:
      <span style={{ marginLeft: 8 }}>
        <input type="text" onChange={onSearch} autoFocus />
      </span>
    </div>
  );
}
