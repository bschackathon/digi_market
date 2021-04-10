pipeline {
  agent any
  stages {
    stage('build') {
      environment {
        DOCKERHUB_USER = 'saneevkumar761'
        DOCKERHUB_PASSWORD = 'Hdwj#10590'
      }
      steps {
        sh '''docker build --tag contractfactory-6:latest .
docker tag contractfactory-6:latest saneevkumar761/contractfactory-6:latest
docker login docker.io -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASSWORD}
docker push saneevkumar761/contractfactory-6:latest'''
      }
    }

  }
}