"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Trophy, Star } from "lucide-react";

const galleryImages = [
  {
    src: "/image/header_mac_lenin.png",
    alt: "Triết học Mác-Lênin - Khởi đầu",
    label: "Sự ra đời của chủ nghĩa Mác-Lênin",
    file: "header_mac_lenin.png",
    difficulty: "Dễ",
    pieces: "12 mảnh",
    period: "1890-1920",
    description: "Từ làng Sen đến Paris, hành trình tìm ánh sáng giải phóng",
    icon: "🌅"
  },
  {
    src: "/image/body.png", 
    alt: "Cuộc đời Hồ Chí Minh - Giai đoạn cách mạng",
    label: "Thành lập Đảng và lãnh đạo cách mạng",
    file: "body.png",
    difficulty: "Trung bình",
    pieces: "20 mảnh", 
    period: "1920-1945",
    description: "Từ Đảng Cộng sản đến Cách mạng Tháng Tám thành công",
    icon: "⚡"
  },
  {
    src: "/image/hinh2.png",
    alt: "Cuộc đời Hồ Chí Minh - Kháng chiến và xây dựng",
    label: "Kháng chiến và xây dựng đất nước",
    file: "hinh2.png", 
    difficulty: "Khó",
    pieces: "30 mảnh",
    period: "1945-1969",
    description: "Lãnh đạo kháng chiến và để lại di sản bất hủ",
    icon: "🏛️"
  },
];

export default function GameGallery() {
  const router = useRouter();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "bg-green-100 text-green-800 border-green-200";
      case "Trung bình": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Khó": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Historical Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-red-600 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-yellow-600 rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-red-600 -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-yellow-600 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-12 gap-4 sm:gap-0">
          <Link
            href="/"
            className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/25 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>
          
          <div className="text-center flex-1 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-1 sm:mb-2 font-serif leading-tight">
              Tái Hiện Lịch Sử
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
              Khám phá cuộc đời Chủ tịch Hồ Chí Minh qua trò chơi xếp hình tương tác
            </p>
          </div>
          
          <div className="hidden sm:block w-20 md:w-32"></div>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {galleryImages.map((img, idx) => (
            <div
              key={img.src}
              className="group cursor-pointer"
              onClick={() => router.push(`/game/play/${img.file}`)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100 hover:border-red-200 hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Overlay with period */}
                  <div className="absolute top-4 left-4 bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {img.period}
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors font-serif">
                    {img.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {img.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-red-100">
          <div className="flex items-center justify-center gap-2 text-yellow-600 mb-4">
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
            Học Lịch Sử Qua Trò Chơi
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Mỗi mảnh ghép là một khoảnh khắc lịch sử, mỗi hình hoàn thành là một giai đoạn trong cuộc đời 
            vĩ đại của Chủ tịch Hồ Chí Minh. Hãy bắt đầu hành trình khám phá!
          </p>
        </div>
      </div>
    </div>
  );
}
