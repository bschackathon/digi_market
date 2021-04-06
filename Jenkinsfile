pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        kubernetesDeploy()
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}