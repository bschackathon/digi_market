pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        script {
          node {
            stage('Apply Kubernetes files') {
              withKubeConfig([credentialsId: 'user1', serverUrl: 'https://api.k8s.my-company.com']) {
                sh 'kubectl apply -f my-kubernetes-directory'
              }
            }
          }
        }

        sh 'helm ls'
      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}