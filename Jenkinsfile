pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        withKubeConfig(serverUrl: 'https://192.168.49.2:8443', namespace: 'default', credentialsId: 'minikube', contextName: 'minikube', clusterName: 'minikube')
        sh 'helm ls'
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}