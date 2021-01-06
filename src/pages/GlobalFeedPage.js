import React, { Fragment, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import Feed from '@/components/Feed/Feed';
import Pagination from '@/components/Pagination/Pagination';
import { getPaginator, limit } from '@/common/utils/utils';
import { stringify } from 'query-string';

const GlobalFeedPage = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles?${stringifyParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const url = match.url;

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
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened.</div>}
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
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeedPage;
