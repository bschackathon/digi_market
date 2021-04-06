pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'test'
        withKubeConfig(serverUrl: 'https://192.168.49.2:8443', namespace: 'default', credentialsId: 'minikube', contextName: 'minikube', clusterName: 'minikube')
        sh 'helm ls'
        script {
          node {
            stage('Apply Kubernetes files') {
              withKubeConfig([credentialsId: 'user1', serverUrl: 'https://api.k8s.my-company.com']) {
                sh 'kubectl apply -f my-kubernetes-directory'
              }
            }
          }
        }

      }
    }

  }
  environment {
    KUBECONFIG = './kubeconfig'
  }
}