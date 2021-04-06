pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh 'helm ls'
        withKubeConfig(serverUrl: 'https://192.168.49.2:8443', namespace: 'default', credentialsId: 'minikube', contextName: 'minikube', clusterName: 'minikube')
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}