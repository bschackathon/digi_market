pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        kubeconfig(credentialsId: '1', serverUrl: '1', caCertificate: '1')
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}