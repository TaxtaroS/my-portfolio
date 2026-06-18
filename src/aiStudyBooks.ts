type StudyBook = {
  subject: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  core: string;
  capability: string;
};

const studyBooks: StudyBook[] = [
  {
    subject: "html/css",
    date: "2022.04.25",
    title: "코딩 자율학습 HTML + CSS + 자바스크립트",
    image: "/study/books/html-css-js.jpg",
    alt: "코딩 자율학습 HTML CSS 자바스크립트 표지",
    core: "웹 문서 구조, 스타일링, 기본 인터랙션을 익히고 현재 포트폴리오의 한 페이지 구성으로 연결했습니다.",
    capability: "정적 페이지 구현, 반응형 레이아웃, DOM 이벤트 처리",
  },
  {
    subject: "자바스크립트/타입스크립트",
    date: "2020.09.25",
    title: "모던 자바스크립트 Deep Dive",
    image: "/study/books/js-deep-dive.jpg",
    alt: "모던 자바스크립트 Deep Dive 표지",
    core: "스코프, 실행 컨텍스트, 프로토타입, 비동기 처리처럼 자바스크립트가 동작하는 원리를 학습했습니다.",
    capability: "JS 코드 흐름 분석, 비동기 로직 이해, 오류 원인 추적",
  },
  {
    subject: "리액트JS",
    date: "2019.08.31",
    title: "리액트를 다루는 기술",
    image: "/study/books/react-art.jpg",
    alt: "리액트를 다루는 기술 표지",
    core: "컴포넌트, Hooks, 상태 관리, 라우팅, API 연동의 흐름을 익히며 프론트엔드 구조를 이해했습니다.",
    capability: "컴포넌트 분리, 상태 기반 UI, API 연동 화면 구성",
  },
  {
    subject: "리액트 모바일",
    date: "2021.02.01",
    title: "처음 배우는 리액트 네이티브",
    image: "/study/books/react-native.jpg",
    alt: "처음 배우는 리액트 네이티브 표지",
    core: "Expo, 모바일 컴포넌트, 내비게이션, 앱 화면 구성 방식을 학습했습니다.",
    capability: "기본 모바일 화면 구성, 탭/스택 내비게이션 이해",
  },
  {
    subject: "노드JS",
    date: "2018.10.20",
    title: "Node.js 디자인 패턴",
    image: "/study/books/node-patterns.jpg",
    alt: "Node.js 디자인 패턴 표지",
    core: "모듈, 비동기 제어, 스트림, 서버 설계 패턴을 통해 백엔드 구조화 관점을 익혔습니다.",
    capability: "Node 서버 구조 이해, 비동기 흐름 설계, 모듈 분리",
  },
  {
    subject: "데이터베이스",
    date: "2021.08.05",
    title: "데이터베이스 시스템",
    image: "/study/books/database-system.jpg",
    alt: "데이터베이스 시스템 표지",
    core: "관계형 모델, SQL, 정규화, 트랜잭션, 인덱스와 질의 처리의 기본을 학습했습니다.",
    capability: "테이블 설계, SQL 작성, 데이터 일관성 관점 이해",
  },
  {
    subject: "클라우드서비스",
    date: "2022.08.26",
    title: "모두를 위한 클라우드 컴퓨팅",
    image: "/study/books/cloud-computing.jpg",
    alt: "모두를 위한 클라우드 컴퓨팅 표지",
    core: "가상화, 컨테이너, 도커, 쿠버네티스, CI/CD, AWS 개념을 실습 중심으로 익혔습니다.",
    capability: "배포 환경 이해, 컨테이너와 클라우드 구조 설명",
  },
  {
    subject: "AIaaS 개발 프로젝트",
    date: "2023.06.15",
    title: "Do it! 점프 투 파이썬",
    image: "/study/books/jump-to-python.jpg",
    alt: "Do it 점프 투 파이썬 표지",
    core: "파이썬 문법, 자료형, 함수, 모듈, 파일 처리의 기본기를 프로젝트 학습의 기반으로 삼았습니다.",
    capability: "파이썬 스크립트 작성, 데이터 처리 기초, 자동화 코드 작성",
  },
  {
    subject: "파이썬 데이터분석",
    date: "2013.10.01",
    title: "파이썬 라이브러리를 활용한 데이터 분석",
    image: "/study/books/python-data-analysis.jpg",
    alt: "파이썬 라이브러리를 활용한 데이터 분석 표지",
    core: "NumPy, pandas, matplotlib, Jupyter를 활용한 데이터 정제와 분석 흐름을 학습했습니다.",
    capability: "pandas 전처리, 기초 시각화, 분석용 데이터 정리",
  },
  {
    subject: "fast api 웹 서버",
    date: "2023.03.22",
    title: "FastAPI를 사용한 파이썬 웹 개발",
    image: "/study/books/fastapi-python.jpg",
    alt: "FastAPI를 사용한 파이썬 웹 개발 표지",
    core: "라우팅, 응답 모델, DB 연결, 인증, 테스트, 도커 배포까지 API 서버 개발 흐름을 익혔습니다.",
    capability: "FastAPI REST API 작성, 데이터 모델링, 간단한 서버 배포 흐름 이해",
  },
  {
    subject: "머신러닝/딥러닝 기초",
    date: "2017.12.27",
    title: "모두의 딥러닝",
    image: "/study/books/deep-learning-everyone.jpg",
    alt: "모두의 딥러닝 표지",
    core: "머신러닝과 딥러닝의 기본 개념, 신경망, 분류/예측 문제를 입문자 관점에서 학습했습니다.",
    capability: "AI 모델 학습 흐름 설명, 기본 분류/예측 문제 이해",
  },
  {
    subject: "딥러닝 활용 영상",
    date: "2019.06.18",
    title: "실체가 손에 잡히는 딥러닝",
    image: "/study/books/hands-on-deep-learning.jpg",
    alt: "실체가 손에 잡히는 딥러닝 표지",
    core: "신경망, 역전파, CNN을 수식과 코드로 따라가며 딥러닝 내부 동작을 이해했습니다.",
    capability: "역전파 개념 설명, CNN 구조 이해, 코드 기반 딥러닝 실습",
  },
  {
    subject: "딥러닝 활용 자연어",
    date: "2021.01.29",
    title: "자연어 처리와 딥러닝",
    image: "/study/books/nlp-deep-learning.jpg",
    alt: "자연어 처리와 딥러닝 표지",
    core: "텍스트를 벡터로 표현하고, 딥러닝 기반으로 언어를 분석·이해하는 기본 흐름을 학습했습니다.",
    capability: "NLP 기본 개념 설명, 텍스트 전처리와 임베딩 흐름 이해",
  },
];

function appendText<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  text: string,
) {
  const element = document.createElement(tagName);
  element.textContent = text;
  return element;
}

export function renderAiStudyBooks(container: HTMLElement) {
  container.replaceChildren();

  studyBooks.forEach((book) => {
    const card = document.createElement("article");
    card.className = "study-book-card";

    const image = document.createElement("img");
    image.src = book.image;
    image.alt = book.alt;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.append(
      appendText("span", `${book.subject} · ${book.date}`),
      appendText("h4", book.title),
      appendText("p", book.core),
      appendText("strong", `할 수 있는 것: ${book.capability}`),
    );

    card.append(image, content);
    container.append(card);
  });
}
