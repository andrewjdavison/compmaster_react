import {get} from '../coreutil.js';

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
  let compData=undefined;

  return (dispatch) => {
    dispatch(competitionDetailIsLoading(true));

    fetch('/compinsts/'+id)
    .then((response)=> {
      if(!response.ok){
        throw Error(response.statusText);
      }

      dispatch(competitionDetailIsLoading(false));

      return response;
    })
    .then((response)=>response.json())
    .then((jsonData)=> {
      compData = jsonData.compinsts[0];
      return get('/blurbs?compinstid='+compData.id);
    })
    .then((response)=>{
      compData.blurbData = response.body.blurbs;
    })
    .then((response) => dispatch(competitionDetailFetchDataSuccess(compData)))
    .catch(() => dispatch(competitionDetailHasErrored));
  };
}



