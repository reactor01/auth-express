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
                // Split container IDs into an array
                def containerIdArray = containerIds.split('\n')

                // Get the ID of the last built container
                def lastContainerId = sh(script: "docker ps -aq --filter ancestor=auth-express --format '{{.ID}}' -n 1", returnStdout: true).trim()

                // Remove the last container ID from the array
                containerIdArray = containerIdArray.findAll { it != lastContainerId }

                // Stop and remove each container individually
                containerIdArray.each { containerId ->
                    sh "docker stop $containerId"
                    sh "docker rm $containerId"
                }
            }
        }
    }
}
}
