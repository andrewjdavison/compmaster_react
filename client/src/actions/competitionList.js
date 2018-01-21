export function competitionListHasErrored(bool){
  return {
    type: 'COMPETITION_LIST_LOAD_FAILED',
    hasErrored: bool
  };
}

export function competitionListIsLoading(bool) {
  return {
    type: 'COMPETITION_LIST_LOADING',
    isLoading: bool
  };
}

export function competitionListFetchDataSuccess(competitionList) {
  return {
    type: 'COMPETITION_LIST_FETCH_DATA_SUCCESS',
    competitionList
  };
}

export function competitionListLoadTestData(competitionList) {
  return {
    type: 'COMPETITION_LIST_LOAD_TEST_DATA',
    competitionList
  };
}

export function competitionListFetchData(){
  return (dispatch) => {
    dispatch(competitionListIsLoading(true));

    fetch('/activecompetitions')
    .then((response)=> {
      if(!response.ok){
        throw Error(response.statusText);
      }

      dispatch(competitionListIsLoading(false));

      return response;
    })
    .then((response)=>response.json())
    .then((response) => dispatch(competitionListFetchDataSuccess(response.activecompetitions)))
    .catch(() => dispatch(competitionListHasErrored));
  };
}



