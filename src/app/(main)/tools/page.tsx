import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, PieChart, Home } from "lucide-react";
import type { Tool } from "@/lib/types";

const tools: Tool[] = [
  {
    id: "budget-analyzer",
    title: "Analyseur de Budget Mensuel",
    description: "Analysez vos revenus et dépenses pour découvrir votre capacité d'épargne et d'investissement mensuelle.",
    href: "/tools/budget-analyzer",
    icon: PieChart,
    badge: "Nouveau"
  },
  {
    id: "compound-interest-simulator",
    title: "Simulateur d'Intérêts Composés",
    description: "Visualisez la puissance des intérêts composés et voyez comment votre capital peut fructifier avec le temps.",
    href: "/tools/compound-interest-simulator",
    icon: Calculator,
  },
   {
    id: "dividend-yield-calculator",
    title: "Calculateur de Rendement de Dividende",
    description: "Calculez le rendement de vos actions à dividendes et estimez vos revenus annuels.",
    href: "/tools/dividend-yield-calculator",
    icon: Calculator,
  },
  {
    id: "mortgage-calculator",
    title: "Calculateur de Crédit Immobilier",
    description: "Estimez vos mensualités, le coût total des intérêts et visualisez votre plan d'amortissement.",
    href: "/tools/mortgage-calculator",
    icon: Home,
  },
];

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Outils Financiers</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Des calculateurs et simulateurs pour vous aider à prendre des décisions d'investissement éclairées et à planifier votre avenir financier.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.id} className="group">
            <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <tool.icon className="h-8 w-8 text-primary" />
                    </div>
                   {tool.badge && <Badge variant="secondary">{tool.badge}</Badge>}
                </div>
                <CardTitle className="font-headline text-2xl pt-4">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <div className="flex-grow" />
              <div className="p-6 pt-0 mt-auto">
                 <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                    Utiliser l'outil <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
