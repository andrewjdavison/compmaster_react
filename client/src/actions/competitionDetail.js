export function competitionDetailHasErrored(bool){
  return {
    type: 'COMPETITION_DETAIL_LOAD_FAILED',
    hasErrored: bool
  };
}

export function competitionDetailIsLoading(bool) {
  return {
    type: 'COMPETITION_DETAIL_LOADING',
    isLoading: bool
  };
}

export function competitionDetailFetchDataSuccess(competitionDetail) {
  return {
    type: 'COMPETITION_DETAIL_FETCH_DATA_SUCCESS',
    competitionDetail};
}

export function resetStore(){
  console.log('resetStore');
  return {
    type: 'USER_LOGOUT'
  };
}

export function competitionDetailFetchData(id){
  return (dispatch) => {
    dispatch(competitionDetailIsLoading(true));

    console.log('Loading competition');

    fetch('/compinsts/'+id)
    .then((response)=> {
      if(!response.ok){
        throw Error(response.statusText);
      }

      dispatch(competitionDetailIsLoading(false));

      return response;
    })
    .then((response)=>response.json())
    .then((response) => dispatch(competitionDetailFetchDataSuccess(response.compinsts[0])))
    .catch(() => dispatch(competitionDetailHasErrored));
  };
}



