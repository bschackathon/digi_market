pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        sh '''helm ls
export KUBECONFIG=./kubeconfig
'''
      }
    }

  }
}