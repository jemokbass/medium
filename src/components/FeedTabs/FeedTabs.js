import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '@/context/currentUser';

const FeedTabs = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              Your feed
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to="/" exact className="nav-link">
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} exact className="nav-link">
              <i className="ion-pound" /> {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedTabs;
