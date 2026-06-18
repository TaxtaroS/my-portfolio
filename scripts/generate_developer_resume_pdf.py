from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "documents" / "developer-resume-choi-woohyoung.pdf"
FONT_DIR = Path("C:/Windows/Fonts")


def register_fonts():
    pdfmetrics.registerFont(TTFont("Malgun", str(FONT_DIR / "malgun.ttf")))
    pdfmetrics.registerFont(TTFont("Malgun-Bold", str(FONT_DIR / "malgunbd.ttf")))


def p(text, style):
    return Paragraph(text, style)


def bullets(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        bulletFontName="Malgun",
        bulletFontSize=7,
        leftIndent=12,
        bulletIndent=0,
        spaceBefore=2,
        spaceAfter=4,
    )


def section(title, styles):
    return [
        Spacer(1, 6),
        Paragraph(title, styles["Section"]),
        Spacer(1, 4),
    ]


register_fonts()

base = getSampleStyleSheet()
styles = {
    "Name": ParagraphStyle(
        "Name",
        parent=base["Normal"],
        fontName="Malgun-Bold",
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#0f3d2e"),
        alignment=TA_LEFT,
        wordWrap="CJK",
        spaceAfter=3,
    ),
    "Role": ParagraphStyle(
        "Role",
        parent=base["Normal"],
        fontName="Malgun",
        fontSize=9.2,
        leading=12,
        textColor=colors.HexColor("#374151"),
        wordWrap="CJK",
        spaceAfter=8,
    ),
    "Section": ParagraphStyle(
        "Section",
        parent=base["Normal"],
        fontName="Malgun-Bold",
        fontSize=11.2,
        leading=13.5,
        textColor=colors.HexColor("#14532d"),
        wordWrap="CJK",
        spaceBefore=2,
        spaceAfter=2,
    ),
    "Body": ParagraphStyle(
        "Body",
        parent=base["Normal"],
        fontName="Malgun",
        fontSize=8.0,
        leading=11.0,
        textColor=colors.HexColor("#111827"),
        wordWrap="CJK",
        spaceAfter=4,
    ),
    "Small": ParagraphStyle(
        "Small",
        parent=base["Normal"],
        fontName="Malgun",
        fontSize=7.3,
        leading=9.5,
        textColor=colors.HexColor("#4b5563"),
        wordWrap="CJK",
        spaceAfter=3,
    ),
    "BoldBody": ParagraphStyle(
        "BoldBody",
        parent=base["Normal"],
        fontName="Malgun-Bold",
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor("#111827"),
        wordWrap="CJK",
        spaceAfter=2,
    ),
}

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    rightMargin=12 * mm,
    leftMargin=12 * mm,
    topMargin=12 * mm,
    bottomMargin=11 * mm,
    title="최우형 개발자 이력서",
    author="최우형",
)

story = []
story.append(p("최우형", styles["Name"]))
story.append(
    p(
        "AI 풀스택 개발자 지원자 | Web Publisher | 현장 문제 해결형 개발자",
        styles["Role"],
    )
)

contact = Table(
    [
        [
            p("Phone  010-9807-1543", styles["Small"]),
            p("Email  cwhsin76@gmail.com", styles["Small"]),
        ],
        [
            p("GitHub  github.com/TaxtaroS", styles["Small"]),
            p("Blog  taxtaros.tistory.com", styles["Small"]),
        ],
        [
            p("Portfolio  my-portfolio-ten-khaki-82.vercel.app", styles["Small"]),
            p("Location  Wonju, Gangwon-do", styles["Small"]),
        ],
    ],
    colWidths=[93 * mm, 93 * mm],
)
contact.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f4f8f5")),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#d7e5da")),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#e5e7eb")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )
)
story.extend([contact, Spacer(1, 5)])

story += section("프로필", styles)
story.append(
    p(
        "건설, 태양광, 의료기기 제조 현장에서 17년 이상 CAD 설계, 공무, 생산, 설비 유지 보수, 재고, 인사, 물류 흐름을 경험했습니다. "
        "현재는 한컴 AI 아카데미에서 Python, JavaScript, React, Database, Cloud, AI 활용을 배우며 현장 문제를 이해하는 풀스택 개발자로 전환하고 있습니다. "
        "현장을 구조적으로 보는 시야와 끝까지 완수하는 실행력을 개발 역량과 연결하겠습니다.",
        styles["Body"],
    )
)

