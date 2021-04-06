pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''export KUBECONFIG=~/.kube/config 
kubectl get all'''
      }
    }

  }
}