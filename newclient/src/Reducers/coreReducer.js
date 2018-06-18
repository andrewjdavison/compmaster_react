const initialCoreState = {
  currentPage: undefined,
}

const core = ( state = initialCoreState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
};

export default core;
