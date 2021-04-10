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
        sh '''docker build --tag contractfactory-7:latest .
docker tag contractfactory-7:latest saneevkumar761/contractfactory-7:latest
docker login docker.io -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASSWORD}
docker push saneevkumar761/contractfactory-7:latest
kubectl get all
#kubectl create secret generic my-secret --from-file=./secrets/secret.json
kubectl apply -f contractfactory-k8s.yaml
sleep 60
kubectl port-forward deployment.apps/contractfactory --address 0.0.0.0 4000:4000'''
      }
    }

  }
}