import { CurrentUserContext } from '@/context/currentUser';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AddToFavorites from '../AddToFavorites/AddToFavorites';
import FeedTags from './blocks/FeedTags';

const Feed = ({ articles }) => {
  const [currentUserState] = useContext(CurrentUserContext);

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
            <div className="pull-xs-right">
              {currentUserState.isLoggedIn && (
                <AddToFavorites
                  isFavorite={article.favorited}
                  favoritesCount={article.favoritesCount}
                  articleSlug={article.slug}
                />
              )}
            </div>
          </div>
          <Link to={`/articles/${article.slug}`} className="preview-link">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <span>Read More...</span>
            <FeedTags tags={article.tagList} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;
