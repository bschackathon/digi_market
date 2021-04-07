pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        kubeconfig(credentialsId: '1', caCertificate: '1', serverUrl: 'http://127.0.0.1:8443')
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}