import { Octokit } from 'octokit';
import type { Fork } from './search-reducer';

const octokit = new Octokit();

export interface SearchForksParams {
  owner: string;
  repo: string;
  page: number;
  perPage: number;
}

export interface FetchForksCountParams {
  owner: string;
  repo: string;
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
    name: fork.name,
    owner: fork.owner.login,
    stars: fork.stargazers_count ?? 0,
    link: fork.clone_url ?? '',
  }));
}

export async function fetchForksCount({
  owner,
  repo,
}: FetchForksCountParams): Promise<number> {
  const {
    data: { forks_count: forksCount },
  } = await octokit.rest.repos.get({
    owner,
    repo,
  });

  let pageCount = Math.ceil(forksCount / 100);
  let forks = await octokit.rest.repos.listForks({
    owner,
    repo,
    per_page: 100,
    page: pageCount,
  });

  while (pageCount > 0 && forks.data.length === 0) {
    pageCount--;
    forks = await octokit.rest.repos.listForks({
      owner,
      repo,
      per_page: 100,
      page: pageCount,
    });
  }

  return pageCount && (pageCount - 1) * 100 + forks.data.length;
}
