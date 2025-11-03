import dotenv from "dotenv";
import fs from "fs/promises";
dotenv.config();

type GithubRepoResponse = {
  id: number;
  repoName: string;
  owner: string;
  htmlUrl: string;
  description: string;
  languages: string[];
  collaborators: string[];
  readmeContent: string;
  createdAt: string;
  updatedAt: string;
};

const getRepoList = async (): Promise<GithubRepoResponse[]> => {
  const response = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Error fetching repositories: ${response.statusText}`);
  }
  let repos = await response.json();
  repos = repos.filter((repo: any) => !repo.private);

  // Get the languages for each repository
  repos = await Promise.all(
    repos.map(async (repo: any) => {
      let languages: string[] = [];
      try {
        const languagesResponse = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/json",
          },
        });
        const languagesData = await languagesResponse.json();
        languages = Object.keys(languagesData);
      } catch (error) {
        console.warn(`Error fetching languages for repo ${repo.name}:`, error);
        languages = [];
      }

      return {
        id: repo.id,
        repoName: repo.name,
        owner: repo.owner.login,
        htmlUrl: repo.html_url,
        description: repo.description,
        languages,
        collaborators: [], // Placeholder for collaborators
        readmeContent: "", // Placeholder for README content
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
      };
    }),
  );

  // Fetch collaborators for each repository
  repos = Array.from(await Promise.all(
    repos.map(async (repo: any) => {
      let collaborators: string[] = [];

      try {
        const collaboratorsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner}/${repo.repoName}/collaborators`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: "application/json",
            },
          },
        );
        const collaboratorsData = await collaboratorsResponse.json();
        collaborators = collaboratorsData.map((collab: any) => collab.login);
      } catch (error) {
        console.warn(
          `Error fetching collaborators for repo ${repo.repoName}:`,
          error,
        );
        collaborators = [];
      }

      return {
        ...repo,
        collaborators,
      };
    }),
  ));

  // Fetch README content for each repository
  repos = Array.from(await Promise.all(
    repos.map(async (repo: any) => {
      let readmeContent = "";

      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/${repo.owner}/${repo.repoName}/readme`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3.raw",
            },
          },
        );
        if (readmeResponse.ok) {
          readmeContent = await readmeResponse.text();
        }
      } catch (error) {
        console.warn(`Error fetching README for repo ${repo.repoName}:`, error);
        readmeContent = "";
      }

      return {
        ...repo,
        readmeContent,
      };
    }),
  ));

  return repos;
};

getRepoList()
  .then((repos) => {
    fs.writeFile(
      "github.json",
      JSON.stringify(repos, null, 2),
    );
    console.log("GitHub repository data written to github.json");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
