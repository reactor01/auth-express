pipeline {
    agent any
    
    stages {
        stage('Run Docker Container') {
            steps {
                // Run the Docker container
                sh 'docker run -d -p 3000:3000 auth-express'
            }
        }
        
        // Add more stages as needed
    }
}
