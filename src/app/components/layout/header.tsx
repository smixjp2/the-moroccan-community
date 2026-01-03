
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";
import { useUser } from "@/firebase/provider";
import { UserNav } from "@/app/components/auth/user-nav";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

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
            </div>
          )}
          <MobileNav user={user} navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
