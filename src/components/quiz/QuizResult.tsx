
import { getEvaluation } from "./quizData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Info, Trophy, Sparkles } from "lucide-react";

interface QuizResultProps {
    totalScore: number;
    onRetake: () => void;
    userName?: string;
}

const QuizResult = ({ totalScore, onRetake, userName }: QuizResultProps) => {
    const evaluation = getEvaluation(totalScore);

    return (
        <div className="w-full max-w-3xl animate-fade-in text-center space-y-12 pb-20 mx-auto">
            {/* Header */}
            <div className="space-y-4 pt-10">
                <p className="text-sm font-bold uppercase tracking-widest text-primary/80">
                    {userName ? `Hola ${userName}, ` : ""}estos son tus resultados:
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                    Tu Nivel de Autocompasión
                </h1>
            </div>

            {/* Score Card */}
            <div className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${totalScore >= 43 ? 'from-emerald-400 to-cyan-400' : totalScore >= 31 ? 'from-yellow-400 to-orange-400' : 'from-red-400 to-rose-400'} rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>
                <div className="relative bg-card border rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
                        {/* Left Side: Score & Message */}
                        <div className="flex flex-col items-center space-y-6 flex-1 text-center">
                            <div className="flex justify-center flex-col items-center space-y-2">
                                <div className={`text-7xl md:text-8xl font-black ${evaluation.color}`}>
                                    {totalScore}
                                </div>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    Puntos (escala 12-72)
                                </div>
                            </div>

                            <div className="space-y-4 flex flex-col items-center">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-lg ${evaluation.color} ${evaluation.bg} ${evaluation.border}`}>
                                    {totalScore >= 43 ? <Trophy className="h-5 w-5" /> : totalScore >= 31 ? <Sparkles className="h-5 w-5" /> : <Heart className="h-5 w-5" /> }
                                    {evaluation.status}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Vertical Chart */}
                        <div className="relative h-64 w-44 flex items-end justify-start shrink-0">
                            {/* Sections */}
                            <div className="absolute left-0 h-full w-24 text-[11px] uppercase font-bold text-right">
                                {/* Dividers & Values */}
                                <div className="absolute right-0 w-3 border-t-2 border-border/70 z-10" style={{ bottom: '50%' }}></div>
                                <span className="absolute right-5 translate-y-1/2 text-[10px] text-muted-foreground font-semibold" style={{ bottom: '50%' }}>42</span>

                                <div className="absolute right-0 w-3 border-t-2 border-border/70 z-10" style={{ bottom: '30%' }}></div>
                                <span className="absolute right-5 translate-y-1/2 text-[10px] text-muted-foreground font-semibold" style={{ bottom: '30%' }}>30</span>
                                
                                {/* Labels */}
                                <span className="absolute right-4 translate-y-1/2 text-emerald-600/90 tracking-wider" style={{ bottom: '75%' }}>Alta</span>
                                <span className="absolute right-4 translate-y-1/2 text-yellow-600/90 tracking-wider" style={{ bottom: '40%' }}>Moderada</span>
                                <span className="absolute right-4 translate-y-1/2 text-red-500/90 tracking-wider" style={{ bottom: '15%' }}>Baja</span>
                            </div>

                            {/* Bar Container */}
                            <div className="absolute left-24 h-full w-8 bg-secondary rounded-full overflow-hidden shadow-inner flex shrink-0">
                                {/* Fill */}
                                <div 
                                    className={`absolute bottom-0 w-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-t ${totalScore >= 43 ? 'from-emerald-400 to-emerald-600' : totalScore >= 31 ? 'from-yellow-400 to-yellow-600' : 'from-red-400 to-red-600'}`}
                                    style={{ height: `${((totalScore - 12) / (72 - 12)) * 100}%` }}
                                ></div>
                            </div>
                            
                            {/* Current Score Indicator */}
                            <div 
                                className="absolute left-[132px] flex items-center transition-all duration-1000 ease-out z-10"
                                style={{ bottom: `calc(${Math.max(0, Math.min(100, ((totalScore - 12) / (72 - 12)) * 100))}% - 14px)` }}
                            >
                                <div className="absolute -left-2 w-3 border-t-2 border-primary border-dashed"></div>
                                <span className={`relative font-black text-sm bg-background px-2.5 py-1 rounded-md shadow-md border-2 ${evaluation.border} ${evaluation.color}`}>{totalScore}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border/50">
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            {evaluation.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Why need self-compassion Section */}
            <div className="bg-secondary/30 border border-border/50 rounded-2xl p-6 text-left space-y-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                    <Info className="h-4 w-4" />
                    ¿Por qué necesitamos autocompasión?
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    Las investigaciones sugieren que las personas que se tratan con compasión en momentos difíciles experimentan mejor salud física y mental.
                </p>
                <p className="text-muted-foreground leading-relaxed italic text-sm">
                    Afortunadamente, la autocompasión es una habilidad que puedes desarrollar y seguir cultivando.
                </p>
            </div>

            {/* Tip Section */}
            <div className="bg-secondary/30 border border-border/50 rounded-2xl p-6 text-left space-y-3 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm mb-1">
                    <Heart className="h-4 w-4" />
                    Un tip para mejorar
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Trátate como a un amigo:</strong> Reflexiona sobre cómo responderías a un amigo que está sufriendo: ¿Qué le harías y dirías? ¿Cómo se compara eso con la forma en que te tratas a ti mismo cuando estás sufriendo? Esto puede recordarte que también eres capaz de ser amable contigo mismo, y que tú también mereces compasión.
                </p>
            </div>

            {/* Final CTA */}
            <div className="flex justify-center pt-8">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={onRetake}
                    className="text-muted-foreground hover:text-foreground group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Volver a empezar
                </Button>
            </div>
        </div>
    );
};

export default QuizResult;
