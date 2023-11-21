# Docker Compose

### 순서

1. Docker Compose 설치
2. docker-compose .yml 파일 작성

### Docker Compose 설치

```bash
$ sudo apt install docker-compose

$ sudo apt-get update
```

### docker-compose.yml파일 작성

한번에 관리할 image들을 작성하는 곳

root 위치에 docker-compose.yml 파일 생성

```bash
sudo vim docker-compose.yml
```

```json
version: "3"
  
services:
  db:
    image: mariadb:10
    ports:
      - "3306:3306"
    container_name: mariadb
    volumes:
      - ./db/conf.d:/etc/mysql/conf.d
      - ./db/data:/var/lib/mysql
      - ./db/initdb.d:/docker-entrypoint-initdb.d
    environment:
      MARIADB_ROOT_PASSWORD: wkdbf303
    restart: always

  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /jenkins:/var/jenkins_home
    ports:
      - "9090:8080" 
    user: root

  redis:
    image: redis:alpine
    command: redis-server --port 6379
    container_name: redis_boot
    hostname: redis_boot
    labels:
      - "name=redis"
      - "mode=standalone"
    ports:
      - 6379:6379
```