"use client";

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import QuizWelcome from "./QuizWelcome";

import { questions, getEvaluation } from "./quizData";
import { supabase } from "@/integrations/supabase/client";

const QuizEngine = () => {
    const totalQuestions = questions.length;

    const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(totalQuestions).fill(0));
    const [showResult, setShowResult] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [userName, setUserName] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);

    const handleStart = (name: string) => {
        setUserName(name);
        setHasStarted(true);
        setStartTime(Date.now());
    };

    const currentQuestion = questions[currentGlobalIndex];

    const calculateFinalScore = (finalAnswers: number[]) => {
        return finalAnswers.reduce((total, score, index) => {
            const question = questions[index];
            if (question.isReverse) {
                // 1-6 scale reverse: 1->6, 2->5, 3->4, 4->3, 5->2, 6->1
                return total + (7 - score);
            }
            return total + score;
        }, 0);
    };

    const saveResults = async (finalAnswers: number[]) => {
        if (!startTime) return;

        const endTime = Date.now();
        const durationSeconds = Math.floor((endTime - startTime) / 1000);
        const totalScore = calculateFinalScore(finalAnswers);

        // Flatten answers for columns q1...q12
        const flatAnswers: Record<string, number> = {};
        finalAnswers.forEach((score, index) => {
            flatAnswers[`q${index + 1}`] = score;
        });

        try {
            const { error } = await supabase
                .from('Quiz_autocompasion')
                .insert([
                    {
                        user_name: userName,
                        total_score: totalScore,
                        time_taken_seconds: durationSeconds,
                        ...flatAnswers
                    }
                ]);

            if (error) {
                console.error('Error saving results:', error);
            } else {
                console.log('Results saved successfully!');
            }
        } catch (err) {
            console.error('Unexpected error saving results:', err);
        }
    };

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentGlobalIndex] = score;
        setAnswers(newAnswers);

        if (currentGlobalIndex < totalQuestions - 1) {
            setCurrentGlobalIndex(currentGlobalIndex + 1);
        } else {
            saveResults(newAnswers);
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentGlobalIndex > 0) {
            setCurrentGlobalIndex(currentGlobalIndex - 1);
        }
    };

    const handleRetake = () => {
        setAnswers(new Array(totalQuestions).fill(0));
        setCurrentGlobalIndex(0);
        setShowResult(false);
        setHasStarted(false);
        setStartTime(null);
    };

    if (!hasStarted) {
        return <QuizWelcome onStart={handleStart} />;
    }

    if (showResult) {
        const finalScore = calculateFinalScore(answers);
        return <QuizResult totalScore={finalScore} onRetake={handleRetake} userName={userName} />;
    }

    return (
        <div className="w-full flex justify-center">
            <QuizQuestion
                key={currentGlobalIndex}
                question={currentQuestion.text}
                onAnswer={handleAnswer}
                onBack={handleBack}
                currentGlobalIndex={currentGlobalIndex}
                totalQuestions={totalQuestions}
                selectedValue={answers[currentGlobalIndex] > 0 ? answers[currentGlobalIndex] : undefined}
            />
        </div>
    );
};

export default QuizEngine;
