pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''export KUBECONFIG=./kubeconfig
kubectl get all'''
        sh '''docker build --tag contractfactory-5:latest .
'''
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}