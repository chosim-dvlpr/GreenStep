# Jenkins-Pipeline

# back

- code
    
    ```bash
    pipeline {
        agent any 
        
        environment {
            CONTAINER_NAME = "greenstep-container"
            IMAGE_NAME = "greenstep-image"
        }
    
        stages {
            stage('Git Clone') {
                steps {
                    git branch: 'back-release', credentialsId: 'wook', url: 'https://lab.ssafy.com/s09-final/S09P31B303.git'
                    sh "docker images"
                }
            }
            
            stage('Build') {
                steps {
                    sh '''
                        pwd
                        echo 'springboot build'
                        cd ./greenstep
    										cp /var/jenkins_home/backend-config/application.yml /var/jenkins_home/workspace/back/greenstep/src/main/resources
                        chmod +x ./gradlew
                        ./gradlew clean build -x test
                    '''
                }
            }
            
            stage('Docker delete') {
                steps {
                    script {
                        try {
                            sh "docker stop ${CONTAINER_NAME}"
                            sh "docker rm -f ${CONTAINER_NAME}"
                        } catch (Exception e) {
                            echo "Docker container ${CONTAINER_NAME} does not exist. Skipping deletion."
                        }
                        
                        try {
                            sh "docker image rm ${IMAGE_NAME}"
                        } catch (Exception e) {
                            echo "Docker image ${IMAGE_NAME} does not exist. Skipping deletion."
                        }
                    }
                }
                
                post {
                    success { 
                        sh 'echo "docker delete Success"'
                    }
                    failure {
                        sh 'echo "docker delete Fail"'
                    }
                }
            }
    
            stage('Dockerizing'){
                steps{
                    sh 'echo " Image Build Start"'
                    sh """
                        cd ./greenstep
                        ls -la
                        docker build -t ${IMAGE_NAME} . 
                    """
                }
                post {
                    success {
                        sh 'echo "Build Docker Image Success"'
                    }
                    failure {
                        sh 'echo "Build Docker Image Fail"'
                    }
                }
            }
    
            stage('Deploy') {
                steps {
                    sh "docker run --name ${CONTAINER_NAME} -d -p 8080:8080 ${IMAGE_NAME}"
                }
                post {
                    success {
                        echo 'deploy success'
                    }
                    failure {
                        echo 'deploy failed'
                    }
                }
            }
        }
    }
    ```
    

# Front

- code
    
    ```bash
    pipeline {
        agent any 
        
        environment {
            CONTAINER_NAME = "web-container"
            IMAGE_NAME = "web-image"
        }
    
        stages {
            stage('Git Clone') {
                steps {
                    git branch: 'front-web-release', credentialsId: 'wook', url: 'https://lab.ssafy.com/s09-final/S09P31B303.git'
                    sh "docker images"
                }
            }
            
            stage('Build') {
                steps {
                    sh '''
                        pwd
                        echo 'Building FastAPI application'
                        # Git Clone 단계에서 이미 소스 코드를 클론 받았으므로 별도의 디렉토리 변경은 필요하지 않습니다.
                        
                        # Dockerizing 단계에서 Dockerfile을 사용하여 이미지를 빌드할 예정이므로 여기서 별도의 작업은 필요하지 않습니다.
                    '''
                }
            }
            
            stage('Docker delete') {
                steps {
                    script {
                        try {
                            sh "docker stop ${CONTAINER_NAME}"
                            sh "docker rm -f ${CONTAINER_NAME}"
                        } catch (Exception e) {
                            echo "Docker container ${CONTAINER_NAME} does not exist. Skipping deletion."
                        }
                        
                        try {
                            sh "docker image rm ${IMAGE_NAME}"
                        } catch (Exception e) {
                            echo "Docker image ${IMAGE_NAME} does not exist. Skipping deletion."
                        }
                    }
                }
                
                post {
                    success { 
                        sh 'echo "docker delete Success"'
                    }
                    failure {
                        sh 'echo "docker delete Fail"'
                    }
                }
            }
    
            stage('Dockerizing'){
                steps{
                    sh '''
                        echo "Image Build Start"
                        cd ./GreenStep
                        pwd
                        ls -la
                        docker build -t ${IMAGE_NAME} .
                    '''
                }
                post {
                    success {
                        sh 'echo "Build Docker Image Success"'
                    }
                    failure {
                        sh 'echo "Build Docker Image Fail"'
                    }
                }
            }
    
            stage('Deploy') {
                steps {
                    sh "docker run --name ${CONTAINER_NAME} -d -p 5173:5173${IMAGE_NAME}"
                }
                post {
                    success {
                        echo 'deploy success'
                    }
                    failure {
                        echo 'deploy failed'
                    }
                }
            }
        }
    }
    ```
    

# AI

- code
    
    ```bash
    pipeline {
        agent any 
        
        environment {
            CONTAINER_NAME = "greenstep-ai-container"
            IMAGE_NAME = "greenstep-ai-image"
        }
    
        stages {
            stage('Git Clone') {
                steps {
                    git branch: 'python-release', credentialsId: 'wook', url: 'https://lab.ssafy.com/s09-final/S09P31B303.git'
                    sh "docker images"
                }
            }
            
            stage('Build') {
                steps {
                    sh '''
                        pwd
                        echo 'Building FastAPI application'
                        # Git Clone 단계에서 이미 소스 코드를 클론 받았으므로 별도의 디렉토리 변경은 필요하지 않습니다.
                        
                        # Dockerizing 단계에서 Dockerfile을 사용하여 이미지를 빌드할 예정이므로 여기서 별도의 작업은 필요하지 않습니다.
                    '''
                }
            }
            
            stage('Docker delete') {
                steps {
                    script {
                        try {
                            sh "docker stop ${CONTAINER_NAME}"
                            sh "docker rm -f ${CONTAINER_NAME}"
                        } catch (Exception e) {
                            echo "Docker container ${CONTAINER_NAME} does not exist. Skipping deletion."
                        }
                        
                        try {
                            sh "docker image rm ${IMAGE_NAME}"
                        } catch (Exception e) {
                            echo "Docker image ${IMAGE_NAME} does not exist. Skipping deletion."
                        }
                    }
                }
                
                post {
                    success { 
                        sh 'echo "docker delete Success"'
                    }
                    failure {
                        sh 'echo "docker delete Fail"'
                    }
                }
            }
    
            stage('Dockerizing'){
                steps{
                    sh '''
                        echo "Image Build Start"
                        cd greenstepAI
                        pwd
                        ls -la
                        docker build -t ${IMAGE_NAME} .
                    '''
                }
                post {
                    success {
                        sh 'echo "Build Docker Image Success"'
                    }
                    failure {
                        sh 'echo "Build Docker Image Fail"'
                    }
                }
            }
    
            stage('Deploy') {
                steps {
                    sh "docker run --name ${CONTAINER_NAME} -d -p 8000:80 ${IMAGE_NAME}"
                }
                post {
                    success {
                        echo 'deploy success'
                    }
                    failure {
                        echo 'deploy failed'
                    }
                }
            }
        }
    }
    ```