
import { Header } from "@/app/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We don't use the MainLayout footer here to have a cleaner dashboard view
  return (
      <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
      </div>
  );
}
