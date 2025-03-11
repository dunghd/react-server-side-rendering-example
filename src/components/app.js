import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppsIfNeeded } from '../redux/actions';

import Card from './card';
import Counter from './counter';

const App = () => {
  const dispatch = useDispatch();
  const { isFetching, apps } = useSelector((state) => ({
    isFetching: state.isFetching,
    apps: state.apps,
  }));

  useEffect(() => {
    dispatch(fetchAppsIfNeeded());
  }, [dispatch]);

  const totalApps = apps.length;

  return (
    <>
      {isFetching && totalApps === 0 && <h2>Loading...</h2>}
      {!isFetching && totalApps === 0 && <h2>Empty.</h2>}
      <Counter />
      <Card apps={apps} totalApps={totalApps} />
    </>
  );
};

export default App;
