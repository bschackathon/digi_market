pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'docker build --tag contractfactory-5:latest .'
      }
    }

  }
}