import SummarizerForm from "./summarizer-form";

export default function NewsSummarizerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">AI News Summarizer</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Generate concise summaries of Moroccan market news. Perfect for creating your weekly newsletter content.
        </p>
      </div>
      <SummarizerForm />
    </div>
  );
}
