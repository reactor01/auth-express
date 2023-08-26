pipeline {
    agent any

    stages {        
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
        }
    }
}
