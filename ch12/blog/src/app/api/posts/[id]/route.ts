import data from "./data.json";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const post = data.posts.find((post) => post.id === parseInt(id));
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(JSON.stringify(post));
}
