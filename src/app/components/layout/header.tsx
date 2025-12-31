"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scaling, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";
import { useUser } from "@/firebase";
import { UserNav } from "@/app/components/auth/user-nav";

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/articles", label: "Articles" },
  { href: "/courses", label: "Cours" },
  { href: "/tools", label: "Outils" },
  { href: "/resources", label: "Ressources" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            (pathname.startsWith(link.href) && link.href !== "/") || pathname === link.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Scaling className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">The Moroccan Community</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2">
          {isUserLoading ? (
             <div className="h-10 w-28 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
                <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                    <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Tableau de bord
                    </Link>
                </Button>
                <UserNav />
            </>
          ) : (
            <div className="hidden md:flex gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Connexion</Link>
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
                  <Scaling className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold">The Moroccan Community</span>
                </Link>
                <NavLinks className="flex-col items-start space-y-4 text-lg" />
                 <div className="mt-8 flex flex-col space-y-2">
                    {user ? (
                        <Button asChild>
                            <Link href="/dashboard">Tableau de bord</Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/login">Connexion</Link>
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
