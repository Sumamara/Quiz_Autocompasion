
import { questions } from "./quizData";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";


interface QuizQuestionProps {
    question: string;
    onAnswer: (score: number) => void;
    onBack: () => void;
    currentGlobalIndex: number;
    totalQuestions: number;
    selectedValue?: number;
}

const options = [
    { value: 1, label: "Casi nunca (3%)" },
    { value: 2, label: "Raramente (20%)" },
    { value: 3, label: "A veces (40%)" },
    { value: 4, label: "Frecuentemente (60%)" },
    { value: 5, label: "Casi siempre (80%)" },
    { value: 6, label: "Siempre (97%)" },
];

const QuizQuestion = ({
    question,
    onAnswer,
    onBack,
    currentGlobalIndex,
    totalQuestions,
    selectedValue
}: QuizQuestionProps) => {
    const [selectedLocal, setSelectedLocal] = useState<number | null>(selectedValue ?? null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Sync local selection when navigating (handles Back button persistence)
    useEffect(() => {
        setSelectedLocal(selectedValue ?? null);
        setIsAnimating(false);
    }, [currentGlobalIndex, selectedValue]);

    const handleOptionClick = (value: number) => {
        if (isAnimating) return; // Prevent double clicks
        setSelectedLocal(value);
        setIsAnimating(true);

        // Short delay to show the "win" animation before advancing
        setTimeout(() => {
            onAnswer(value);
        }, 500);
    };

    return (
        <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-300 space-y-8 text-center relative">
            {/* Progress */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    <button
                        onClick={onBack}
                        className="flex items-center hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentGlobalIndex === 0}
                    >
                        <ArrowLeft className="mr-1 h-3 w-3" />
                        Anterior
                    </button>
                    <span>Pregunta {currentGlobalIndex + 1} de {totalQuestions}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${((currentGlobalIndex + 1) / totalQuestions) * 100}%` }}
                    />
                </div>
            </div>

            {/* Header Context */}
            <div className="space-y-4">
                <h2 className="heading-2 text-foreground min-h-[1.5em] leading-snug">
                    {question}
                </h2>
            </div>

            {/* Rating Scale - Vertical */}
            <div className="pt-4 flex flex-col gap-3">
                {options.map((option) => {
                    const isSelected = selectedLocal === option.value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={cn(
                                "group relative flex items-center justify-between w-full rounded-xl border-2 p-4 text-left transition-all duration-300 shadow-sm overflow-hidden",
                                isSelected
                                    ? "bg-primary border-primary text-primary-foreground scale-[1.02] animate-pop"
                                    : "bg-card border-muted hover:border-primary/50 hover:bg-secondary active:scale-[0.98]"
                            )}
                        >
                            <span className={cn(
                                "font-medium text-lg text-center transition-colors flex-1 relative z-10",
                                isSelected ? "text-primary-foreground font-bold" : "text-foreground"
                            )}>
                                {option.label}
                            </span>

                            {/* Win Icon */}
                            {isSelected && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                                    <Check className="h-6 w-6 text-white" strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizQuestion;
