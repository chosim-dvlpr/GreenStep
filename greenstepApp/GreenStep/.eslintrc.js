// module.exports = {
//   root: true,
//   extends: '@react-native',
//   rules: {
//     'prettier/prettier': 0,
//   },
// };


// ES6 문법
export default {
  root: true,
  extends: '@react-native',
  rules: {
    'quotes': ['error', 'single'], // ESLint가 단일 따옴표를 요구하며, 이러한 규칙을 어긴 경우 해당 오류를 표시하지 않게 됩니다.
    'prettier/prettier': 0,
  },
};