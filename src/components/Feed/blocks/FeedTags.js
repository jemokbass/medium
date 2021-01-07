import React from 'react';

const FeedTags = ({ tags }) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <li key={tag} className="tag-default tag-pill tag-outline">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default FeedTags;
