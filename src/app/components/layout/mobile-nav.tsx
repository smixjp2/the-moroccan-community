
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";
import type { User } from "firebase/auth";

interface MobileNavProps {
    user: User | null;
    navLinks: Omit<NavLink, "href">[];
}

export function MobileNav({ user, navLinks }: MobileNavProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const NavLinks = ({ className }: { className?: string }) => (
        <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
        {navLinks.map((link) => {
            const href = link.path;
            return (
            <Link
                key={href}
                href={href}
                className={cn(
                "text-lg font-medium transition-colors hover:text-primary"
                )}
            >
                {link.label}
            </Link>
            )
        })}
        </nav>
    );

    if (!isMounted) {
        return (
             <div className="flex md:hidden">
                <Button variant="ghost" size="icon" disabled>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu de navigation</span>
                </Button>
            </div>
        )
    }

    return (
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
                  <Image src="/logo.svg" alt="The Moroccan Community Logo" width={200} height={25} />
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
    )
}

