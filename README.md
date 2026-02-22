# GitHub Repo Finder

Helps developers and learners easily discover relevant open-source projects. It simplifies GitHub search by allowing natural queries, filters results by stars, activity, and language, and provides quick summaries so users can find quality repos to learn from or build upon.

## Deployment

The project is deployed on Vercel and can be accessed here: [https://github-repo-finder-rho.vercel.app/](https://github-repo-finder-rho.vercel.app/)

## Demo

### Search Query

![Search Query](./demo/search%20query.png)

### Result

![Result](./demo/result.png)

## Features

- **Natural Language Search:** Search for repositories using natural language queries.
- **Filter Results:** Filter repositories by stars, recent activity, and programming language.
- **Quick Summaries:** Get quick summaries of repositories to easily find what you're looking for.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/FiyinfoluwaDav/Github-repo-finder.git
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root directory and add your GitHub personal access token:
    ```
    GITHUB_TOKEN=your_token
    ```

### Running the Application

```sh
npm start
```

The application will be available at `http://localhost:3000`.

## Future Features

- **Folder Structure:** View the folder structure of a repository.
- **Sort by Stars:** Sort repositories by the number of stars.
- **Advanced Search:** Implement advanced search filters, such as filtering by license and number of forks.
- **User Authentication:** Allow users to log in with their GitHub account to save their favorite repositories.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the ISC License.
