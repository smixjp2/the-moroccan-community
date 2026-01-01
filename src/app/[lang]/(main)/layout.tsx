import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={params.lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={params.lang} />
    </div>
  );
}
