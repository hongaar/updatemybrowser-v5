import { client } from "@/utils/sanity";

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
};

export async function Home() {
  const posts = await client.fetch<Post[]>(`*[_type == "browser"]`);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={post?.slug.current}>{post?.title}</a>
        </li>
      ))}
    </ul>
  );
}
