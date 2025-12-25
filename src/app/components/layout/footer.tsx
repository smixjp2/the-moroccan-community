import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scaling, Twitter, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
                <Scaling className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">MASI Insights</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your premier source for Moroccan market analysis and investment intelligence.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-headline font-semibold">Subscribe to our Weekly Newsletter</h3>
            <p className="text-muted-foreground text-sm">
                Get weekly market insights, promotional offers, and new service updates delivered to your inbox.
            </p>
            <form className="flex w-full max-w-md items-center space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit" variant="default">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MASI Insights. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
