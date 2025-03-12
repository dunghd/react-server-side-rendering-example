export const REQUEST_APPS = 'REQUEST_APPS';
export const RECEIVE_APPS = 'RECEIVE_APPS';

function requestApps() {
  return {
    type: REQUEST_APPS,
  };
}

function receiveApps(json) {
  return {
    type: RECEIVE_APPS,
    apps: json,
  };
}

function fetchApps() {
  return async (dispatch) => {
    dispatch(requestApps());
    const response = await fetch(`assets/data.json`);
    const json = await new Promise((resolve) =>
      setTimeout(() => resolve(response.json()), 3000),
    );
    return dispatch(receiveApps(json));
  };
}

function shouldFetchApps(state) {
  const apps = state.apps;
  if (apps.length == 0) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
}

export function fetchAppsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchApps(getState())) {
      return dispatch(fetchApps());
    }
  };
}
