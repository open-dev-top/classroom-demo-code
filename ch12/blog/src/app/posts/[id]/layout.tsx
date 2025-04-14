export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-2xl font-bold text-blue-500">Posts</h1>
      {children}
    </div>
  );
}