import useFetch from '@/hooks/useFetch';
import React, { useEffect } from 'react';

const AddToFavorites = ({ isFavorite, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`,
    [{ response }, doFetch] = useFetch(apiUrl);

  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const isFavoriteWithResponse = response
    ? response.article.favorited
    : isFavorite;

  const buttonClasses = isFavoriteWithResponse
    ? 'btn-sm btn-primary'
    : 'btn-sm btn-outline-primary';

  const likeHandler = event => {
    event.preventDefault();
    doFetch({
      method: isFavoriteWithResponse ? 'delete' : 'post',
    });
  };

  return (
    <button className={buttonClasses} type="button" onClick={likeHandler}>
      <i className="ion-heart" />
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;
