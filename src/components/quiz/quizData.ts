
export interface Question {
    id: number;
    text: string;
    isReverse: boolean;
}

export const questions: Question[] = [
    { id: 1, text: "Intento ser paciente y comprensivo con los aspectos de mi personalidad que no me gustan.", isReverse: false },
    { id: 2, text: "Cuando me siento mal, tiendo a obsesionarme y fijarme en todo lo que va mal.", isReverse: true },
    { id: 3, text: "Cuando las cosas me van mal, veo las dificultades como parte de la vida por la que todo el mundo pasa.", isReverse: false },
    { id: 4, text: "Cuando me siento mal, intento ver mis sentimientos con curiosidad y apertura.", isReverse: false },
    { id: 5, text: "Cuando pienso en mis insuficiencias, tiendo a sentirme más separado y desconectado del resto del mundo.", isReverse: true },
    { id: 6, text: "Intento ser afectuoso conmigo mismo cuando siento dolor emocional.", isReverse: false },
    { id: 7, text: "Cuando fracaso en algo importante para mí, me consumen sentimientos de insuficiencia.", isReverse: true },
    { id: 8, text: "Cuando estoy deprimido y desanimado, me recuerdo a mí mismo que hay mucha otra gente en el mundo que se siente como yo.", isReverse: false },
    { id: 9, text: "Cuando algo me molesta, intento mantener mis emociones en equilibrio.", isReverse: false },
    { id: 10, text: "Cuando los tiempos son realmente difíciles, tiendo a ser duro conmigo mismo.", isReverse: true },
    { id: 11, text: "Intento ver mis fallos como parte de la condición humana.", isReverse: false },
    { id: 12, text: "Soy amable conmigo mismo cuando experimento sufrimiento.", isReverse: false },
];

export const getEvaluation = (score: number) => {
    if (score <= 30) {
        return {
            status: "Autocompasión Baja",
            description: "Tiendes a ser autocrítico, a quedar atrapado en tus emociones o a sentirte aislado durante los momentos de dolor o dificultad. No estás solo. A menudo nos juzgamos con más dureza de la que juzgamos a los demás. La autocompasión es una habilidad que puedes desarrollar.",
            color: "text-red-600",
            bg: "bg-red-600/10",
            border: "border-red-600/20"
        };
    }
    if (score <= 42) {
        return {
            status: "Autocompasión Moderada",
            description: "Tienes una tendencia moderada a ser consciente, amable contigo mismo y conectado con tu humanidad durante momentos de dificultad. Si a veces caes en la autocrítica dura, recuerda que tratarte con compasión es una respuesta más saludable que puedes seguir cultivando.",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20"
        };
    }
    return {
        status: "Autocompasión Alta",
        description: "Tienes una fuerte tendencia a ser consciente, amable contigo mismo y conectado con tu humanidad durante los momentos de dificultad. ¡Buenas noticias! La investigación sugiere que las personas que se tratan con compasión experimentan mejor salud física y mental.",
        color: "text-emerald-600",
        bg: "bg-emerald-600/10",
        border: "border-emerald-600/20"
    };
};
