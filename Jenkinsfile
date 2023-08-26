pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Clone the public Git repository
                    sh 'git clone https://github.com/username/repo.git'
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
