import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Newspaper, Wrench, GraduationCap } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const featureImages = {
  articles: PlaceHolderImages.find(p => p.id === 'feature-articles'),
  tools: PlaceHolderImages.find(p => p.id === 'feature-tools'),
  courses: PlaceHolderImages.find(p => p.id === 'feature-courses'),
}

const features = [
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: "In-Depth Articles",
    description: "Explore expert analysis of the Moroccan stock market, sector trends, and MASI index performance.",
    link: "/articles",
    image: featureImages.articles,
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Powerful Simulators",
    description: "Compare banks, brokers, and simulate fee impacts on your investments with our AI-powered tools.",
    link: "/tools",
    image: featureImages.tools,
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Investment Courses",
    description: "From your first salary to advanced strategies, our courses empower you to invest with confidence.",
    link: "/courses",
    image: featureImages.courses,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-md">
              Unlock Moroccan Market Potential
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
              Your source for expert analysis, powerful tools, and educational resources for investing in Morocco.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/articles">Explore Analysis <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/tools">Use Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Intelligence for Every Investor</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Whether you're a beginner or a seasoned pro, MASI Insights provides the clarity you need to navigate the Moroccan market.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  {feature.image && (
                     <div className="aspect-video overflow-hidden">
                        <Image
                            src={feature.image.imageUrl}
                            alt={feature.image.description}
                            data-ai-hint={feature.image.imageHint}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                    <Button asChild variant="link" className="px-0 mt-4 font-bold">
                        <Link href={feature.link}>{feature.title.split(' ')[1]} Now <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Stay Ahead of the Market</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Subscribe to our free weekly newsletter for the latest market news, analysis, and exclusive offers.
                </p>
            </div>
            <form className="flex w-full max-w-md items-center space-x-2 mx-auto">
              <Input type="email" placeholder="Your best email address" className="flex-1 py-6" />
              <Button type="submit" size="lg">Subscribe</Button>
            </form>
        </div>
      </section>
    </>
  );
}
