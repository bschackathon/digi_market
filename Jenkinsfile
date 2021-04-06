pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        kubernetesDeploy(kubeConfig: './kubeconfig')
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}