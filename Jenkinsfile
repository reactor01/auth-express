pipeline {
    agent any 
    stages {
        stage('Stage 1') {
            steps {
                echo 'This is stage 1'
                sh 'rm -fr html'
                sh 'git clone https://github.com/dmccuk/html.git'
            }
        }
        stage('Stage 2') {
            steps {
                echo 'This is stage 2'
            }
        }
        stage('Stage 3') {
            steps {
                echo 'This is stage 3'
            }
        }
    }
}