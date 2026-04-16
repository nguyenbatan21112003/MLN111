"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, BookOpen, Quote, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ModelWithChat from "@/components/model3D/ModelWithChat";

// Type definitions for rich content
interface RichContentItem {
  type: "paragraph" | "image" | "quote";
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
  author?: string;
  layout?: "normal" | "wide";
}

interface TimelineEvent {
  year: string;
  title: string;
  slug: string;
  description: string;
  richContent: RichContentItem[];
  images: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: "Mục 1",
    title: "Bản chất của con người và vai trò của lao động",
    slug: "ban-chat-con-nguoi-va-lao-dong",
    description: "Khám phá quan niệm triết học về bản chất con người và vai trò quyết định của lao động.",
    richContent: [
      {
        type: "paragraph",
        content: "Theo triết học Marx-Lenin, con người không phải là một thực thể trừu tượng, cô lập mà là một thực thể sinh học - xã hội thống nhất. Bản chất con người không phải là cái gì đó bẩm sinh, bất biến mà được hình thành và biến đổi thông qua hoạt động thực tiễn, đặc biệt là hoạt động lao động sản xuất.",
      },
      {
        type: "quote",
        content: "Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội.",
        author: "Karl Marx"
      },
      {
        type: "paragraph",
        content: "Lao động chính là điều kiện cơ bản nhất để con người tách khỏi thế giới động vật. Thông qua lao động, con người không chỉ cải tạo thế giới khách quan mà còn cải tạo chính bản thân mình, phát triển các năng lực tư duy, ngôn ngữ và các giá trị đạo đức, thẩm mỹ.",
      }
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 2",
    title: "Hiện tượng tha hóa con người và tha hóa lao động",
    slug: "tha-hoa-con-nguoi-va-lao-dong",
    description: "Phân tích sự tha hóa của lao động và hệ quả đối với bản chất con người.",
    richContent: [
      {
        type: "paragraph",
        content: "Tha hóa lao động là một khái niệm trung tâm trong các tác phẩm kinh điển của Marx. Đây là hiện tượng mà sản phẩm do người lao động tạo ra lại trở thành một lực lượng xa lạ, đối lập và thống trị chính họ. Trong chế độ tư hữu, lao động không còn là sự tự khẳng định mình mà trở thành sự phủ định mình.",
      },
      {
        type: "paragraph",
        content: "Sự tha hóa thể hiện ở bốn khía cạnh: tha hóa đối với sản phẩm lao động, tha hóa trong quá trình lao động, tha hóa đối với bản chất loài và tha hóa giữa người với người. Khi đó, người công nhân chỉ cảm thấy mình tự do khi thực hiện các chức năng động vật (ăn, ngủ, sinh sản), còn khi lao động - chức năng làm người - thì họ cảm thấy mình bị gò bó như một con vật.",
      }
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 3",
    title: "Vấn đề giải phóng con người",
    slug: "giai-phong-con-nguoi",
    description: "Mục tiêu tối thượng của triết học Marx-Lenin là giải phóng con người.",
    richContent: [
      {
        type: "paragraph",
        content: "Giải phóng con người là mục tiêu cao cả nhất của chủ nghĩa Marx. Nó không chỉ đơn thuần là giải phóng về mặt tinh thần hay tôn giáo, mà là sự giải phóng thực tế khỏi mọi hình thức áp bức, bóc lột và tha hóa. Để giải phóng con người, trước hết phải giải phóng xã hội khỏi chế độ tư hữu tư bản chủ nghĩa.",
      },
      {
        type: "paragraph",
        content: "Marx khẳng định rằng sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người. Một xã hội tương lai - xã hội cộng sản - sẽ là nơi mà con người có thể phát triển toàn diện mọi năng lực sáng tạo của mình.",
      }
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 4",
    title: 'Lập luận "Đi làm để sống"',
    slug: "di-lam-de-song",
    description: "Phân tích quan điểm lao động như một phương tiện sinh tồn tất yếu.",
    richContent: [
      {
        type: "paragraph",
        content: '"Đi làm để sống" phản ánh khía cạnh bản năng và tất yếu vật chất của lao động. Trong bất kỳ xã hội nào, con người trước hết phải ăn, uống, ở và mặc trước khi có thể làm chính trị, khoa học hay nghệ thuật. Lao động để thỏa mãn các nhu cầu sinh tồn cơ bản là nấc thang đầu tiên của hoạt động làm người.',
      },
      {
        type: "paragraph",
        content: "Tuy nhiên, nếu lao động chỉ dừng lại ở mức độ duy trì sự sống thuần túy, con người dễ rơi vào tình trạng bị lệ thuộc và chịu sự chi phối của các nhu cầu sinh học. Triết học Marx khuyến khích chúng ta nhìn xa hơn, biến việc \"đi làm để sống\" thành tiền đề cho những giá trị cao đẹp hơn của đời sống con người.",
      }
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 5",
    title: 'Lập luận "Sống để đi làm"',
    slug: "song-de-di-lam",
    description: "Lao động như một nhu cầu tự thân và khẳng định giá trị bản thân.",
    richContent: [
      {
        type: "paragraph",
        content: '"Sống để đi làm" (hay sống để sáng tạo) là tầm cao mới của triết lý nhân sinh. Ở đây, lao động không còn bị coi là gánh nặng hay sự ép buộc mà trở thành nhu cầu tự thân, là phương thức để con người khẳng định sự tồn tại của mình trong thế giới. Đó là quá trình con người in dấu ấn của mình lên vật chất, tạo ra những giá trị hữu ích cho cộng đồng.',
      },
      {
        type: "quote",
        content: "Hạnh phúc không phải là không làm gì cả, mà là được làm những gì mình yêu thích.",
        author: "Khuyết danh (phù hợp với tinh thần lao động tự nguyện)"
      },
      {
        type: "paragraph",
        content: "Khi đạt đến trình độ này, con người sẽ tìm thấy niềm vui trong công việc, tìm thấy ý nghĩa của sự cống hiến. Đời sống minh triết chính là sự cân bằng giữa việc đáp ứng các nhu cầu vật chất và việc thỏa mãn nhu cầu sáng tạo, đóng góp, sống một cuộc đời có mục đích và lý tưởng.",
      }
    ],
    images: ["/image/body.png"],
  },
];

export default function TimelineDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const event = timelineData.find((item) => item.slug === slug);
  const currentIndex = timelineData.findIndex((item) => item.slug === slug);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    window.scrollTo(0, 0);
    const tl = gsap.timeline();

    tl.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy nội dung
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-slate-700 hover:text-red-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold uppercase tracking-wider text-sm">Quay về</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Triết học Marx-Lenin</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <article ref={contentRef}>
          {/* Article Identity */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              {event.year}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight font-serif italic">
              {event.title}
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
              "{event.description}"
            </p>
          </div>

          {/* Featured Image Overlay Card (Simple but Premium) */}
          <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl aspect-[16/9] group">
            <img 
              src={event.images[0]} 
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
          </div>

          {/* Dynamic Content Sections */}
          <div className="space-y-10">
            {event.richContent.map((item, index) => {
              if (item.type === "paragraph") {
                return (
                  <p 
                    key={index}
                    className="text-xl text-slate-800 leading-relaxed font-serif"
                    style={{ textAlign: 'justify' }}
                  >
                    {item.content}
                  </p>
                );
              }

              if (item.type === "quote") {
                return (
                  <div key={index} className="py-8 px-10 bg-white border-l-8 border-red-600 rounded-2xl shadow-sm my-12 relative">
                    <Quote className="absolute -top-4 -right-4 w-12 h-12 text-red-50/50 -rotate-12" />
                    <p className="text-2xl md:text-3xl font-black text-slate-900 italic mb-4 leading-snug">
                       "{item.content}"
                    </p>
                    {item.author && (
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-8 bg-red-600"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-red-600">{item.author}</span>
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Next/Prev Navigation */}
          <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row gap-6">
            {currentIndex > 0 ? (
              <button
                onClick={() => router.push(`/timeline/${timelineData[currentIndex - 1].slug}`)}
                className="flex-1 p-8 rounded-3xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Nội dung trước</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800">{timelineData[currentIndex - 1].title}</h4>
              </button>
            ) : <div className="flex-1"></div>}

            {currentIndex < timelineData.length - 1 ? (
              <button
                onClick={() => router.push(`/timeline/${timelineData[currentIndex + 1].slug}`)}
                className="flex-1 p-8 rounded-3xl bg-slate-900 text-white hover:bg-red-950 hover:shadow-2xl transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-slate-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest">Tiếp theo</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-lg font-bold">{timelineData[currentIndex + 1].title}</h4>
              </button>
            ) : <div className="flex-1"></div>}
          </div>
        </article>
      </div>

      <ModelWithChat />
    </div>
  );
}
