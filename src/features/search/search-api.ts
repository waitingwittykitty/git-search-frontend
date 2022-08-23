import { Octokit } from 'octokit';
import type { Fork } from './search-reducer';

const octokit = new Octokit();

interface SearchForksParams {
  owner: string;
  repo: string;
  page: number;
  perPage: number;
}

export async function searchForks({
  owner,
  repo,
  page,
  perPage,
}: SearchForksParams): Promise<Fork[]> {
  const forks = await octokit.rest.repos.listForks({
    owner,
    repo,
    per_page: perPage,
    page,
  });

  return forks.data.map(fork => ({
    id: fork.id,
    name: fork.full_name,
    owner: fork.owner.login,
    stars: fork.stargazers_count ?? 0,
    link: fork.clone_url ?? '',
  }));
}
