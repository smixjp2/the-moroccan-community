
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";
import { useUser } from "@/firebase/provider";
import { UserNav } from "@/app/components/auth/user-nav";

const navLinks: Omit<NavLink, "href">[] = [
  { label: "Accueil", path: "/" },
  { label: "Articles", path: "/articles" },
  { label: "Cours", path: "/courses" },
  { label: "Outils", path: "/tools" },
  { label: "Ressources", path: "/resources" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => {
        const href = link.path;
        const isActive = (href === "/" && pathname === href) || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center">
          <Image src="/logo.svg" alt="The Moroccan Community Logo" width={200} height={40} priority />
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2">
          {isUserLoading ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <UserNav />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Inscription</Link>
              </Button>
            </div>
          )}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu de navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center gap-2 mb-6">
                  <Image src="/logo.svg" alt="The Moroccan Community Logo" width={200} height={40} />
                </Link>
                <NavLinks className="flex-col items-start space-y-4 text-lg" />
                <div className="mt-8 flex flex-col gap-4">
                  {user ? (
                      <Button asChild>
                         <Link href="/dashboard">Tableau de Bord</Link>
                      </Button>
                  ) : (
                    <>
                       <Button variant="outline" asChild>
                          <Link href="/login">Connexion</Link>
                       </Button>
                       <Button asChild>
                          <Link href="/signup">Inscription</Link>
                       </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
