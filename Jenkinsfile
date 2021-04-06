pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''kubectl config set-cluster minikube --server=https://127.0.0.1:8443 --insecure-skip-tls-verify=true
kubectl config set-context minikube --cluster=minikube
kubectl get all'''
      }
    }

  }
}