import {useDispatch} from 'react-redux';
import {incrementCount} from '../../../Store/ploggingSlice';
import {getLocation} from '../getLocation';
import {trashTypeMapping} from '../TrashType';

// 커스텀 훅 사용 예시
export const useTrashItem = () => {
  const dispatch = useDispatch();

  const addTrashItem = async (name: string) => {
    try {
      const location = await getLocation();
      const trashType = trashTypeMapping[name];
      const trashItem = {
        trashType: trashType,
        latitude: location.latitude,
        longitude: location.longitude,
        trash_picture: null,
      };

      dispatch(incrementCount({name, trashItem}));
    } catch (error) {
      console.error('Error in addTrashItem:', error);
    }
  };

  return addTrashItem;
};
