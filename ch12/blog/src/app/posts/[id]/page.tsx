async function getPost(id: string) {
  const res = await fetch(`http://localhost:3002/api/posts/${id}`);
  return res.json();
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  console.log('id', id);
  const post = await getPost(id);
  console.log('post', post);
  return <div id="1">
    <h1>{post.title}</h1>
    <p>{process.env.NEXT_PUBLIC_API_KEY}</p>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  </div>;
}
