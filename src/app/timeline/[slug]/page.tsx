"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, BookOpen, Quote, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import ModelWithChat from "@/components/model3D/ModelWithChat";

// Type definitions for rich content
interface RichContentItem {
  type: "paragraph" | "image" | "quote";
  content?: ReactNode;
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
    description:
      "Khám phá quan niệm triết học về bản chất con người và vai trò quyết định của lao động.",

    richContent: [
      {
        type: "paragraph",
        content:
          "Để hiểu bản chất con người, theo Karl Marx, cần bắt đầu từ sự khác biệt căn bản giữa con người và động vật. Động vật chỉ thích nghi một cách thụ động với tự nhiên và hoạt động theo bản năng, trong khi con người lại chủ động cải biến tự nhiên thông qua lao động, biết sản xuất ra tư liệu sinh hoạt và tạo ra những giá trị vượt lên trên nhu cầu trực tiếp của mình.",
      },

      {
        type: "paragraph",
        content:
          "Chính từ thời điểm con người bắt đầu sản xuất ra tư liệu sinh hoạt, con người đã tự tách mình khỏi thế giới động vật. Lao động không chỉ là hoạt động sinh tồn mà còn là hoạt động mang tính sáng tạo, có mục đích và ý thức, đánh dấu bước chuyển căn bản từ tự nhiên sang xã hội.",
      },

      {
        type: "image",
        src: "/image/human-vs-animal.png",
        alt: "So sánh con người và động vật",
      },

      {
        type: "paragraph",
        content:
          "Theo quan điểm của triết học Marx, con người là một thực thể sinh học – xã hội. Về mặt sinh học, con người mang những đặc điểm tự nhiên như nhu cầu ăn, ở, sinh tồn. Tuy nhiên, yếu tố quyết định bản chất con người lại nằm ở phương diện xã hội, nơi con người tồn tại thông qua các mối quan hệ và hoạt động thực tiễn.",
      },

      {
        type: "paragraph",
        content:
          "Trong toàn bộ đời sống xã hội, lao động sản xuất vật chất giữ vai trò nền tảng. Nhờ lao động, con người không chỉ tạo ra của cải vật chất mà còn hình thành ý thức, phát triển tư duy và xây dựng các quan hệ xã hội.",
      },

      {
        type: "quote",
        content:
          "Trong tính hiện thực của nó, bản chất của con người là tổng hòa các quan hệ xã hội.",
        author: "Karl Marx",
      },

      {
        type: "paragraph",
        content:
          "Luận điểm này cho thấy con người không tồn tại biệt lập mà luôn gắn liền với hệ thống các quan hệ xã hội. Những quan hệ này không phải là sự cộng gộp đơn giản mà là một chỉnh thể phức tạp bao gồm quan hệ kinh tế, chính trị, văn hóa, đạo đức… Chúng tác động qua lại lẫn nhau và cùng nhau hình thành nên bản chất của mỗi cá nhân.",
      },

      {
        type: "image",
        src: "/image/social-relations.png",
        alt: "Mạng lưới quan hệ xã hội",
      },

      {
        type: "paragraph",
        content:
          "Do đó, khi các quan hệ xã hội thay đổi, bản chất con người cũng sẽ thay đổi theo. Con người không chỉ là sản phẩm của lịch sử mà còn là chủ thể sáng tạo ra lịch sử thông qua hoạt động thực tiễn của mình.",
      },

      {
        type: "paragraph",
        content:
          "Xét về vai trò của lao động, triết học Marx – Lenin khẳng định rằng lao động là điều kiện tiên quyết, cần thiết và giữ vai trò quyết định trong sự hình thành và phát triển của con người. Chính thông qua lao động, con người dần hoàn thiện cả về thể chất lẫn trí tuệ.",
      },

      {
        type: "paragraph",
        content:
          "Theo Friedrich Engels, lao động đã góp phần làm cho bàn tay trở nên khéo léo, não bộ phát triển và cơ thể con người hoàn thiện hơn. Đồng thời, trong quá trình lao động, con người buộc phải giao tiếp với nhau, từ đó hình thành ngôn ngữ, và từ ngôn ngữ phát triển thành tư duy và ý thức.",
      },

      {
        type: "image",
        src: "/image/labor-evolution.png",
        alt: "Lao động và sự phát triển của con người",
      },

      {
        type: "paragraph",
        content:
          "Không chỉ dừng lại ở đó, lao động còn là nền tảng tạo ra toàn bộ đời sống xã hội. Thông qua lao động, con người hình thành các quan hệ sản xuất, phân công lao động và các thiết chế xã hội. Vì vậy, lao động không chỉ tạo ra của cải mà còn tạo ra chính con người và xã hội loài người.",
      },

      {
        type: "paragraph",
        content: (
          <>
            <strong>
              Tóm lại, con người là một thực thể sinh học – xã hội, trong đó lao
              động giữ vai trò quyết định. Lao động không chỉ giúp con người tồn
              tại mà còn là con đường để con người phát triển, hoàn thiện bản
              thân và xây dựng xã hội.
            </strong>
          </>
        ),
      },
    ],

