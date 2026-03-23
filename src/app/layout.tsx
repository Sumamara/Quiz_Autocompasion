import { Providers } from "@/components/Providers";
import "../index.css";

export const metadata = {
    metadataBase: new URL('https://Sumamara.github.io'),
    title: "Evaluación de Autocompasión",
    description: "Descubre cómo te tratas a ti mismo en los momentos difíciles y aprende a cultivar una relación más amable.",
    icons: {
        icon: [
            { url: '/Encuesta_autocompasion/favicon.ico' },
            { url: '/Encuesta_autocompasion/favicon.png', type: 'image/png' }
        ],
        shortcut: '/Encuesta_autocompasion/favicon.png',
        apple: '/Encuesta_autocompasion/favicon.png',
    },
    openGraph: {
        title: "Evaluación de Autocompasión",
        description: "Descubre cómo te tratas a ti mismo en los momentos difíciles y aprende a cultivar una relación más amable.",
        images: [
            {
                url: 'https://Sumamara.github.io/Encuesta_autocompasion/og_image_autocompasion.png',
                width: 1024,
                height: 1024,
                alt: 'Evaluación de Autocompasión Preview',
            }
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
