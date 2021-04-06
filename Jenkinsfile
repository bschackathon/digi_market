pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''export KUBECONFIG=/home/sanjeevkumar761/.kube/config
kubectl get all'''
      }
    }

  }
}