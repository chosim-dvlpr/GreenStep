export const getImageForTrashType = (type: number) => {
  switch (type) {
    case 0:
      return require('../../Image/PloggingStart/trashcan.png');
    case 1:
      return require('../../Image/PloggingStart/recycletrashcan.png');

    default:
      return require('../../Image/PloggingStart/pet.png');
  }
};
