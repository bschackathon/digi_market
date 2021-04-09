pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''git checkout contractfactory
docker build --tag contractfactory-5:latest .
'''
        sh '''export KUBECONFIG=./kubeconfig
kubectl get all'''
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}