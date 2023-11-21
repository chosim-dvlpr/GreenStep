// locationReducer.ts
import haversine from 'haversine';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IState {
  locations: ILocation[];
  totalDist: number;
}

export type LocationAction =
  | {type: 'ADD_LOCATION'; payload: ILocation}
  | {type: 'UPDATE_CURRENT_LOCATION'; payload: ILocation}
  | {type: 'RESET_AND_ADD_LOCATION'; payload: ILocation};

export const initialState: IState = {
  locations: [],
  totalDist: 0,
};

export const locationReducer = (
  state: IState,
  action: LocationAction,
): IState => {
  switch (action.type) {
    case 'ADD_LOCATION':
      const newLocation = action.payload;
      const prevLocation =
        state.locations[state.locations.length - 1] || newLocation;
      const distance = haversine(prevLocation, newLocation, {unit: 'meter'});
      return {
        locations: [...state.locations, newLocation],
        totalDist: state.totalDist + distance,
      };
    case 'UPDATE_CURRENT_LOCATION':
      return {
        ...state,
        locations: [action.payload],
      };
    case 'RESET_AND_ADD_LOCATION':
      return {
        locations: [action.payload],
        totalDist: 0,
      };
    default:
      return state;
  }
};
