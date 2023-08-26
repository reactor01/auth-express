pipeline {
    agent {
        label 'docker' // Use a suitable label based on your agent configuration
    }

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
            // Cleanup Docker Container and Image
            script {
                def containerIds = sh(script: "docker ps -q --filter ancestor=auth-express", returnStdout: true).trim()
                if (containerIds) {
                    sh "docker stop $containerIds"
                    sh "docker rm $containerIds"
                }
                sh "docker rmi auth-express"
            }
        }
    }
}
