pipeline {
    agent {
        docker {
            image 'node:18'  // Or 'node:20' if you want the latest stable
        }
    }

    environment {
        IMAGE_NAME = 'amanpep_project'
        CONTAINER_NAME = 'amanpep_container'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Docker Container') {
            steps {
                sh "docker stop $CONTAINER_NAME || true"
                sh "docker rm $CONTAINER_NAME || true"
                sh "docker run -d -p 8080:80 --name $CONTAINER_NAME $IMAGE_NAME"
            }
        }
    }
}