    images: [
      "/image/human-vs-animal.png",
      "/image/social-relations.png",
      "/image/labor-evolution.png",
    ],
  },
  {
    year: "Mục 2",
    title: "Hiện tượng tha hóa con người và tha hóa lao động",
    slug: "tha-hoa-con-nguoi-va-lao-dong",
    description:
      "Phân tích sự tha hóa của lao động và hệ quả đối với bản chất con người.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            <strong>Tại sao lao động là gánh nặng ("đi làm để sống"):</strong>{" "}
            Trong chế độ tư hữu tư liệu sản xuất, người lao động không còn làm việc
            như một hoạt động tự nguyện để sáng tạo ra đời sống của chính mình,
            mà lao động trở thành sự cưỡng bức nhằm duy trì sự tồn tại thể xác.
            Vì không sở hữu tư liệu sản xuất, con người phải “đi làm để sống”, chứ
            không phải làm để thể hiện bản chất người; do đó lao động dễ trở thành
            gánh nặng.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Định nghĩa tha hóa:</strong> Tha hóa là quá trình hoạt động và
            sản phẩm của con người tách khỏi con người, biến thành một lực lượng
            đối lập rồi quay lại chi phối, nô dịch chính con người. Nguyên nhân
            gốc rễ của tha hóa là chế độ tư hữu về tư liệu sản xuất.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Tha hóa quá trình lao động:</strong> Người lao động không còn cảm
            thấy lao động là “việc của mình” (đúng với chức năng người), mà chủ yếu
            chỉ thấy mình tồn tại qua các nhu cầu sinh học. Khi lao động, con người
            dường như chỉ còn là một phần phụ thuộc làm theo mệnh lệnh của quá
            trình sản xuất, nên lao động mang tính cưỡng bức và tước đi sự tự do
            bản chất.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Tha hóa sản phẩm</strong>: Sản phẩm do người lao động tạo ra không
            thuộc về họ, trái lại trở thành thứ quyền lực đối với chính họ. Người lao
            động bị lệ thuộc vào hàng hóa/sản phẩm mà mình tạo ra, vì để sống họ phải
            bán sức lao động chứ không sở hữu sản phẩm.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Tha hóa bản chất người</strong>: Lao động bị biến thành phương tiện
            kiếm sống làm con người bị què quặt, phiến diện. Con người chỉ còn một phần
            chức năng gắn với sinh tồn, trong khi các năng lực người (sáng tạo, làm chủ,
            tự khẳng định) bị thu hẹp và suy giảm. Con người trở nên thuộc về máy móc/quy
            trình sản xuất thay vì làm chủ chúng.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Tha hóa quan hệ xã hội:</strong> Quan hệ giữa người với người bị thay
            bằng quan hệ giữa người và vật (qua tiền công, hàng hóa). Con người gặp nhau
            trong tư cách người sở hữu và người bị chi phối, thay vì gặp nhau như những
            chủ thể cùng làm chủ hoạt động xã hội.
          </>
        ),
      },
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 3",
    title: "Vấn đề giải phóng con người",
    slug: "giai-phong-con-nguoi",
    description:
      "Mục tiêu tối thượng của triết học Marx-Lenin là giải phóng con người.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            Theo Karl Marx, mục tiêu cao nhất của triết học Marx - Lenin là giải phóng
            con người khỏi sự tha hóa. Trong xã hội có chế độ tư hữu, đặc biệt là
            chủ nghĩa tư bản, con người rơi vào tình trạng tha hóa: lao động trở
            thành hoạt động bị ép buộc, con người làm việc chỉ để tồn tại, còn
            các sản phẩm do chính họ tạo ra như tiền bạc, máy móc lại quay trở
            lại chi phối và thống trị họ. Khi đó, con người đánh mất bản chất
            sáng tạo và tự do của mình.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Thực chất của giải phóng con người là “trả con người về với chính mình”,
            tức là xóa bỏ sự lệ thuộc vào các thế lực vật chất và xã hội xa lạ.
            Lao động không còn là gánh nặng cưỡng bức mà trở thành hoạt động
            sáng tạo tự giác, mang lại niềm vui và ý nghĩa. Đây là sự giải phóng
            mang tính toàn diện, không chỉ về kinh tế mà còn về xã hội và sự
            phát triển cá nhân.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Trạng thái lý tưởng của quá trình này là xã hội cộng sản, được Karl
            Marx và Friedrich Engels mô tả với nguyên lý:
          </>
        ),
      },
      {
        type: "quote",
        content:
          "Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người",
        author: "Karl Marx và Friedrich Engels",
      },
      {
        type: "paragraph",
        content: (
          <>
            Trong xã hội đó, không còn giai cấp, không còn bóc lột, cá nhân và
            xã hội thống nhất với nhau, và con người có điều kiện phát triển toàn
            diện mọi năng lực của mình.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Cơ sở lý luận của quan điểm này là nhận định của Marx: với nguyên lý
            về bản chất xã hội của con người. Vì vậy, để giải phóng con người một
            cách triệt để, cần phải cải biến các quan hệ xã hội và xóa bỏ nền
            tảng kinh tế gây ra áp bức, đặc biệt là chế độ tư hữu về tư liệu
            sản xuất.
          </>
        ),
      },
      {
        type: "quote",
        content: "Bản chất con người là tổng hòa các quan hệ xã hội",
        author: "Karl Marx",
      },
      {
        type: "paragraph",
        content: (
          <>
            Con đường thực hiện giải phóng con người là một quá trình lịch sử lâu
            dài, bao gồm đấu tranh giai cấp, cách mạng xã hội và phát triển lực
            lượng sản xuất.{" "}
            <strong>
              Tóm lại, giải phóng con người chính là đưa con người từ trạng thái
              bị tha hóa, bị chi phối bởi vật chất và các quan hệ xã hội áp bức,
              trở thành chủ thể tự do, sáng tạo và phát triển toàn diện.
            </strong>
          </>
        ),
      },
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 4",
    title: 'Lập luận "Đi làm để sống"',
    slug: "di-lam-de-song",
    description:
      "Phân tích quan điểm lao động như một phương tiện sinh tồn tất yếu.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            <strong>Theo Karl Marx</strong>, trong xã hội tư hữu tư liệu sản xuất,
            người lao động không sở hữu tư liệu sản xuất nên buộc phải bán sức
            lao động để tồn tại. Vì vậy, lao động vốn là hoạt động sáng tạo tự
            do của con người bị biến thành phương tiện sinh tồn, tức “đi làm để
            sống” thay vì lao động như một nhu cầu tự do.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Trong nền kinh tế hiện đại, con người chủ yếu đi làm vì tiền lương và
            chi phí sinh hoạt, nên lao động mang tính cưỡng bức hơn là lựa chọn.
            Sự tha hóa thể hiện rõ qua <strong>bốn khía cạnh</strong>: tha hóa sản
            phẩm (người lao động làm ra nhưng không sở hữu), tha hóa quá trình
            lao động (công việc bị kiểm soát, lặp lại), tha hóa bản chất con người
            (mất dần tính sáng tạo và tự do), và tha hóa quan hệ xã hội (quan hệ
            cạnh tranh thay vì cộng đồng).
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Thực tiễn cũng phản ánh điều này qua áp lực “cơm áo gạo tiền”, hiện
            tượng “quiet quitting” và tình trạng burnout, stress do làm việc quá
            sức. Từ đó, có thể thấy người lao động chỉ duy trì công việc ở mức cần
            thiết để tồn tại hơn là gắn bó với ý nghĩa công việc. Những thực
            tiễn này có thể được mô tả chi tiết:
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Áp lực “cơm áo gạo tiền”:</strong> Người lao động buộc phải đi làm
            để duy trì thu nhập phục vụ các nhu cầu cơ bản (ăn, ở, y tế, giáo dục),
            kể cả khi công việc không phù hợp → lao động trở thành nghĩa vụ sinh
            tồn, không còn là lựa chọn tự do.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>“Quiet quitting”:</strong> Người lao động chỉ làm đúng phần việc
            tối thiểu, không chủ động hay sáng tạo → thể hiện sự tách rời khỏi
            công việc, coi lao động chỉ là công cụ kiếm sống, không còn ý nghĩa cá
            nhân.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Dữ liệu tham khảo:</strong> <a href="https://vnexpress.net/nhung-xu-huong-cua-gioi-tre-anh-huong-toi-tuong-lai-viec-lam-4787695.html" target="_blank" rel="noreferrer">VnExpress (2024-2025)</a>{" "}
            cho thấy xu hướng làm việc theo hướng “tối thiểu - cân bằng” đang tăng lên. Báo cáo thị trường lao động 2024 (từ{" "}
            <a href="https://english.news.cn/20231214/ad7a4ae0e3d24b38b706540ddbe82027/c.html" target="_blank" rel="noreferrer">Xinhua</a>) cũng nêu{" "}
            <strong>35%</strong> người lao động sẵn sàng nghỉ việc nếu mất cân bằng work-life.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Burnout (kiệt sức):</strong> Làm việc cường độ cao, áp lực kéo dài →
            mệt mỏi cả thể chất lẫn tinh thần, mất động lực → lao động trở thành
            gánh nặng thay vì phương tiện phát triển bản thân.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>Stress do cạnh tranh (KPI, thăng tiến):</strong> Môi trường làm việc
            đặt nặng thành tích → quan hệ giữa người với người mang tính ganh đua
            hơn hợp tác → suy giảm tính cộng đồng, gia tăng tha hóa trong quan hệ
            xã hội.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>
              Kết luận: trong điều kiện kinh tế hiện đại với tư hữu tư liệu sản xuất
              và áp lực sinh tồn, lao động vẫn mang tính tha hóa, và “đi làm để
              sống” là một tất yếu xã hội hơn là lựa chọn tự do cá nhân.
            </strong>
          </>
        ),
      },
    ],
    images: ["/image/body.png"],
  },
  {
    year: "Mục 5",
    title: 'Lập luận "Sống để đi làm"',
    slug: "song-de-di-lam",
    description:
      "Lao động như một nhu cầu tự thân và khẳng định giá trị bản thân.",
    richContent: [
      {
        type: "paragraph",
        content: (
          <>
            Theo Karl Marx, con người khác động vật ở chỗ có lao động có ý thức, biết
            sáng tạo và biến thế giới thành sản phẩm của mình. Trong xã hội lý tưởng,
            lao động không chỉ để tồn tại mà là cách con người thể hiện bản chất, tạo ra
            giá trị và ý nghĩa sống, tức “sống để làm việc”. 
            Để đạt được xã hội lý tưởng thì cần phải:
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Xóa bỏ chế độ tư hữu tư liệu sản xuất.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Xây dựng quan hệ sản xuất mang tính cộng đồng.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Phát triển lực lượng sản xuất đủ cao để đảm bảo nhu cầu cơ bản.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Theo lý thuyết giải phóng con người của Marx và Engels, mục tiêu cuối cùng
            của xã hội là xóa bỏ tha hóa, để lao động trở thành hoạt động tự do, tự nguyện
            và sáng tạo. Khi đó, con người lao động vì đam mê, vì giá trị xã hội và sự phát
            triển bản thân, chứ không bị cưỡng bức bởi sinh tồn.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Lao động trở thành nhu cầu tự thân:
            <br />
            - Lao động không còn là phương tiện → trở thành nhu cầu tự thân của con người
            <br />
            - Con người làm việc vì muốn sáng tạo, cống hiến, phát triển bản thân.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            Thực tiễn cho thấy điều này ở những người lao động vì lý tưởng và đam mê:
            nghệ sĩ, nhà thiết kế tạo ra giá trị tinh thần và dấu ấn cá nhân; các nhà khoa học
            như Einstein hay Marie Curie dành cả đời nghiên cứu, coi lao động là một phần của cuộc sống;
            hay các tình nguyện viên làm việc vì cộng đồng và ý nghĩa xã hội.
          </>
        ),
      },
      {
        type: "paragraph",
        content: (
          <>
            <strong>
              Kết luận, khi lao động được giải phóng khỏi tha hóa, nó không còn là gánh nặng mà trở
              thành nhu cầu tự thân. Khi đó, “sống để làm việc” chính là cách con người khẳng định bản chất
              sáng tạo và ý nghĩa tồn tại của mình.
            </strong>
          </>
        ),
      },
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
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
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
            <span className="font-semibold uppercase tracking-wider text-sm">
              Quay về
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Triết học Marx-Lenin
            </span>
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
                    style={{ textAlign: "justify" }}
                  >
                    {item.content}
                  </p>
                );
              }

              if (item.type === "quote") {
                return (
                  <div
                    key={index}
                    className="py-8 px-10 bg-white border-l-8 border-red-600 rounded-2xl shadow-sm my-12 relative"
                  >
                    <Quote className="absolute -top-4 -right-4 w-12 h-12 text-red-50/50 -rotate-12" />
                    <p className="text-2xl md:text-3xl font-black text-slate-900 italic mb-4 leading-snug">
                      "{item.content}"
                    </p>
                    {item.author && (
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-8 bg-red-600"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-red-600">
                          {item.author}
                        </span>
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
                onClick={() =>
                  router.push(
                    `/timeline/${timelineData[currentIndex - 1].slug}`,
                  )
                }
                className="flex-1 p-8 rounded-3xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Nội dung trước
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-800">
                  {timelineData[currentIndex - 1].title}
                </h4>
              </button>
            ) : (
              <div className="flex-1"></div>
            )}

            {currentIndex < timelineData.length - 1 ? (
              <button
                onClick={() =>
                  router.push(
                    `/timeline/${timelineData[currentIndex + 1].slug}`,
                  )
                }
                className="flex-1 p-8 rounded-3xl bg-slate-900 text-white hover:bg-red-950 hover:shadow-2xl transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-slate-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Tiếp theo
                  </span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-lg font-bold">
                  {timelineData[currentIndex + 1].title}
                </h4>
              </button>
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </article>
      </div>

      <ModelWithChat />
    </div>
  );
}
