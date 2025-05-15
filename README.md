# neurons-case-study

## Overview
This is a Node.js TypeScript project that can take a URL containing an HTML5 banner and generate an MP4 video of the banner.

This repo is build as a case study for the Head of Engineering position at Neurons.

## Prerequisites
- Node.js and npm installed on your machine
- Docker installed on your machine

## Building the Project

To build the project locally, follow these steps:

1. **Install Dependencies**

   Open a terminal and navigate to the project directory. Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

2. **Build the TypeScript Code**

   Compile the TypeScript code into JavaScript using the following command:

   ```bash
   npm run build
   ```

   This will generate the compiled JavaScript files in the `dist` directory.

## Running Tests

To run tests for the project, use the following command:

```bash
npm test
```

This command will execute the test suite using Jest.

## Building and Running with Docker

To build and run the Docker image for this project, follow these steps:

1. **Build the Docker Image**

   Open a terminal and navigate to the project directory. Run the following command to build the Docker image:

   ```bash
   docker build -t neurons-case-study .
   ```

2. **Run the Docker Container**

   Once the image is built, you can run it using the following command:

   ```bash
   docker run -p 3000:3000 neurons-case-study
   ```

   This command maps port 3000 of the container to port 3000 on your host machine.

3. **Access the Application**

   Open your web browser and navigate to `http://localhost:3000` to access the application.

## Additional Information

- Ensure that your application is configured to listen on port 3000.
- You may need to modify the Dockerfile to suit your project's specific requirements.
