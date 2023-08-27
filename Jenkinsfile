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
                    try {
                        sh 'docker stop $(docker ps -aq)'
                        sh 'docker rm $(docker ps -aq)'
                        sh 'docker build -t auth-express .'
                        sh 'docker run -d -p 3000:3000 --env-file .env auth-express'
                    } catch (Exception e) {
                        echo "Docker command failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
