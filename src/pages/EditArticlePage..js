import React, { useState, useEffect, useContext } from 'react';
import ArticleForm from '@/components/ArticleForm/ArticleForm';
import useFetch from '@/hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '@/context/currentUser';

const EditArticlePage = ({ match }) => {
  const slug = match.params.slug,
    apiUrl = `/articles/${slug}`,
    [currentUserState] = useContext(CurrentUserContext),
    [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl),
    [
      { response: updateArticleResponse, error: updateArticleError },
      doUpdateArticle,
    ] = useFetch(apiUrl),
    [initialValues, setInitialValues] = useState(null),
    [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const submitHandler = article => {
    doUpdateArticle({
      method: 'put',
      data: { article },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return;

    setInitialValues({
      title: fetchArticleResponse.article.title,
      body: fetchArticleResponse.article.body,
      description: fetchArticleResponse.article.description,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) return;
    setIsSuccessfulSubmit(true);
  }, [updateArticleResponse]);

  if (!currentUserState.isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={submitHandler}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticlePage;
