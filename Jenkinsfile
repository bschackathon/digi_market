pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''kubectl config set-cluster minikube --server=https://127.0.0.1:8443 --insecure-skip-tls-verify=true
kubectl config set-context minikube --cluster=minikube --user=sanjeevkumar761
kubectl config use-context docker --password tcuser
kubectl get all'''
      }
    }

  }
}