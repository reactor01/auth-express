pipeline {
    agent any
    
    stages {
        stage('Run Docker Container') {
            steps {
                // Run the Docker container using the local image
                sh 'docker run -d -p 3000:3000 eb0c268223bf'
            }
        }

        stage('Cleanup Docker Container') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                // Stop and remove the Docker container
                sh 'docker stop $(docker ps -q --filter ancestor=eb0c268223bf)'
                sh 'docker rm $(docker ps -aq --filter ancestor=eb0c268223bf)'
            }
        }
        
        // Add more stages as needed
    }
}
