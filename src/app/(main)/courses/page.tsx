import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart } from "lucide-react";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courses: Course[] = [
  {
    id: "1",
    title: "How to Invest Your First Salary",
    description: "A beginner's guide to start your investment journey in Morocco. Learn the basics of stocks, bonds, and creating a balanced portfolio.",
    level: "Beginner",
    duration: "4 Weeks",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-1')?.imageHint || '',
  },
  {
    id: "2",
    title: "Advanced Stock Analysis & Valuation",
    description: "Master fundamental and technical analysis to value Moroccan stocks. This course is for those looking to deepen their analytical skills.",
    level: "Advanced",
    duration: "8 Weeks",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-2')?.imageHint || '',
  },
];

export default function CoursesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Invest with Confidence</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Our courses are designed to equip you with the knowledge and skills to navigate the Moroccan investment landscape successfully.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                    <Image
                        src={course.imageUrl}
                        alt={course.title}
                        data-ai-hint={course.imageHint}
                        width={600}
                        height={400}
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
                <CardTitle className="font-headline text-2xl mb-2">{course.title}</CardTitle>
                <CardDescription className="mb-4 flex-1">{course.description}</CardDescription>
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                    </div>
                </div>
                <Button asChild className="w-full font-bold">
                    <Link href="#">Learn More</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
