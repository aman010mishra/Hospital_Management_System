pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/aman010mishra/mern_stack_project.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Project') {
      steps {
        sh 'npm run build || echo "No build step defined"'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t yourusername/yourapp:latest .'
      }
    }

    stage('Docker Push (Optional)') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push yourusername/yourapp:latest
          '''
        }
      }
    }

    // Optional: Deploy to Heroku, EC2, etc.
  }
}
