import React, { useState, useEffect } from 'react';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState(''),
    [body, setBody] = useState(''),
    [description, setDescription] = useState(''),
    [tagList, setTagList] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    const article = {
      title,
      body,
      description,
      tagList,
    };
    onSubmit(article);
  };

  useEffect(() => {
    if (!initialValues) return;
    setTitle(initialValues.title);
    setBody(initialValues.body);
    setDescription(initialValues.description);
    setTagList(initialValues.tagList.join(' '));
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <ErrorMessages backendErrors={errors} />}
            <form onSubmit={submitHandler}>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Article Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="What is it article about?"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Write in article (in markdown)"
                  rows={9}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter tags"
                  value={tagList}
                  onChange={e => setTagList(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <button
                  type="submit"
                  className="btn btn-lg pull-xs-right btn-primary"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
