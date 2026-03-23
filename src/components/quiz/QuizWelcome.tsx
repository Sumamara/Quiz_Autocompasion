"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuizWelcomeProps {
    onStart: (name: string) => void;
}

const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="w-full max-w-lg animate-fade-in text-center space-y-8">
            <div className="space-y-4">
                {/* Title is now handled in Quiz.tsx */}
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <span>⏱️</span>
                    <span>Duración estimada: 3 minutos</span>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Descubre cómo te tratas a ti mismo en los momentos difíciles y aprende a cultivar una relación más amable y compasiva contigo mismo.
                </p>
                <p className="text-lg font-medium text-primary pt-4">
                    Antes de comenzar, ¿cómo te llamas?
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Input
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-center text-lg h-12"
                        autoFocus
                    />
                </div>
                <Button size="lg" type="submit" className="w-full font-bold text-lg" disabled={!name.trim()}>
                    Comenzar evaluación
                </Button>
            </form>
        </div>
    );
};

export default QuizWelcome;
