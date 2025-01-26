import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

interface Question {
  id: number;
  text: string;
  options: string[];
  conditionalNext?: (answer: string) => number | undefined;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How do you want to invest your money?",
    options: ["SIP", "One Time"],
    conditionalNext: (answer) => answer === "SIP" ? 2 : 3,
  },
  {
    id: 2,
    text: "What is your preferred SIP frequency?",
    options: ["Monthly", "Quarterly", "Yearly"],
  },
  {
    id: 3,
    text: "How much amount do you want to invest?",
    options: ["₹5,000 - ₹10,000", "₹10,000 - ₹50,000", "₹50,000+"],
  },
  {
    id: 4,
    text: "How regular is your income?",
    options: ["Regular monthly income", "Irregular monthly income", "No monthly income"],
  },
  {
    id: 5,
    text: "What percentage of your annual income do you save?",
    options: ["Less than 10%", "Less than 20%", "Less than 30%", "Greater than or equal to 30%"],
  },
  {
    id: 6,
    text: "What is your investing experience in mutual funds and stocks?",
    options: [
      "Never invested",
      "Started less than 3 years back",
      "Investing from last 10 years to 3 years",
      "Investing for more than 10 years",
      "I have stopped investing"
    ],
  },
  {
    id: 7,
    text: "What portfolio strategy would you like to have?",
    options: [
      "Preserve principal amount even if post-tax growth is below inflation",
      "Preserve principal amount with post-tax growth at par with inflation",
      "Achieve moderate growth (8%-9%) with a risk of temporary 15%-20% loss",
      "Achieve high growth (10%-12%) with a risk of temporary 20%-30% loss",
      "Maximize growth with a risk of temporary 30%-60% loss"
    ],
  }
];

export default function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { setFinancialDetails } = useAuth();
  const [, setLocation] = useLocation();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    if (currentQuestion.conditionalNext) {
      const nextIndex = questions.findIndex(q => q.id === currentQuestion.conditionalNext!(answer)) - 1;
      if (nextIndex >= 0) {
        setCurrentQuestionIndex(nextIndex);
        return;
      }
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Convert answers to financial details
      const riskLevel = answers[7]?.includes("high growth") ? "High" : 
                       answers[7]?.includes("moderate") ? "Moderate" : "Low";
      
      setFinancialDetails({
        riskTolerance: riskLevel,
        investmentGoals: ["Growth", "Wealth Creation"],
        monthlyInvestment: 5000, // Default value, can be calculated based on answers
        investmentHorizon: "5-10 years"
      });
      
      setLocation('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Financial Profile Questionnaire</CardTitle>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {currentQuestionIndex > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="mt-4"
                >
                  Previous Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
