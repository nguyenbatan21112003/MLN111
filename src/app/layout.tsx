import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter, Crimson_Text} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Font sang trọng cho tiêu đề
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Font hiện đại cho body text
const inter = Inter({
  variable: "--font-inter", 
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

// Font elegant cho quotes
const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dấu Chân Lịch Sử",
  description: "Khám phá những dấu mốc quan trọng trong quá trình hình thành tư tưởng Hồ Chí Minh",
  keywords: "Hồ Chí Minh, Bác Hồ, lịch sử Việt Nam, cách mạng, độc lập, timeline, cuộc đời Hồ Chí Minh, tư tưởng Hồ Chí Minh",
  authors: [{ name: "AIZY" }],
  icons: {
    icon: "/image/logo.png",
    // shortcut: "/logo.png",
    // apple: "/logo.png",
  },
  creator: "Dấu Chân Lịch Sử",
  publisher: "Dấu Chân Lịch Sử",
  openGraph: {
    title: "Dấu Chân Lịch Sử",
    description: "Khám phá những dấu mốc quan trọng trong quá trình hình thành tư tưởng Hồ Chí Minh",
    url: "https://dauchanlichsu.aizy.vn",
    images: [
      {
        url: "/image/header.png",
        width: 1200,
        height: 630,
        alt: "Dấu Chân Lịch Sử",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "vi_VN",
    siteName: "Dấu Chân Lịch Sử",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dấu Chân Lịch Sử",
    description: "Khám phá những dấu mốc quan trọng trong quá trình hình thành tư tưởng Hồ Chí Minh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} ${crimsonText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
