pipeline {
  agent any
  stages {
    stage('build') {
      environment {
        DOCKERHUB_USER = 'saneevkumar761'
        DOCKERHUB_PASSWORD = 'Hdwj#10590'
      }
      steps {
        sh 'docker build --tag contractfactory-5:latest .'
      }
    }

  }
}