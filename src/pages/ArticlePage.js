import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error from '@/components/Error/Error';
import Loader from '@/components/Loader/Loader';
import useFetch from '@/hooks/useFetch';
import FeedTags from '@/components/Feed/blocks/FeedTags';

const ArticlePage = props => {
  const slug = props.match.params.slug,
    apiUrl = `/articles/${slug}`,
    [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="author avatar" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loader />}
        {error && <Error />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{response.article.body}</p>
              <FeedTags tags={response.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
