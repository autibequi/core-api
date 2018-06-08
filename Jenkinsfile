pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy') {
            steps {
                sh './deploy.sh'
            }
        }
    }
}