pipeline {
  agent any
  stages {
    stage('build') {
      environment {
        DOCKERHUB_USER = 'saneevkumar761'
        DOCKERHUB_PASSWORD = 'Hdwj#10590'
        KUBECONFIG = './kubeconfig'
      }
      steps {
        sh '''kubecetl get all
kubectl apply -f contractfactory-k8s.yaml
kubectl port-forward deployment.apps/contractfactory --address 0.0.0.0 4000:4000'''
      }
    }

  }
}