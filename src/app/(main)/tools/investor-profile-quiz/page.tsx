
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Shield, BarChart, TrendingUp, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    question: "Quel est votre principal objectif en investissant à la Bourse de Casablanca ?",
    options: [
      { text: "Préserver mon capital avant tout, quitte à avoir un rendement faible.", points: 1 },
      { text: "Obtenir un rendement supérieur aux placements sans risque, avec une prise de risque modérée.", points: 2 },
      { text: "Maximiser la croissance de mon capital sur le long terme, même si cela implique une forte volatilité.", points: 3 },
    ],
  },
  {
    question: "Pour combien de temps prévoyez-vous d'investir cet argent ?",
    options: [
      { text: "Moins de 3 ans.", points: 1 },
      { text: "Entre 3 et 7 ans.", points: 2 },
      { text: "Plus de 7 ans.", points: 3 },
    ],
  },
  {
    question: "Face à une baisse de 15% de votre portefeuille en un mois, quelle serait votre réaction la plus probable ?",
    options: [
      { text: "Je vends une partie pour limiter les pertes et sécuriser le reste.", points: 1 },
      { text: "Je ne fais rien et j'attends que le marché se stabilise.", points: 2 },
      { text: "C'est une opportunité, j'envisage d'investir davantage si les fondamentaux des entreprises sont bons.", points: 3 },
    ],
  },
  {
    question: "Quelle est votre expérience des marchés financiers marocains ?",
    options: [
      { text: "Débutant, je découvre le fonctionnement de la bourse, des actions et des OPCVM.", points: 1 },
      { text: "Intermédiaire, je connais les bases et j'ai déjà réalisé quelques investissements.", points: 2 },
      { text: "Confirmé, je suis à l'aise avec l'analyse d'actions et les différentes stratégies.", points: 3 },
    ],
  },
   {
    question: "Quelle part de vos revenus mensuels êtes-vous prêt à investir ?",
    options: [
      { text: "Moins de 10%.", points: 1 },
      { text: "Entre 10% et 25%.", points: 2 },
      { text: "Plus de 25%.", points: 3 },
    ],
  },
];

const profiles = {
  prudent: {
    title: "Profil Prudent",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "Votre priorité absolue est la sécurité de votre capital. Vous préférez des rendements stables et prévisibles, comme ceux des placements obligataires, et vous tolérez mal la volatilité du marché actions.",
    recommendations: [
        "Placements majoritairement défensifs : OPCVM Monétaires, Obligataires à court terme.",
        "Une petite partie (10-20%) peut être allouée à des actions de grandes entreprises marocaines très stables versant des dividendes réguliers (dites 'valeurs de rendement').",
        "Exemples d'actions : Maroc Telecom, Marsa Maroc (pour leur profil défensif et leurs dividendes).",
    ],
  },
  equilibre: {
    title: "Profil Équilibré",
    icon: BarChart,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    description: "Vous recherchez un bon compromis entre la performance et le risque. Vous êtes prêt à accepter une certaine volatilité pour obtenir un rendement supérieur à celui des placements sans risque, en diversifiant vos actifs.",
    recommendations: [
      "Un portefeuille diversifié : environ 50-60% en actions et 40-50% en obligations via des OPCVM.",
      "Investissement dans des actions de croissance solides (leaders de leur secteur) et des valeurs de rendement.",
      "Exposition aux principaux secteurs de la cote : Banques, BTP, Industries.",
      "Utilisation d'OPCVM Diversifiés ou Actions pour une gestion simplifiée."
    ],
  },
  dynamique: {
    title: "Profil Dynamique",
    icon: TrendingUp,
    color: "text-red-600",
    bgColor: "bg-red-100",
    description: "Votre objectif principal est de maximiser la performance de votre portefeuille sur le long terme. Vous comprenez que cela implique une prise de risque plus importante et une plus grande volatilité à court terme.",
    recommendations: [
      "Portefeuille majoritairement investi en actions (plus de 75%).",
      "Exposition à des entreprises de taille moyenne ou des secteurs en forte croissance (technologie, énergies renouvelables).",
      "Recherche d'opportunités de plus-value sur des 'valeurs de croissance' comme HPS ou des 'valeurs de retournement'.",
      "La connaissance de l'analyse fondamentale est un atout majeur pour ce profil.",
    ],
  },
};

export default function InvestorProfileQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<keyof typeof profiles | null>(null);

  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = points;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    const totalPoints = finalAnswers.reduce((sum, a) => sum + a, 0);
    if (totalPoints <= 7) {
      setResult('prudent');
    } else if (totalPoints <= 12) {
      setResult('equilibre');
    } else {
      setResult('dynamique');
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };
  
  const ProfileIcon = result ? profiles[result].icon : null;


  return (
    <div className="container py-12 md:py-16">
       <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Découvrez Votre Profil d'Investisseur</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Un court questionnaire pour vous aider à mieux comprendre votre tolérance au risque et à définir une stratégie d'investissement qui vous correspond sur la Bourse de Casablanca.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        {!result ? (
            <>
                <CardHeader>
                    <Progress value={progress} className="mb-4" />
                    <CardTitle className="text-xl md:text-2xl">Question {currentQuestion + 1}/{questions.length}</CardTitle>
                    <CardDescription>{questions[currentQuestion].question}</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        key={currentQuestion}
                        onValueChange={(value) => handleAnswer(Number(value))}
                    >
                        {questions[currentQuestion].options.map((option, index) => (
                        <Label
                            key={index}
                            htmlFor={`option-${index}`}
                            className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary transition-colors"
                        >
                            <RadioGroupItem value={String(option.points)} id={`option-${index}`} />
                            <span>{option.text}</span>
                        </Label>
                        ))}
                    </RadioGroup>
                </CardContent>
            </>
        ) : (
             <CardContent className="pt-6">
                <div className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${profiles[result].bgColor}`}>
                        {ProfileIcon && <ProfileIcon className={`w-8 h-8 ${profiles[result].color}`} />}
                    </div>
                    <h2 className={`font-headline text-3xl font-bold mt-4 ${profiles[result].color}`}>{profiles[result].title}</h2>
                    <p className="mt-2 text-muted-foreground">{profiles[result].description}</p>
                </div>
                <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-4">Stratégies et types d'investissements adaptés :</h3>
                    <ul className="space-y-3">
                        {profiles[result].recommendations.map((rec, i) => (
                             <li key={i} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8 text-center">
                     <p className="text-xs text-muted-foreground mb-4">Ceci est une recommandation générale. Il est conseillé d'approfondir vos recherches et/ou de consulter un professionnel.</p>
                     <Button onClick={resetQuiz}>Refaire le quiz</Button>
                </div>
             </CardContent>
        )}
      </Card>
    </div>
  );
}
