const initialCompetitionListState = {
  isLoading: false,
  hasErrored: false,
  loaded: false,
  competitions: [ ],
};

const competitionList = (state = initialCompetitionListState, action) => {
  switch (action.type) {
    case 'COMPETITION_LIST_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case 'COMPETITION_LIST_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
        loaded: false
      };
    case 'COMPETITION_LIST_FETCH_DATA_SUCCESS':
      return {
        ...state,
        competitions: action.competitionList,
        loaded: true
      };
    case 'COMPETITION_LIST_LOAD_TEST_DATA':
      console.log('Adding a new element');
      return {
        ...state,
        competitions: [
          ...state.competitions,
          {
            name: 'New Comp',
            id: -1,
          }
        ]
      };
    default:
      return state;
  }
};

export default competitionList;
