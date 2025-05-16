

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("AuthLayout");
  return <>{children}</>;
}