story += section("핵심 강점", styles)
story.append(
    bullets(
        [
            "현장 이해력: 건설, 태양광, 의료기기 제조 흐름을 직접 경험해 실제 업무 문제를 빠르게 파악합니다.",
            "구조적 사고: CAD 도면, 공무, 설비 관리 경험을 바탕으로 복잡한 문제를 단계별로 정리합니다.",
            "실행력: 해외 출장, 스마트공장 구축, 생산 라인 운영 경험으로 책임지고 결과를 만드는 태도를 갖췄습니다.",
            "개발 전환 역량: 웹 포트폴리오 제작, JavaScript 인터랙션 구현, Vercel 배포 경험을 쌓고 있습니다.",
        ],
        styles["Body"],
    )
)

story += section("기술 역량", styles)
skill_table = Table(
    [
        [p("Frontend", styles["BoldBody"]), p("HTML, CSS, JavaScript, React 학습, 반응형 페이지, DOM 이벤트", styles["Body"])],
        [p("Backend / Data", styles["BoldBody"]), p("Python, Database, Cloud 기초 학습, API와 데이터 흐름 이해", styles["Body"])],
        [p("AI / Tools", styles["BoldBody"]), p("AI 프로그래밍 학습, GitHub, Vercel, Tistory, 문서화와 기록", styles["Body"])],
        [p("Field Tools", styles["BoldBody"]), p("CAD, Excel, SketchUp, NX, Photoshop, 생산/설비/재고 관리 경험", styles["Body"])],
    ],
    colWidths=[34 * mm, 152 * mm],
)
skill_table.setStyle(
    TableStyle(
        [
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#d1d5db")),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#e5e7eb")),
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f4f8f5")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ("RIGHTPADDING", (0, 0), (-1, -1), 7),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )
)
story.append(skill_table)

story += section("개발 포트폴리오", styles)
story.append(
    KeepTogether(
        [
            p("개인 포트폴리오 웹사이트", styles["BoldBody"]),
            p("HTML, CSS, TypeScript, Vite, Vercel", styles["Small"]),
            bullets(
                [
                    "경력 요약, 포트폴리오 카드, PDF 이력서 모달, 영상 모달, 자격증 모달을 포함한 정적 웹사이트를 제작했습니다.",
                    "스크롤 이동, 타이핑 효과, 모달 제어, 연락 폼 요청 처리 등 사용자 흐름에 필요한 인터랙션을 구현했습니다.",
                    "Vercel 배포를 통해 실제 접근 가능한 포트폴리오 URL을 운영하고 있습니다.",
                ],
                styles["Body"],
            ),
        ]
    )
)

story += section("주요 경력", styles)
career_rows = [
    ["2024.02 - 2025.05", "성창메디칼", "차장", "의료기기 생산 설비 조작, 재고/발주/인사/시설 관리"],
    ["2021.03 - 2024.02", "네오메디텍", "차장", "의료기기 부목 생산, 설비 유지 보수, 공장 운영 관리"],
    ["2019.01 - 2021.02", "보타리에너지", "과장", "태양광 발전소 설치/관리, CAD 도면, 관공서·학교 공사"],
    ["2004.04 - 2019.01", "건설/시설 관련 회사", "사원-총무", "현장 공무, 견적/입찰 보조, CAD, 인력·재무 관리"],
]
career_table = Table(
    [[p(c, styles["Small"]) for c in row] for row in career_rows],
    colWidths=[29 * mm, 36 * mm, 17 * mm, 104 * mm],
    repeatRows=0,
)
career_table.setStyle(
    TableStyle(
        [
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#d1d5db")),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#e5e7eb")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )
)
story.append(career_table)

story += section("프로젝트 / 해외 경험", styles)
story.append(
    bullets(
        [
            "강원형 스마트공장 보급확산사업: MES, 클린룸, 모니터링 전광판 도입으로 생산량 증가와 고용 유지에 기여",
            "인도 출장: Cast M/C 수출과 설치 관련 업무 수행",
            "중국 출장: Cast M/C, Splint M/C 제작 감수",
        ],
        styles["Body"],
    )
)

story += section("교육 및 자격", styles)
story.append(
    bullets(
        [
            "한컴 AI 아카데미: Python, JavaScript, React, AI, Database, Cloud 서비스 프로그래밍 과정",
            "원주 폴리텍대학: 설비보전기능사 과정",
            "정보처리 산업기사 필기합격, 설비보전기능사, 2급 소방안전관리자, 건설기계조종사면허, 1종대형운전면허",
            "강원관광대 건축학 / 건축과 졸업",
        ],
        styles["Body"],
    )
)

doc.build(story)
print(OUT)
