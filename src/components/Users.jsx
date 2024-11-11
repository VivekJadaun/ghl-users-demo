import React, { useEffect, useRef, useState } from "react";
import User from "./User.jsx";
import { SearchUsers } from "./searchUsers.jsx";
import debounce from "../helpers/debounce.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  const totalUsers = useRef([]);
  
  const fetchUsers = () => {
    return (async () => {
      fetch("https://jsonplaceholder.typicode.com/posts").then(
        async (response) => {
          const users = await response.json();
          const parsedUsers = getSortedUsers(
            users.map((user) => {
              const words = user.body.split(" ");
              return { ...user, wordCount: words.length };
            })
          );
          totalUsers.current = parsedUsers;
          setUsers(parsedUsers);
        }
      );
    })();
  };


  const resetUsers = () => {
    setUsers([]);
    totalUsers.current = [];
  };

  const resetUsersToTotal = () => {
    setUsers(totalUsers.current);
  }

  const getSortedUsers = (usersData) => {
    return usersData.sort((user1, user2) => user2.wordCount - user1.wordCount);
  };
  
  const searchUsers = (query) => {
    if (!query) return resetUsersToTotal();
    
    const filteredUsers = totalUsers.current.filter((user) =>
      user.title.includes(query)
    );
    const sortedUsers = getSortedUsers(filteredUsers).slice(0, 10);
    setUsers(sortedUsers);
  }
  
  const onSearch = debounce(searchUsers, 500);
  
  useEffect(() => {
    fetchUsers();
    return () => resetUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {!!totalUsers.current.length && (
        <>
          <SearchUsers search={onSearch} resultCount={users.length} />
          {users.map(({ id, title, body, wordCount }) => (
            <User
              key={id}
              id={id}
              title={title}
              body={body}
              wordCount={wordCount}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Users;
