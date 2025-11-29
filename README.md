# GitHub Repo Finder

**GitHub Repo Finder** helps developers and learners easily discover relevant open-source projects. It simplifies GitHub search by allowing natural queries, filters results by stars, activity, and language, and provides quick summaries so users can find quality repos to learn from or build upon.

## Deployment

This project can be deployed to [Vercel](https://vercel.com) for free. Here are the steps:

### 1. Prepare your Project for Deployment

Your project is already well-configured for deployment. The `package.json` file has a `start` script (`"start": "node app.js"`), which is what Vercel will use to run your application. A `vercel.json` file is also included to ensure that Vercel handles your project correctly.

### 2. Push your Project to a GitHub Repository

Vercel works by connecting to your GitHub account and deploying your repositories. Make sure all your latest changes are pushed to a GitHub repository.

### 3. Sign up for Vercel

*   Go to [vercel.com](https://vercel.com) and sign up for a new account. You can use your GitHub account to sign up, which makes the process easier.

### 4. Create a New Project on Vercel

*   Once you're logged in to your Vercel dashboard, click on the "**Add New...**" button and select "**Project**".
*   Vercel will ask you to import a Git repository. Find your `Github-repo-finder` repository and click the "**Import**" button.

### 5. Configure your Project

*   Vercel will use the `vercel.json` file to configure the project, so you shouldn't need to change anything in the "Build and Output Settings".
*   **Environment Variables:** This is the most important step. Your application needs the `GITHUB_TOKEN` and `GEMINI_API_KEY` to work. You need to add these as environment variables in your Vercel project settings.
    *   Go to the "**Settings**" tab of your project on Vercel.
    *   Click on "**Environment Variables**".
    *   Add two variables:
        *   `GITHUB_TOKEN` with the value of your GitHub token.
        *   `GEMINI_API_KEY` with the value of your Gemini API key.

### 6. Deploy

*   After configuring the environment variables, go to the "**Deployments**" tab and click the "**Deploy**" button on the latest commit.
*   Vercel will start the deployment process. You can see the logs in real-time.
*   Once the deployment is complete, Vercel will give you a URL where your application is live (e.g., `your-project-name.vercel.app`).

## Yes, you can deploy this for free!

Vercel's free "Hobby" plan is perfect for this type of project. It's designed for personal, non-commercial projects and includes free hosting for Node.js applications like this one. Vercel cleverly runs your Express application as a Serverless Function, which fits within their free tier limits. For an application like this that fetches data from APIs, the execution time and usage limits of the free plan are more than enough.