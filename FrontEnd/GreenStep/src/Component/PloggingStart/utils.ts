export const getImageForTrashType = (type: number) => {
  switch (type) {
    case 0:
      return require('../../Image/PloggingStart/trashcan.png');
    case 1:
      return require('../../Image/PloggingStart/recycletrashcan.png');
    // 다른 타입에 대한 이미지 추가
    default:
      return require('../../Image/PloggingStart/pet.png'); // 기본 이미지
  }
};
