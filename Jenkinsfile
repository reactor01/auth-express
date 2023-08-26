pipeline {
    agent any
    
    stages {
        

        stage('Cleanup Docker Container') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                // Stop and remove the Docker container
                sh 'docker stop $(docker ps -q --filter ancestor=auth-express)'
                sh 'docker rm $(docker ps -aq --filter ancestor=auth-express)'
            }
        }
        stage('Run Docker Container') {
            steps {
                // Pull the Docker image (if needed)
                sh 'docker build -t auth-express .'

                // Run the Docker container
                sh 'docker run -d -p 3000:3000 auth-express'
            }
        }
        
        // Add more stages as needed
    }
}
