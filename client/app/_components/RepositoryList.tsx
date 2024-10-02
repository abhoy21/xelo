import { RepositoryCard } from "./RepositoryCard";

type Repository = {
  id: number;
  name: string;
  language: string;
  createdAt: string;
};

type RepositoryListProps = {
  repositories: Repository[];
};

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      {repositories.length === 0 && (
        <div className='text-center text-gray-400 mt-8'>
          No repositories found matching your search.
        </div>
      )}
    </>
  );
}
