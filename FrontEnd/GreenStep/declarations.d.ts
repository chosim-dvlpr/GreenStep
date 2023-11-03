// declarations.d.ts
// react-native tsx에는 png같은 파일을 모듈로 인식하지 못합니다. 아래의 코드는

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}
