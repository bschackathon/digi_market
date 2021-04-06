pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        kubeconfig(credentialsId: '1', serverUrl: 'http://test', caCertificate: '1')
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}