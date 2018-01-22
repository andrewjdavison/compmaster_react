const testCompetitionListState = {
  isLoading: false,
  hasErrored: false,
  competitions: [
    {
      name: 'Beerfast',
      id: 1,
    },
    {
      name: 'VicBrew',
      id: 2,
    }
  ],
};

const competitionList = (state = testCompetitionListState, action) => {
  switch (action.type) {
    case 'COMPETITION_LIST_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case 'COMPETITION_LIST_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'COMPETITION_LIST_FETCH_DATA_SUCCESS':
      return {
        ...state,
        competitions: action.competitionList
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
