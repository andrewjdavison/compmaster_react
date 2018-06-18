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
    case 'COMPETITION_SET_NAME':
      console.log('Setting name to ', action.name);
      return {
        ...state,
        competition: {
          ...state.competition,
          name: action.name
        }
      };
    case 'COMPETITION_SET_ADDRESS':
      console.log('Setting Address to ', action.address);
      return {
        ...state,
        competition: {
          ...state.competition,
          address1: action.address,
          address2: action.placeId,
        }
      };
    case 'COMPETITION_SET_LATLNG':
      console.log('Setting LatLngto ', action.latLng);
      return {
        ...state,
        competition: {
          ...state.competition,
          lat: action.latLng.lat,
          lng: action.latLng.lng,
        }
      };


    default:
      return state;
  }
};

export default competitionDetail;
