FROM openjdk:11
#jar파일의 경로를
ARG JAR_FILE=build/libs/*.jar
# app.jar의 이름으로 복사해서 사용한다
COPY ${JAR_FILE} app.jar
# 실행 커맨드
ENTRYPOINT ["java","-jar","app.jar"]
# 필수는 아니지만 다른 개발자들을 위해 달아놓는 주석
EXPOSE 8080