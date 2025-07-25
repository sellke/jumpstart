import type { Post, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type UserWithPosts = User & {
  posts: Post[];
};

async function UsersPage() {
  const users: UserWithPosts[] = await prisma.user.findMany({
    include: {
      posts: {
        where: {
          published: true,
        },
      },
    },
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Users from Database</h1>
      {users.length === 0 ? (
        <p>No users found. Run `npm run db:seed` to add sample data.</p>
      ) : (
        <div>
          {users.map((user: UserWithPosts) => (
            <div
              key={user.id}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '4px',
              }}
            >
              <h3>{user.name || 'Unknown'}</h3>
              <p>Email: {user.email}</p>
              <p>Created: {user.createdAt.toLocaleDateString()}</p>
              {user.posts.length > 0 && (
                <div>
                  <h4>Published Posts:</h4>
                  <ul>
                    {user.posts.map((post: Post) => (
                      <li key={post.id}>{post.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
