pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''ls -la
export KUBECONFIG=./kubeconfig
kubectl get all'''
      }
    }

  }
}