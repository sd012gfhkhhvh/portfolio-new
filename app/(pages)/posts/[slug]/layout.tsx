export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <main className='prose dark:prose-invert'>{children}</main>
}
