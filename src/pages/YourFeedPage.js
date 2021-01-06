import React, { Fragment, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import Feed from '@/components/Feed/Feed';
import Pagination from '@/components/Pagination/Pagination';
import { getPaginator, limit } from '@/common/utils/utils';
import { stringify } from 'query-string';
import PopularTags from '@/components/PopularTags/PopularTags';
import Loader from '@/components/Loader/Loader';
import Error from '@/components/Error/Error';
import FeedTabs from '@/components/FeedTabs/FeedTabs';

const YourFeedPage = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search),
    stringifyParams = stringify({
      limit,
      offset,
    }),
    apiUrl = `/articles/feed?${stringifyParams}`,
    [{ response, isLoading, error }, doFetch] = useFetch(apiUrl),
    url = match.url;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedTabs />
            {isLoading && <Loader />}
            {error && <Error />}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeedPage;
