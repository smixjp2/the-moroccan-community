import { FirebaseClientProvider } from "@/firebase";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
        {children}
    </FirebaseClientProvider>
  );
}
