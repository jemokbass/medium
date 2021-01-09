import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Error from '@/components/Error/Error';
import Loader from '@/components/Loader/Loader';
import useFetch from '@/hooks/useFetch';
import FeedTags from '@/components/Feed/blocks/FeedTags';
import { CurrentUserContext } from '@/context/currentUser';

const ArticlePage = props => {
  const slug = props.match.params.slug,
    apiUrl = `/articles/${slug}`,
    [
      {
        response: fetchArticleResponse,
        isLoading: fetchArticleIsLoading,
        error: fetchArticleError,
      },
      doFetch,
    ] = useFetch(apiUrl),
    [{ response: deleteArticleResponse }, deleteArticleFetch] = useFetch(
      apiUrl
    ),
    [currentUserState] = useContext(CurrentUserContext),
    [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false;
    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    deleteArticleFetch({
      method: 'delete',
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfulDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfulDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img
                  src={fetchArticleResponse.article.author.image}
                  alt="author avatar"
                />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    <i className="ion-edit" /> Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a" /> Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loader />}
        {fetchArticleError && <Error />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{fetchArticleResponse.article.body}</p>
              <FeedTags tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
