"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
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
  year: number;
  title: string;
  slug: string;
  description: string;
  richContent?: RichContentItem[];
  fullContent?: string;
  images: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: 1890,
    title: "Thời kỳ trước năm 1911 - Hình thành tư tưởng yêu nước và có chí hướng tìm con đường cứu nước mới",
    slug: "thoi-ky-truoc-nam-1911",
    description:
      "Trong thời kỳ này, Hồ Chí Minh tiếp thu truyền thống tốt đẹp của quê hương, gia đình và của dân tộc hình thành nên tư tưởng yêu nước và tìm đường cứu nước.",
    richContent: [
      {
        type: "paragraph",
        content:
          "Trong thời kỳ này, Hồ Chí Minh tiếp thu truyền thống tốt đẹp của quê hương, gia đình và của dân tộc hình thành nên tư tưởng yêu nước và tìm đường cứu nước. Nghệ An là vùng đất địa linh nhân kiệt, giàu truyền thống yêu nước, lắm nhân tài và anh hùng yêu nước nổi tiếng trong lịch sử dân tộc như Mai Thúc Loan, Phan Đình Phùng, Phan Bội Châu.",
      },
      {
        type: "image",
        src: "/nghe-an-vung-dat-dia-linh-nhan-kiet.jpg",
        alt: "Nghệ An - vùng đất địa linh nhân kiệt",
        caption:
          "Nghệ An - vùng đất giàu truyền thống yêu nước, nơi sinh ra nhiều anh hùng dân tộc",
      },
      {
        type: "paragraph",
        content:
          "Sinh ra trong một gia đình khoa bảng. Cụ Nguyễn Sinh Sắc đỗ phó bảng. Cụ thường tâm sự: 'Quan trường là nô lệ trong những người nô lệ, lại càng nô lệ hơn'. Cụ thường dạy các con: 'Đừng lấy phong cách nhà quan làm phong cách nhà ta'. Tinh thần yêu nước, thương dân và nhân cách của cụ Nguyễn Sinh Sắc có ảnh hưởng lớn lao đến tư tưởng, nhân cách Hồ Chí Minh thuở niên thiếu.",
      },
      {
        type: "quote",
        content: "Quan trường là nô lệ trong những người nô lệ, lại càng nô lệ hơn",
        author: "Cụ Nguyễn Sinh Sắc",
      },
      {
        type: "quote",
        content: "Đừng lấy phong cách nhà quan làm phong cách nhà ta",
        author: "Lời dạy của cụ Nguyễn Sinh Sắc",
      },
      {
        type: "paragraph",
        content:
          "Hồ Chí Minh cũng chịu ảnh hưởng sâu sắc tình cảm của người mẹ – cụ Hoàng Thị Loan, người mẹ Việt Nam điển hình về tính cần mẫn, tần tảo, đảm đang, hết mực thương yêu chồng, thương yêu các con và ăn ở nhân đức với mọi người. Cụ Hoàng Thị Loan có ảnh hưởng lớn đến các con bằng tấm lòng nhân hậu và mẫn cảm của người mẹ.",
      },
      {
        type: "image",
        src: "/nguyen-sinh-sac-va-hoang-thi-loan.jpg",
        alt: "Cụ Nguyễn Sinh Sắc và Hoàng Thị Loan",
        caption: "Cha mẹ của Hồ Chí Minh - những người có ảnh hưởng lớn đến tư tưởng và nhân cách của Người",
      },
      {
        type: "paragraph",
        content:
          "Tiếp thu truyền thống tốt đẹp của quê hương, gia đình, được theo học các vị túc nho và tiếp xúc với nhiều loại sách báo tiến bộ ở các trường, lớp tại Vinh, tại kinh đô Huế, Người hiểu rõ tình cảnh nước nhà bị giặc ngoại xâm đô hộ và sớm có tư tưởng yêu nước, thể hiện rõ tư tưởng yêu nước trong hành động.",
      },
      {
        type: "paragraph",
        content:
          "Năm 1908, Người tham gia phong trào chống thuế ở Trung Kỳ. Năm 1910, khi làm thầy giáo ở Trường Dục Thanh, Phan Thiết, trong dạy học cũng như trong sinh hoạt, Người đem hết nhiệt tình truyền thụ cho học sinh lòng yêu nước và những suy nghĩ về vận mệnh nước nhà.",
      },
      {
        type: "image",
        src: "/truong-duc-thanh-phan-thiet.jpg",
        alt: "Trường Dục Thanh Phan Thiết",
        caption: "Trường Dục Thanh, Phan Thiết - nơi Hồ Chí Minh từng làm thầy giáo và truyền bá tư tưởng yêu nước",
        layout: "wide",
      },
      {
        type: "paragraph",
        content:
          "Điểm đặc biệt của tuổi trẻ Hồ Chí Minh là suy ngẫm sâu sắc về Tổ quốc và thời cuộc. Tuy rất khâm phục tinh thần yêu nước của các vị tiền bối cách mạng nổi tiếng như Phan Bội Châu, Phan Châu Trinh, Hoàng Hoa Thám, nhưng Người sáng suốt phê phán, không tán thành, không đi theo các phương pháp, khuynh hướng cứu nước của các vị đó.",
      },
      {
        type: "image",
        src: "/phan-boi-chau-phan-chau-trinh.jpg",
        alt: "Phan Bội Châu và Phan Châu Trinh",
        caption: "Phan Bội Châu và Phan Châu Trinh - những nhà yêu nước tiền bối mà Hồ Chí Minh khâm phục",
      },
      {
        type: "paragraph",
        content:
          "Hồ Chí Minh muốn tìm hiểu những gì ẩn giấu sau sức mạnh của kẻ thù và học hỏi kinh nghiệm cách mạng trên thế giới. Ngày 5-6-1911, Hồ Chí Minh đi ra nước ngoài tìm con đường cứu nước, cứu dân.",
      },
      {
        type: "image",
        src: "/ho-chi-minh-ra-di-tim-duong-cuu-nuoc.jpg",
        alt: "Hồ Chí Minh ra đi tìm đường cứu nước",
        caption: "Hồ Chí Minh quyết định ra đi tìm con đường cứu nước mới - bước ngoặt quan trọng trong cuộc đời Người",
        layout: "wide",
      },
    ],
    images: [
      "/nghe-an-vung-dat-dia-linh-nhan-kiet.jpg",
      "/nguyen-sinh-sac-va-hoang-thi-loan.jpg",
      "/truong-duc-thanh-phan-thiet.jpg",
      "/phan-boi-chau-phan-chau-trinh.jpg",
      "/ho-chi-minh-ra-di-tim-duong-cuu-nuoc.jpg",
    ],
  },
  {
    year: 1890,
    title: "Sinh ra tại làng Sen",
    slug: "sinh-ra-tai-lang-sen",
    description:
      "Nguyễn Sinh Cung (sau này là Hồ Chí Minh) sinh ra tại làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An.",
    richContent: [
      {
        type: "paragraph",
        content:
          "Ngày 19 tháng 5 năm 1890 (nhằm ngày 19 tháng 4 năm Canh Dần), tại làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An, một em bé trai chào đời trong gia đình ông Nguyễn Sinh Sắc và bà Hoàng Thị Loan. Em bé được đặt tên là Nguyễn Sinh Cung.",
      },
      {
        type: "image",
        src: "/l-ng-sen-x-a-v-i-nh-ng-ng-i-nh--tranh-m-i-l--b-n-b.jpg",
        alt: "Làng Sen xưa - nơi sinh ra Hồ Chí Minh",
        caption:
          "Làng Sen xưa với những mái nhà tranh, nơi Nguyễn Sinh Cung chào đời",
      },
      {
        type: "paragraph",
        content:
          "Gia đình ông Nguyễn Sinh Sắc là một gia đình nho học nghèo. Ông Sắc là một nhà nho có học thức, từng đỗ Phó bảng (tương đương tiến sĩ ngày nay) năm 1901 và làm quan ở triều Nguyễn. Tuy nhiên, ông có tinh thần yêu nước mạnh mẽ và không chịu phục vụ thực dân Pháp.",
      },
      {
        type: "quote",
        content: "Cha sinh con, đất sinh lòng yêu nước",
        author: "Tục ngữ dân gian về tình yêu quê hương",
      },
      {
        type: "paragraph",
        content:
          "Làng Sen nằm bên bờ sông Lam thơ mộng, là một vùng đất có truyền thống yêu nước lâu đời. Nơi đây đã sinh ra nhiều nhân tài, trong đó có cả những người con ưu tú của dân tộc.",
      },
      {
        type: "image",
        src: "/gia---nh-nho-h-c-ngh-o-th-i-phong-ki-n-vi-t-nam.jpg",
        alt: "Gia đình nho học nghèo thời phong kiến",
        caption: "Hình ảnh một gia đình nho học nghèo thời phong kiến Việt Nam",
      },
      {
        type: "paragraph",
        content:
          "Môi trường sống tại làng Sen đã ảnh hưởng sâu sắc đến tính cách và tư tưởng của Nguyễn Sinh Cung sau này. Từ nhỏ, Người đã thể hiện sự thông minh, ham học hỏi và có tình yêu sâu sắc với quê hương, đất nước.",
      },
      {
        type: "image",
        src: "/c-nh-quan-l-ng-qu--ngh--an-cu-i-th--k--19.jpg",
        alt: "Cảnh quan làng quê Nghệ An cuối thế kỷ 19",
        caption: "Cảnh quan yên bình của vùng quê Nghệ An cuối thế kỷ 19",
        layout: "wide",
      },
      {
        type: "paragraph",
        content:
          "Những năm tháng tuổi thơ tại làng Sen đã hun đúc nên những phẩm chất đầu tiên của một con người sau này trở thành lãnh tụ vĩ đại của dân tộc Việt Nam.",
      },
    ],
    images: [
      "/l-ng-sen-x-a-v-i-nh-ng-ng-i-nh--tranh-m-i-l--b-n-b.jpg",
      "/gia---nh-nho-h-c-ngh-o-th-i-phong-ki-n-vi-t-nam.jpg",
      "/c-nh-quan-l-ng-qu--ngh--an-cu-i-th--k--19.jpg",
    ],
  },
  {
    year: 1911,
    title: "Ra đi tìm đường cứu nước",
    slug: "ra-di-tim-duong-cuu-nuoc",
    description:
      "Rời Việt Nam trên tàu Amiral Latouche-Tréville với tên Văn Ba, bắt đầu cuộc hành trình 30 năm tìm đường cứu nước.",
    richContent: [
      {
        type: "paragraph",
        content:
          "Ngày 5 tháng 6 năm 1911, một thanh niên 21 tuổi tên Nguyễn Tất Thành đã lên tàu Amiral Latouche-Tréville tại cảng Nhà Rồng với tư cách là phụ bếp, mang theo tên giả Văn Ba.",
      },
      {
        type: "image",
        src: "/t-u-amiral-latouche-tr-ville-t-i-c-ng-nh--r-ng-n-m.jpg",
        alt: "Tàu Amiral Latouche-Tréville tại cảng Nhà Rồng",
        caption:
          "Tàu Amiral Latouche-Tréville - phương tiện đưa Nguyễn Tất Thành ra thế giới",
        layout: "wide",
      },
      {
        type: "paragraph",
        content:
          "Đây là khởi đầu cho cuộc hành trình 30 năm tìm đường cứu nước của người sau này trở thành Chủ tịch Hồ Chí Minh. Quyết định ra đi của Nguyễn Tất Thành không phải là ngẫu nhiên.",
      },
      {
        type: "paragraph",
        content:
          "Trước đó, Người đã chứng kiến sự thất bại của các phong trào yêu nước như Cần Vương, Đông Du, và nhận ra rằng để cứu nước, cần phải tìm hiểu thế giới bên ngoài, học hỏi kinh nghiệm của các dân tộc khác.",
      },
      {
        type: "image",
        src: "/thanh-ni-n-nguy-n-t-t-th-nh-tr-n-boong-t-u.jpg",
        alt: "Thanh niên Nguyễn Tất Thành trên boong tàu",
        caption: "Hình ảnh tái hiện Nguyễn Tất Thành làm việc trên tàu biển",
      },
      {
        type: "quote",
        content: "Muốn cứu nước cứu dân, phải có đường lối cách mạng đúng đắn",
        author: "Tư tưởng của Nguyễn Tất Thành khi ra đi tìm đường cứu nước",
      },
      {
        type: "paragraph",
        content:
          "Trên tàu Amiral Latouche-Tréville, Nguyễn Tất Thành không chỉ làm việc mà còn quan sát, học hỏi. Người đã đi qua nhiều nước: Pháp, Anh, Mỹ, châu Phi... Tại mỗi nơi, Người đều tìm hiểu về tình hình chính trị, xã hội.",
      },
      {
        type: "image",
        src: "/c-ng-nh--r-ng-s-i-g-n---u-th--k--20.jpg",
        alt: "Cảng Nhà Rồng Sài Gòn đầu thế kỷ 20",
        caption:
          "Cảng Nhà Rồng Sài Gòn - điểm khởi hành của cuộc hành trình lịch sử",
      },
      {
        type: "paragraph",
        content:
          "Cuộc hành trình này đã mở rộng tầm nhìn của Nguyễn Tất Thành về thế giới, giúp Người hiểu rõ hơn về bản chất của chủ nghĩa đế quốc và tìm ra con đường giải phóng dân tộc.",
      },
    ],
    images: [
      "/t-u-amiral-latouche-tr-ville-t-i-c-ng-nh--r-ng-n-m.jpg",
      "/thanh-ni-n-nguy-n-t-t-th-nh-tr-n-boong-t-u.jpg",
      "/c-ng-nh--r-ng-s-i-g-n---u-th--k--20.jpg",
    ],
  },
  {
    year: 1919,
    title: "Bản Yêu sách của nhân dân An Nam",
    slug: "ban-yeu-sach-cua-nhan-dan-an-nam",
    description:
      "Gửi Bản Yêu sách 8 điểm đến Hội nghị Versailles, đánh dấu bước đầu hoạt động chính trị quốc tế.",
    richContent: [
      {
        type: "paragraph",
        content:
          "Năm 1919, tại Paris, Nguyễn Ái Quốc đã soạn thảo và gửi 'Bản Yêu sách của nhân dân An Nam' đến Hội nghị hòa bình Versailles. Đây là lần đầu tiên tiếng nói của nhân dân Việt Nam được đưa ra trước diễn đàn quốc tế.",
      },
      {
        type: "image",
        src: "/h-i-ngh--versailles-1919-v-i-c-c-nh--l-nh---o-th--.jpg",
        alt: "Hội nghị Versailles 1919",
        caption: "Hội nghị Versailles 1919 với các nhà lãnh đạo thế giới",
        layout: "wide",
      },
      {
        type: "paragraph",
        content:
          "Bản Yêu sách gồm 8 điểm chính, bao gồm ân xá chung cho tất cả tù nhân chính trị An Nam, cải cách chế độ tư pháp, tự do báo chí và phát biểu, tự do hội họp và lập hội.",
      },
      {
        type: "quote",
        content: "Chúng tôi không cầu xin ân huệ, chúng tôi chỉ đòi công lý",
        author: "Tinh thần của Bản Yêu sách An Nam",
      },
      {
        type: "image",
        src: "/nguy-n--i-qu-c-vi-t-b-n-y-u-s-ch-t-i-paris.jpg",
        alt: "Nguyễn Ái Quốc viết Bản Yêu sách tại Paris",
        caption: "Nguyễn Ái Quốc miệt mài viết Bản Yêu sách tại Paris",
      },
      {
        type: "paragraph",
        content:
          "Mặc dù Bản Yêu sách không được Hội nghị Versailles chấp nhận, nhưng nó đã tạo tiếng vang lớn trong cộng đồng người Việt ở Pháp và quốc tế. Tên tuổi Nguyễn Ái Quốc bắt đầu được biết đến như một nhà hoạt động chính trị tài năng.",
      },
      {
        type: "image",
        src: "/b-o-ch--ph-p---a-tin-v--b-n-y-u-s-ch-an-nam.jpg",
        alt: "Báo chí Pháp đưa tin về Bản Yêu sách An Nam",
        caption:
          "Báo chí Pháp lần đầu đưa tin về Bản Yêu sách của nhân dân An Nam",
      },
      {
        type: "paragraph",
        content:
          "Sự kiện này đánh dấu bước ngoặt quan trọng trong quá trình hình thành tư tưởng chính trị của Hồ Chí Minh, từ một thanh niên yêu nước đơn thuần trở thành một nhà hoạt động chính trị có tầm nhìn quốc tế.",
      },
    ],
    images: [
      "/h-i-ngh--versailles-1919-v-i-c-c-nh--l-nh---o-th--.jpg",
      "/nguy-n--i-qu-c-vi-t-b-n-y-u-s-ch-t-i-paris.jpg",
      "/b-o-ch--ph-p---a-tin-v--b-n-y-u-s-ch-an-nam.jpg",
    ],
  },
  {
    year: 1920,
    title: "Tham gia Đảng Cộng sản Pháp",
    slug: "tham-gia-dang-cong-san-phap",
    description:
      "Tham gia thành lập Đảng Cộng sản Pháp tại Đại hội Tours, tiếp cận với chủ nghĩa Mác-Lênin.",
    richContent: [
      {
        type: "paragraph",
        content:
          "Tháng 12 năm 1920, tại Đại hội Tours của Đảng Xã hội Pháp, Nguyễn Ái Quốc đã bỏ phiếu tán thành việc gia nhập Quốc tế Cộng sản thứ III và trở thành một trong những thành viên sáng lập của Đảng Cộng sản Pháp.",
      },
      {
        type: "image",
        src: "/--i-h-i-tours-1920-th-nh-l-p---ng-c-ng-s-n-ph-p.jpg",
        alt: "Đại hội Tours 1920",
        caption: "Đại hội Tours 1920 - sự kiện thành lập Đảng Cộng sản Pháp",
        layout: "wide",
      },
      {
        type: "paragraph",
        content:
          "Đây là bước ngoặt quan trọng trong quá trình hình thành tư tưởng cách mạng của Người. Trước khi tham gia Đại hội Tours, Nguyễn Ái Quốc đã nghiên cứu kỹ các tài liệu về chủ nghĩa Mác-Lênin.",
      },
      {
        type: "image",
        src: "/t-i-li-u-m-c-l-nin-v--v-n----thu-c---a.jpg",
        alt: "Tài liệu Mác-Lênin về vấn đề thuộc địa",
        caption: "Luận cương về vấn đề dân tộc và thuộc địa của Lenin",
      },
      {
        type: "quote",
        content:
          "Tôi không hiểu hết những gì các đồng chí nói về chính trị thế giới, về chiến thuật, về lý luận... Nhưng tôi hiểu một điều: Quốc tế thứ III quan tâm đến số phận của các dân tộc thuộc địa, còn Quốc tế thứ II thì không.",
        author: "Nguyễn Ái Quốc tại Đại hội Tours",
      },
      {
        type: "paragraph",
        content:
          "Việc gia nhập Đảng Cộng sản Pháp đã giúp Nguyễn Ái Quốc tiếp cận với lý luận cách mạng khoa học, học hỏi kinh nghiệm đấu tranh của giai cấp công nhân quốc tế.",
      },
      {
        type: "image",
        src: "/nguy-n--i-qu-c-ph-t-bi-u-t-i---i-h-i.jpg",
        alt: "Nguyễn Ái Quốc phát biểu tại Đại hội",
        caption:
          "Nguyễn Ái Quốc phát biểu tại Đại hội Tours - một khoảnh khắc lịch sử",
      },
      {
        type: "paragraph",
        content:
          "Từ đây, Người bắt đầu vận dụng chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam, hình thành nên tư tưởng Hồ Chí Minh - ngọn đuốc soi đường cho cách mạng Việt Nam.",
      },
    ],
    images: [
      "/--i-h-i-tours-1920-th-nh-l-p---ng-c-ng-s-n-ph-p.jpg",
      "/nguy-n--i-qu-c-ph-t-bi-u-t-i---i-h-i.jpg",
      "/t-i-li-u-m-c-l-nin-v--v-n----thu-c---a.jpg",
    ],
  },
  {
    year: 1930,
    title: "Thành lập Đảng Cộng sản Việt Nam",
    slug: "thanh-lap-dang-cong-san-viet-nam",
    description:
      "Chủ trì Hội nghị thành lập Đảng Cộng sản Việt Nam tại Hồng Kông, thống nhất các tổ chức cộng sản trong nước.",
    fullContent: `
      Ngày 3 tháng 2 năm 1930, tại số 57 đường Caine, Hồng Kông, dưới sự chủ trì của Nguyễn Ái Quốc, Hội nghị thành lập Đảng Cộng sản Việt Nam đã diễn ra. Đây là sự kiện có ý nghĩa lịch sử to lớn, đánh dấu sự ra đời của đảng cách mạng của giai cấp công nhân Việt Nam.
      
      Trước đó, trong nước đã xuất hiện ba tổ chức cộng sản: Đông Dương Cộng sản Đảng (do Nguyễn An Ninh thành lập), An Nam Cộng sản Đảng (do Trần Phú thành lập) và Đông Dương Cộng sản Liên đoàn (do Hồ Tùng Mậu thành lập). Sự phân tán này làm suy yếu lực lượng cách mạng.
      
      Nguyễn Ái Quốc đã khéo léo thuyết phục các đại biểu về sự cần thiết phải thống nhất. Người chỉ ra rằng: "Muốn làm cách mạng thành công, phải có một đảng cách mạng thống nhất để lãnh đạo." Hội nghị đã thông qua việc thành lập Đảng Cộng sản Việt Nam (sau đổi thành Đảng Cộng sản Đông Dương).
      
      Cương lĩnh chính trị đầu tiên của Đảng do Nguyễn Ái Quốc soạn thảo, nêu rõ mục tiêu: "Đánh đổ đế quốc Pháp, phong kiến và tư bản Việt Nam; làm cho nước Việt Nam hoàn toàn độc lập; thành lập chính phủ công nông binh; liên hiệp với Liên Xô và các nước vô sản trên thế giới."
      
      Sự thành lập Đảng Cộng sản Việt Nam là kết quả của quá trình tìm tòi đường cứu nước của Nguyễn Ái Quốc và là bước ngoặt quyết định trong lịch sử cách mạng Việt Nam.
    `,
    images: [
      "/h-i-ngh--th-nh-l-p---ng-c-ng-s-n-vi-t-nam-t-i-h-ng.jpg",
      "/nguy-n--i-qu-c-ch--tr--h-i-ngh--l-ch-s-.jpg",
      "/c--ng-l-nh-ch-nh-tr----u-ti-n-c-a---ng.jpg",
    ],
  },
  {
    year: 1941,
    title: "Thành lập Việt Minh",
    slug: "thanh-lap-viet-minh",
    description:
      "Thành lập Mặt trận Việt Minh tại Pác Bó, Cao Bằng, đoàn kết toàn dân trong cuộc đấu tranh giải phóng dân tộc.",
    fullContent: `
      Ngày 19 tháng 5 năm 1941, tại hang Pác Bó, Cao Bằng, Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương đã quyết định thành lập "Việt Nam Độc lập Đồng minh Hội" (viết tắt là Việt Minh). Đây là quyết định có ý nghĩa chiến lược to lớn của Hồ Chí Minh và Đảng.
      
      Việc thành lập Việt Minh thể hiện sự chuyển biến quan trọng trong đường lối cách mạng: từ cách mạng giai cấp sang cách mạng dân tộc, đoàn kết tất cả các tầng lớp nhân dân trong cuộc đấu tranh chống thực dân Pháp và phát xít Nhật. Hồ Chí Minh đã khẳng định: "Dân tộc đại nghĩa là trên hết."
      
      Cương lĩnh của Việt Minh do Hồ Chí Minh soạn thảo, nêu rõ mục tiêu: "Đánh đuổi đế quốc Pháp, đánh đuổi phát xít Nhật, giành độc lập hoàn toàn cho Việt Nam, thành lập chính phủ dân chủ cộng hòa." Đây là lần đầu tiên khẩu hiệu "Độc lập" được đặt lên hàng đầu.
      
      Việt Minh không chỉ là một tổ chức chính trị mà còn là biểu tượng của khối đại đoàn kết toàn dân tộc. Dưới ngọn cờ Việt Minh, các tầng lớp nhân dân Việt Nam đã đoàn kết chiến đấu, tạo nên sức mạnh to lớn dẫn đến thành công của Cách mạng tháng Tám 1945.
      
      Pác Bó không chỉ là nơi thành lập Việt Minh mà còn là nơi Hồ Chí Minh sống và làm việc trong thời gian quan trọng này, chuẩn bị cho cuộc tổng khởi nghĩa giành chính quyền.
    `,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=350&width=550",
    ],
  },
  {
    year: 1945,
    title: "Tuyên bố Độc lập",
    slug: "tuyen-bo-doc-lap",
    description:
      "Đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, thành lập nước Việt Nam Dân chủ Cộng hòa.",
    richContent: [
      {
        type: "paragraph",
        content:
          "Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Hà Nội, trước sự chứng kiến của hơn 500.000 đồng bào, Chủ tịch Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập, tuyên bố thành lập nước Việt Nam Dân chủ Cộng hòa.",
      },
      {
        type: "quote",
        content:
          "Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.",
        author: "Câu mở đầu bất hủ của Tuyên ngôn Độc lập",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=600",
        alt: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
        caption:
          "Khoảnh khắc lịch sử: Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình",
        layout: "wide",
      },
      {
        type: "paragraph",
        content:
          "Bản Tuyên ngôn Độc lập do chính Hồ Chí Minh soạn thảo, Người đã khéo léo viện dẫn Tuyên ngôn Độc lập của Mỹ (1776) và Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp (1791) để lên án chính những kẻ đã từng tuyên bố những nguyên tắc này.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500",
        alt: "500.000 đồng bào tại Quảng trường Ba Đình",
        caption:
          "Biển người tại Quảng trường Ba Đình chứng kiến khoảnh khắc độc lập",
      },
      {
        type: "paragraph",
        content:
          "Trong bản Tuyên ngôn, Hồ Chí Minh đã liệt kê những tội ác của thực dân Pháp đối với nhân dân Việt Nam trong suốt gần 80 năm đô hộ, đồng thời khẳng định quyền độc lập thiêng liêng của dân tộc Việt Nam.",
      },
      {
        type: "quote",
        content:
          "Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã trở thành một nước tự do và độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do và độc lập ấy.",
        author: "Lời kết thúc của Tuyên ngôn Độc lập",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=350&width=550",
        alt: "Lá cờ Việt Nam tung bay",
        caption:
          "Lá cờ đỏ sao vàng tung bay trong gió - biểu tượng của độc lập và tự do",
      },
      {
        type: "paragraph",
        content:
          "Ngày 2-9-1945 đã trở thành Quốc khánh của nước Việt Nam, mở ra kỷ nguyên mới trong lịch sử dân tộc - kỷ nguyên độc lập, tự do và chủ quyền.",
      },
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=350&width=550",
    ],
  },
  {
    year: 1946,
    title: "Kêu gọi toàn quốc kháng chiến",
    slug: "keu-goi-toan-quoc-khang-chien",
    description:
      "Phát lời kêu gọi toàn quốc kháng chiến chống thực dân Pháp trở lại xâm lược.",
    fullContent: `
      Ngày 19 tháng 12 năm 1946, sau khi thực dân Pháp tấn công Hà Nội và các thành phố lớn, Chủ tịch Hồ Chí Minh đã phát lời kêu gọi toàn quốc kháng chiến lịch sử. Lời kêu gọi này đã thức tỉnh toàn thể dân tộc Việt Nam đứng lên đấu tranh bảo vệ độc lập, tự do của Tổ quốc.
      
      Trong lời kêu gọi, Người khẳng định: "Chúng ta muốn hòa bình, chúng ta phải nhượng bộ. Nhưng càng nhượng bộ, thực dân Pháp càng lấn tới, vì chúng quyết tâm cướp nước ta một lần nữa. Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ."
      
      Lời kêu gọi đã nêu rõ tinh thần quyết tử cho Tổ quốc quyết sinh: "Hỡi đồng bào cả nước! Chúng ta phải đứng lên! Nam nữ, già trẻ, không phân biệt tôn giáo, đảng phái, dân tộc, hễ là người Việt Nam thì phải đứng lên đánh thực dân Pháp cứu Tổ quốc."
      
      Người cũng chỉ rõ bản chất và mục đích của cuộc kháng chiến: "Cuộc kháng chiến này sẽ là cuộc kháng chiến lâu dài và gian khổ. Vì thực dân Pháp không những có vũ khí tốt mà còn có sự giúp đỡ của đế quốc Mỹ. Nhưng chúng ta nhất định thắng lợi, vì chúng ta có nghĩa, chúng ta có dân."
      
      Lời kêu gọi kháng chiến của Hồ Chí Minh đã trở thành ngọn đuốc soi đường cho toàn dân tộc trong suốt 9 năm kháng chiến chống thực dân Pháp (1946-1954), dẫn đến thắng lợi vĩ đại tại Điện Biên Phủ.
    `,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=350&width=550",
    ],
  },
  {
    year: 1954,
    title: "Chiến thắng Điện Biên Phủ",
    slug: "chien-thang-dien-bien-phu",
    description:
      "Chỉ đạo chiến dịch Điện Biên Phủ, 'lừng lẫy năm châu, chấn động địa cầu', kết thúc ách đô hộ của thực dân Pháp.",
    fullContent: `
      Ngày 7 tháng 5 năm 1954, pháo đài Điện Biên Phủ sụp đổ, đánh dấu thắng lợi vĩ đại của quân và dân ta trong cuộc kháng chiến chống thực dân Pháp. Đây là thắng lợi có ý nghĩa lịch sử to lớn, "lừng lẫy năm châu, chấn động địa cầu", kết thúc gần một thế kỷ đô hộ của thực dân Pháp tại Đông Dương.
      
      Chiến dịch Điện Biên Phủ được Chủ tịch Hồ Chí Minh và Trung ương Đảng quyết định tiến hành với mục tiêu tiêu diệt một bộ phận quan trọng lực lượng cơ động của địch, buộc thực dân Pháp phải ký kết hiệp định đình chiến có lợi cho ta.
      
      Dưới sự chỉ đạo trực tiếp của Chủ tịch Hồ Chí Minh và sự chỉ huy tài tình của Đại tướng Võ Nguyên Giáp, quân và dân ta đã thực hiện cuộc vận chuyển hậu cần "không tưởng tượng nổi" qua những con đường mòn Trường Sơn hiểm trở.
      
      Trong 56 ngày đêm (từ 13-3 đến 7-5-1954), bằng tinh thần "quyết chiến, quyết thắng", quân dân ta đã bao vây và tiến công liên tục, cuối cùng hoàn toàn tiêu diệt Tập đoàn cứ điểm Điện Biên Phủ, bắt sống Tư lệnh de Castries cùng toàn bộ bộ tham mưu.
      
      Thắng lợi Điện Biên Phủ không chỉ có ý nghĩa đối với Việt Nam mà còn có tác động to lớn đến phong trào giải phóng dân tộc trên toàn thế giới. Nó chứng minh rằng một dân tộc nhỏ bé nhưng đoàn kết, có ý chí quyết tâm cao có thể đánh bại một đế quốc lớn.
      
      Chủ tịch Hồ Chí Minh đã viết: "Điện Biên Phủ là một thắng lợi vĩ đại của quân và dân ta. Nhưng chúng ta không được kiêu ngạo. Thắng lợi này là do sự đoàn kết của toàn dân, sự lãnh đạo đúng đắn của Đảng và sự giúp đỡ của các nước anh em."
    `,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=350&width=550",
    ],
  },
  {
    year: 1969,
    title: "Chủ tịch Hồ Chí Minh từ trần",
    slug: "chu-tich-ho-chi-minh-tu-tran",
    description:
      "Chủ tịch Hồ Chí Minh từ trần tại Hà Nội, để lại di sản tư tưởng vô giá cho dân tộc Việt Nam và nhân loại tiến bộ.",
    fullContent: `
      Ngày 2 tháng 9 năm 1969, đúng 24 năm sau ngày Người đọc Tuyên ngôn Độc lập, Chủ tịch Hồ Chí Minh đã từ trần tại Hà Nội trong sự tiếc thương vô hạn của toàn thể nhân dân Việt Nam và bạn bè quốc tế. Người ra đi khi cuộc kháng chiến chống Mỹ cứu nước vẫn đang diễn ra ác liệt.
      
      Trong những năm cuối đời, mặc dù tuổi cao sức yếu, Chủ tịch Hồ Chí Minh vẫn không ngừng quan tâm đến vận mệnh của đất nước và nhân dân. Người đã để lại bản Di chúc thiêng liêng, thể hiện tấm lòng yêu nước, yêu dân vô bờ bến và những tư tưởng sâu sắc về xây dựng đất nước, xây dựng con người.
      
      Trong Di chúc, Người viết: "Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh, góp phần xứng đáng vào sự nghiệp cách mạng thế giới."
      
      Về xây dựng Đảng, Người dặn dò: "Đảng ta là đảng cầm quyền. Mỗi đảng viên, mỗi cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, thật sự chí công vô tư. Phải giữ gìn Đảng ta thật trong sạch, phải xứng đáng là người lãnh đạo, là người đầy tớ thật trung thành của nhân dân."
      
      Tư tưởng Hồ Chí Minh không chỉ là di sản quý báu của dân tộc Việt Nam mà còn là tài sản chung của nhân loại tiến bộ. Những giá trị về độc lập dân tộc gắn liền với chủ nghĩa xã hội, về dân chủ, về đại đoàn kết dân tộc, về đạo đức cách mạng... vẫn còn nguyên giá trị và là ngọn đuốc soi đường cho các thế hệ hôm nay và mai sau.
    `,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=350&width=550",
    ],
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

    const tl = gsap.timeline();

    // Animate content sections
    tl.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy sự kiện
          </h1>
          <button
            onClick={() => router.push("/")}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Quay về Timeline
          </button>
        </div>
      </div>
    );
  }

  const contentItems = event.richContent || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Quay về Timeline</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article
          ref={contentRef}
          // className="bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100 overflow-hidden shadow-xl"
        >
          {/* Article Header */}
          <div className="relative px-8 pt-12 pb-8 text-center border-b border-red-100">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-amber-50/50"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-full">
                  <Calendar className="w-8 h-8 text-red-600" />
                </div>
                <span className="text-4xl font-bold text-red-700 font-serif">
                  {event.year}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif leading-tight text-balance">
                {event.title}
              </h1>

              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 leading-relaxed text-pretty italic mb-6">
                  {event.description}
                </p>

                {/* <div className="inline-flex items-center px-4 py-2 bg-white/60 rounded-full border border-red-200">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeClass(event.importance)}`}>
                    {event.category}
                  </span>
                </div> */}
              </div>

            </div>
          </div>

          <div className="px-8 py-8">
            {/* Blog Content with Rich Text */}
            <div className="prose prose-lg max-w-none">
              {contentItems.map((item, index) => {
                if (item.type === "paragraph") {
                  return (
                    <div key={index} className="mb-8">
                      <div className="relative">
                        {/* Add decorative quote for first paragraph */}
                        {index === 0 && (
                          <div className="absolute -left-4 top-0 text-6xl text-red-200 font-serif leading-none select-none">
                            "
                          </div>
                        )}

                        <p
                          className={`text-lg text-gray-700 leading-relaxed text-justify font-sans ${
                            index === 0
                              ? "first-letter:text-5xl first-letter:font-bold first-letter:text-red-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:font-serif"
                              : ""
                          }`}
                          style={{
                            lineHeight: '1.8',
                            wordSpacing: '0.1em',
                            textAlign: 'justify',
                            hyphens: 'auto',
                            fontFeatureSettings: '"liga", "kern"'
                          }}
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                }

                if (item.type === "image") {
                  return (
                    <figure
                      key={index}
                      className={`my-10 ${
                        item.layout === "wide" ? "-mx-4 md:-mx-8" : ""
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg group">
                        <img
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt}
                          className={`w-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ${
                            item.layout === "wide"
                              ? "h-64 md:h-96"
                              : "h-56 md:h-80"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all duration-300"></div>
                      </div>
                      {item.caption && (
                        <figcaption 
                          className="text-center text-sm text-gray-500 mt-4 italic px-4"
                          style={{
                            lineHeight: '1.5',
                            fontFeatureSettings: '"liga", "kern"'
                          }}
                        >
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (item.type === "quote") {
                  return (
                    <blockquote
                      key={index}
                      className="my-8 p-6 bg-gradient-to-r from-red-50 to-amber-50 border-l-4 border-red-600 rounded-r-lg"
                    >
                      <p 
                        className="text-xl font-medium text-red-800 italic text-center"
                        style={{
                          lineHeight: '1.6',
                          wordSpacing: '0.05em',
                          fontFeatureSettings: '"liga", "kern"'
                        }}
                      >
                        "{item.content}"
                      </p>
                      {item.author && (
                        <cite 
                          className="block text-right text-sm text-red-600 mt-3 font-semibold"
                          style={{
                            fontStyle: 'normal',
                            fontFeatureSettings: '"liga", "kern"'
                          }}
                        >
                          — {item.author}
                        </cite>
                      )}
                    </blockquote>
                  );
                }

                return null;
              })}

              {/* Article conclusion */}
              {/* <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <Calendar className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 font-serif">
                    Ý nghĩa lịch sử
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Sự kiện "{event.title}" năm {event.year} đã để lại dấu ấn
                    sâu đậm trong lịch sử dân tộc, thể hiện tinh thần và góp phần quan trọng vào
                    việc xây dựng đất nước Việt Nam như ngày hôm nay.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="px-8 py-8 bg-gradient-to-r from-red-50/80 to-amber-50/80 border-t border-red-100">
            <div className="flex justify-between items-center gap-4">
              {currentIndex > 0 ? (
                <button
                  onClick={() =>
                    router.push(
                      `/timeline/${timelineData[currentIndex - 1].slug}`
                    )
                  }
                  className="flex items-center gap-3 text-red-700 hover:text-red-800 transition-all duration-200 group bg-white/70 px-6 py-3 rounded-xl border border-red-200 hover:bg-white/90 hover:shadow-md"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Sự kiện trước
                    </div>
                    <div className="font-medium truncate max-w-[200px]">
                      {timelineData[currentIndex - 1].title}
                    </div>
                  </div>
                </button>
              ) : (
                <div className="w-[200px]"></div>
              )}

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">
                  {currentIndex + 1} / {timelineData.length}
                </div>
                <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{
                      width: `${
                        ((currentIndex + 1) / timelineData.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {currentIndex < timelineData.length - 1 ? (
                <button
                  onClick={() =>
                    router.push(
                      `/timeline/${timelineData[currentIndex + 1].slug}`
                    )
                  }
                  className="flex items-center gap-3 text-red-700 hover:text-red-800 transition-all duration-200 group bg-white/70 px-6 py-3 rounded-xl border border-red-200 hover:bg-white/90 hover:shadow-md"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Sự kiện tiếp theo
                    </div>
                    <div className="font-medium truncate max-w-[200px]">
                      {timelineData[currentIndex + 1].title}
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="w-[200px]"></div>
              )}
            </div>
          </div>
        </article>
      </div>

      <ModelWithChat />
    </div>
  );
}
