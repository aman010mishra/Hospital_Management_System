pipeline {
    agent any

    environment {
        IMAGE_NAME = 'amanpep_project'
        CONTAINER_NAME = 'amanpep_container'
    }

    stages {
        

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Or pip install -r requirements.txt for Python, etc.
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'  // Replace with your test command, or comment out if none
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Docker Container') {
            steps {
                // Stop old container if running
                sh "docker stop $CONTAINER_NAME || true"
                sh "docker rm $CONTAINER_NAME || true"
                // Run new container
                sh "docker run -d -p 8080:80 --name $CONTAINER_NAME $IMAGE_NAME"
            }
        }
    }
}
