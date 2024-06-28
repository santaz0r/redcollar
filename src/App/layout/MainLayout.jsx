import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsLoadingStatus, loadEventsList } from '../store/events';
import { checkAuth, getUsersLoadingStatus, loadUsersList } from '../store/users';

const MainLayout = () => {
  const isEventsLoading = useSelector(getEventsLoadingStatus);
  const isUsersLoading = useSelector(getUsersLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventsList());
    dispatch(loadUsersList());
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkAuth(token));
    }
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(loadTodosList());
  //     dispatch(loadUsersList());
  //   }
  // }, [isLoggedIn]);

  if (isEventsLoading || isUsersLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
