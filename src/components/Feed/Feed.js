import React from 'react';
import { Link } from 'react-router-dom';

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} alt="author avatar" />
            </Link>
            <div className="info">
              <Link to={`/profiles/${article.author.username}`}>
                {article.author.username}
              </Link>
              <span className="date">{article.createdAt}</span>
            </div>
          </div>
          <Link to={`/articles/${article.slug}`} className="preview-link">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <span>Read More...</span>
            <ul className="tag-list">
              {article.tagList.map(tag => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;
