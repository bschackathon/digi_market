pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''helm install --name my-release stable/jenkins
export KUBECONFIG=./kubeconfig
kubectl get all'''
      }
    }

  }
}