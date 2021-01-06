import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch('/tags');
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map(tag => (
          <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
