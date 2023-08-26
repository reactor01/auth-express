pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                script {
                   // Clone the Git repository using SSH URL
                   git branch: 'main', url: 'https://github.com/reactor01/auth-express.git'
                }
            }
        }
        
        stage('Cleanup and Run Docker Container') {
            steps {
                script {
                    // Stop and remove all containers
                    sh 'docker stop $(docker ps -aq)'
                    sh 'docker rm $(docker ps -aq)'
                    
                    // Run the Docker container
                    sh 'docker run -d -p 3000:3000 auth-express'
                }
            }
        }
    }
}
