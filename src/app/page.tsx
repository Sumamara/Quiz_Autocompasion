"use client";

import QuizEngine from "@/components/quiz/QuizEngine";

export default function Home() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-2xl mx-auto space-y-8 text-center mb-8">
                    <h1 className="heading-1 text-primary">
                        Evaluación de Autocompasión
                    </h1>
                </div>

                <div className="w-full flex justify-center">
                    <QuizEngine />
                </div>
            </main>
        </div>
    );
}
