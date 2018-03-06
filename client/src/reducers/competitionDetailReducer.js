const initialCompetitionDetailState = {
  isLoading: false,
  hasErrored: false,
  loaded: false,
  competition: {},
};

const competitionDetail= (state = initialCompetitionDetailState, action) => {
  switch (action.type) {
    case 'COMPETITION_DETAIL_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case 'COMPETITION_DETAIL_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
        loaded: false
      };
    case 'COMPETITION_DETAIL_FETCH_DATA_SUCCESS':
      return {
        ...state,
        competition: action.competitionDetail,
        loaded: true
      };
    default:
      return state;
  }
};

export default competitionDetail;
