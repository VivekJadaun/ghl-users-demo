import React from 'react'

const User = ({ id, title, body, wordCount }) => {
  return (
    <div style={{ border: "2px solid black", marginTop: "10px", textAlign: 'left', paddingLeft: '10px' }}>
      <div>User: {id}</div>
      <div>Title: {title}</div>
      <div>Content: {body}</div>
      <div>Words: {wordCount}</div>
    </div>
  );
}

export default User;
