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

export type LocationAction = {type: 'ADD_LOCATION'; payload: ILocation};
// 필요한 다른 액션 타입들을 여기에 추가할 수 있습니다.

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
      const prevLocation = state.locations[state.locations.length - 1];
      const distance =
        state.locations.length > 0
          ? haversine(prevLocation, newLocation, {unit: 'meter'})
          : 0;
      const updatedTotalDist = state.totalDist + distance;
      return {
        locations: [...state.locations, newLocation],
        totalDist: updatedTotalDist,
      };
    default:
      return state;
  }
};
