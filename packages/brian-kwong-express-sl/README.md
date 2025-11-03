This package contains the source code for the backend API using Express.js and Serverless Framework hosted on AWS Lambda.

> [!NOTE]
> Endpoints are protected via CORS. Ensure that requests originate from the github.io domain. For local testing, use a tool like Postman or curl to simulate requests, or override the Origin header in the Express.js CORS configuration. DO NOT disable CORS in production.

## Setup

If you wish to run the backend locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Brian-Kwong/Brian-Kwong.github.io.git
```

2. Navigate to the backend package directory:

```bash
cd Brian-Kwong.github.io/packages/brian-kwong-express-sl
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

The server will be running at `http://localhost:3000`.

## Deployment

Changes are automatically deployed to AWS Lambda via GitHub Actions on push to the main branch.

You can manually deploy using the Serverless Framework:

> [!NOTE]
> Ensure you have the Serverless Framework installed and configured with your AWS credentials. By default, deployments target the `us-east-1` region.

```bash
npx serverless deploy
```
