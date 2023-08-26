pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Pull the Docker image (if needed)
                    sh 'docker build -t auth-express .'
                }
            }
        }
        
        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    sh 'docker run -d -p 3000:3000 auth-express'
                }
            }
        }
    }

    post {
        always {
            // Stop and remove all containers except those based on auth-express
            script {
                def containerIds = sh(script: "docker ps -aq --filter ancestor=auth-express", returnStdout: true).trim()
                if (containerIds) {
                    sh "docker stop $containerIds"
                    sh "docker rm $containerIds"
                }
            }
            // Remove all images except auth-express
            script {
                def imageIds = sh(script: "docker images -q --format '{{.Repository}}:{{.Tag}}' | grep -v 'auth-express'", returnStdout: true).trim()
                if (imageIds) {
                    sh "docker rmi $imageIds"
                }
            }
        }
    }
}
