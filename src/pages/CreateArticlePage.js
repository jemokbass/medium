import React, { useState, useEffect, useContext } from 'react';
import ArticleForm from '@/components/ArticleForm/ArticleForm';
import useFetch from '@/hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '@/context/currentUser';

const CreateArticlePage = () => {
  const initialValues = {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
    apiUrl = '/articles',
    [{ response, error }, doFetch] = useFetch(apiUrl),
    [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false),
    [currentUserState] = useContext(CurrentUserContext);

  const submitHandler = article => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) return;
    setIsSuccessfulSubmit(true);
  }, [response]);

  if (!currentUserState.isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  return (
    <ArticleForm
      errors={(error && error.errors) || {}}
      initialValues={initialValues}
      onSubmit={submitHandler}
    />
  );
};

export default CreateArticlePage;
