import { Octokit } from 'octokit';
import type { Fork } from './search-reducer';

const octokit = new Octokit();

export interface SearchForksParams {
  owner: string;
  repo: string;
}

export interface FetchForksCountParams {
  owner: string;
  repo: string;
}

export async function searchForks({ owner, repo }: SearchForksParams): Promise<Fork[]> {
  const forks = await octokit.paginate(octokit.rest.repos.listForks, {
    owner,
    repo,
  });

  return forks.map(fork => ({
    id: fork.id,
    name: fork.name,
    owner: fork.owner.login,
    stars: fork.stargazers_count ?? 0,
    link: fork.clone_url ?? '',
  }));
}
