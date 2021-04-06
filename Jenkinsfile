pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''ls -la
export KUBECONFIG=/home/sanjeevkumar761/.kube/config
kubectl get all'''
      }
    }

  }
}