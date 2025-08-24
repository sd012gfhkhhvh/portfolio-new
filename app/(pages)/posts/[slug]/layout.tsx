export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <main className='prose lg:prose-lg dark:prose-invert prose-pre:bg-(--navbar-background)'>{children}</main>
}
