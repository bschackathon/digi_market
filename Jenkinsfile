pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''export KUBECONFIG=./kubeconfig
kubectl get all'''
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}