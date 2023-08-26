pipeline {
    agent any

    stages {
        stage('Cleanup Containers') {
            steps {
                script {
                    // Stop and remove all containers except the last one
                    sh 'docker ps -q | head -n -1 | xargs -r docker stop'
                    sh 'docker ps -q -a | head -n -1 | xargs -r docker rm'
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
}

Here's what the new stage does:

    stage('Cleanup Containers'): This stage is responsible for stopping and removing all containers except the last one that you want to keep.

    steps within "Cleanup Containers":
        sh 'docker ps -q | head -n -1 | xargs -r docker stop': This command retrieves the IDs of all running containers, skips the last one using head -n -1, and then stops the remaining containers using docker stop.
        sh 'docker ps -q -a | head -n -1 | xargs -r docker rm': Similarly, this command removes all containers, including stopped ones, except the last one using the same approach.

The second stage, "Run Docker Container," remains unchanged and is responsible for running the new Docker container.

Please ensure you thoroughly test this pipeline in your environment, as dealing with containers in a CI/CD context can be sensitive. It's important to handle error cases and edge conditions properly to ensure the stability and reliability of your pipeline.
