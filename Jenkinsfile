pipeline {
    agent any
    
    stages {
        

       stage('Cleanup Docker Container') {
    when {
        expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
    }
    steps {
        script {
            def containerIds = sh(script: "docker ps -q --filter ancestor=auth-express", returnStdout: true).trim()
            if (containerIds) {
                sh "docker stop $containerIds"
                sh "docker rm $containerIds"
            }
        }
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
