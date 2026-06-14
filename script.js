
(function(){
// spen 요소 노드 가져오기
const spanEl = document.querySelector("main h2 span");
// 화면에 표시할 문구 배열
const txtArr = [ "Web Publisher", "Front-end Developer", "web UI Designer", "Ux Designer", "back-End Developer"];
// 배열 인뎃스 초기값
let index = 0;
// 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤, 배열로 만들기
let currentTxt = txtArr[index].split("");  //문자 하나씩 나누기
// 한 글자씩 추가하기 위한 변수
function writeTxt(){           //글자 추가 함수   
    spanEl.textContent += currentTxt.shift();    //shift():배열의 맨 앞 요소를 제거하고 반환
    if(currentTxt.length !== 0){             // 글자가 남은게 0이 아니라면 !와깥아질때까지 반복  
        setTimeout(writeTxt, Math.floor(Math.random() * 100));   //0~100사이의 랜덤한 시간 후에 다시 글자 추가
    } else {
        currentTxt = spanEl.textContent.split("");  //문장이 다 써지면 다시 배열로 만들기
        setTimeout(deleteTxt, 3000);  //3초 후에 글자 삭제 시작
    } 
}
// 한 글자씩 삭제하기 위한 변수
function deleteTxt(){
    currentTxt.pop();
    spanEl.textContent = currentTxt.join("");
    if(currentTxt.length !== 0){
        setTimeout(deleteTxt, Math.floor(Math.random() * 100));
    } else {
        index = (index + 1) % txtArr.length;
        currentTxt = txtArr[index].split("");
        writeTxt();
     }         
}
writeTxt();
})(); 
        // 헤더 스크롤  아래쪽으로 움직이기시  이벤트
const headerEl = document.querySelector("header");
window.addEventListener("scroll", function(){
    const browerScrollY = window.pageYOffset;       //브라우저의 Y축 스크롤 위치값
    if(browerScrollY> 0){                           //스크롤 위치가 0보다 크면
        headerEl.classList.add("active");          //헤더에 active 클래스 추가
    } else {
        headerEl.classList.remove("active");      //스크롤 위치가 0이면 active 클래스 제거
    }
});
// 헤더 스크롤 이벤트 끝

const headerEl1 = document.querySelector("header");
window.addEventListener("scroll", function(){
    this.requestAnimationFrame(scrollCheck);         //스크롤 체크 함수 호출
});
    // 헤더 스크롤 위쪽으로 드레그시 이벤트
function scrollCheck(){                          //스크롤 체크 함수
    const browerScrollY = window.pageYOffset;    //브라우저의 Y축 스크롤 위치값
    if(browerScrollY> 0){                         //스크롤 위치가 0보다 크면
        headerEl1.classList.add("active");        //헤더에 active 클래스 추가
    } else {
        headerEl1.classList.remove("active");    //스크롤 위치가 0이면 active 클래스 제거
    }
}
// 헤더 스크롤 이벤트 끝
const animationMove =function(selector){            //스크롤 이동 함수
    const targetEl = document.querySelector(selector);    //선택자에 해당하는 요소 노드 가져오기
    const browserScrollY = window.pageYOffset;            //브라우저의 Y축 스크롤 위치값
    const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY;   //요소의 화면 위치 + 브라우저 Y축 스크롤 위치값
    // fixed header의 높이를 고려하여 스크롤 위치 조정
    const headerHeight = headerEl.offsetHeight;           // 헤더 높이 가져오기
    const adjustedScrollY = targetScrollY - headerHeight; // 헤더 높이만큼 빼기
    window.scrollTo({                              /*스크롤 이동 메서드 */
                      top: adjustedScrollY,
                      behavior: "smooth"
    });                                             //스크롤 부드럽게 이동
}
      //    헤더에서 버튼 이용시(click) 스크롤 이동 이벤트
const scrollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");  //스크롤 이동 요소 노드 가져오기
for(let i=0; i<scrollMoveEl.length; i++){            //스크롤 이동 요소 개수만큼 반복
    scrollMoveEl[i].addEventListener("click", function(e){   //스크롤 이동 요소 클릭시
        const target = this.dataset.target;          //data-target 속성값 가져오기
        animationMove(target);                        //스크롤 이동 함수 호출
    });
};
// 헤더 스크롤 이동 이벤트 끝





//  스크롤 애니메이션 효과 이벤트   
const scrollAnimationEl = document.querySelectorAll("[data-animation='true']"); //스크롤 애니메이션 요소 노드 가져오기
window.addEventListener("scroll", function(){
    for(let i=0; i<scrollAnimationEl.length; i++){   //스크롤 애니메이션 요소 개수만큼 반복     
        const el = scrollAnimationEl[i];            //스크롤 애니메이션 요소
        const elClientRect = el.getBoundingClientRect().top; //요소의 화면 위치값



        if(window.innerHeight > elClientRect + 100){   //브라우저 높이값이 요소의 화면 위치값보다 클 때
            el.classList.add("active");               //스크롤 애니메이션 요소에 active 클래스 추가
        }       

    }
});
//  스크롤 애니메이션 효과 이벤트 끝
// 푸터 현재 연도 표시
const thisYearEl = document.querySelector(".this-year");
const thisYear = new Date().getFullYear();
thisYearEl.textContent = thisYear;
// 푸터 현재 연도 표시 끝

// 모바일 메뉴 열기/닫기
const menuOpenEl = document.querySelector(".menu-open");
const menuCloseEl = document.querySelector(".menu-close");
const mobileMenuEl = document.querySelector(".mobile-menu");
menuOpenEl.addEventListener("click", function(){
    mobileMenuEl.classList.add("active");
});
menuCloseEl.addEventListener("click", function(){
    mobileMenuEl.classList.remove("active");
}

);
// 모바일 메뉴 열기/닫기 끝

// 소설 링크 추가 기능
document.getElementById('add-link-btn').addEventListener('click', function() {  // 버튼 클릭 시 실행
    const selection = window.getSelection();         // 선택된 텍스트 가져오기
    if (selection.rangeCount > 0) {                    // 선택된 텍스트가 있으면
        const selectedText = selection.toString();     // 선택된 텍스트 문자열로 변환
        if (selectedText) {                            // 선택된 텍스트가 비어있지 않으면
            const url = prompt('https://taxtaros.blogspot.com');  // 사용자에게 링크 URL 입력 받기
            if (url) {                                  // URL이 입력되었으면
                const range = selection.getRangeAt(0);     // 선택된 텍스트의 범위 가져오기
                const link = document.createElement('a');  // 앵커 요소 생성
                link.href = url;                             // 링크 URL 설정
                link.target = '_blank';                    // 새 탭에서 열기     
                link.textContent = selectedText;          // 앵커 텍스트 설정
                range.deleteContents();              // 선택된 텍스트 삭제
                range.insertNode(link);               // 앵커 요소 삽입
            }
        } else {
            alert('텍스트를 선택하세요.');           // 선택된 텍스트가 없으면 경고 메시지 표시
        }
    } else {
        alert('텍스트를 선택하세요.');
    }
});
// 소설 링크 추가 기능 끝

// 마우스 버튼 클릭 애니메이션 기능 시작
// 마우스 버튼 요소를 선택합니다. (HTML에서 class="mouse"인 button 태그)
const mouseBtn = document.querySelector('.mouse');
console.log('mouseBtn:', mouseBtn); // 디버깅용 로그
// 마우스 버튼 안의 아이콘 요소를 선택합니다. (FontAwesome 아이콘)
const mouseIcon = document.querySelector('.mouse i');
console.log('mouseIcon:', mouseIcon); // 디버깅용 로그

// 이제 mouse 버튼에 data-animation-scroll 속성이 추가되었으므로, 기존 스크롤 코드가 클릭 시 작동합니다.
// 더블클릭 이벤트는 제거합니다.
// 마우스 버튼 클릭 애니메이션 기능 끝

// 비디오 모달 팝업 기능
(function(){
    const videoModal = document.getElementById('video-modal');
    const contentEl = videoModal && videoModal.querySelector('.video-modal__content');
    const openBtns = document.querySelectorAll('[data-video]');

    function isYouTube(url){
        return /youtube\.com|youtu\.be/.test(url || '');
    }

    function openVideo(src, poster){
        if(!contentEl) return;
        // clear
        contentEl.innerHTML = '';
        if(isYouTube(src)){
            const idMatch = src.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
            const id = idMatch ? idMatch[1] : null;
            const embed = document.createElement('iframe');
            embed.className = 'video-modal__iframe';
            embed.setAttribute('allowfullscreen', '');
            embed.setAttribute('frameborder','0');
            embed.src = id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : src;
            contentEl.appendChild(embed);
        } else {
            const v = document.createElement('video');
            v.className = 'video-modal__video';
            v.controls = true;
            v.preload = 'metadata';
            v.src = src;
            if(poster) v.poster = poster;
            contentEl.appendChild(v);
            v.play().catch(()=>{});
        }
        videoModal.classList.add('is-open');
        document.body.classList.add('video-modal-open');
    }

    function closeVideo(){
        if(!contentEl) return;
        const el = contentEl.firstElementChild;
        if(el && el.tagName === 'VIDEO'){
            try{ el.pause(); el.removeAttribute('src'); el.load(); } catch(e){}
        }
        contentEl.innerHTML = '';
        videoModal.classList.remove('is-open');
        document.body.classList.remove('video-modal-open');
    }

    openBtns.forEach(btn=>{
        btn.addEventListener('click', function(){
            const src = this.dataset.video;
            const poster = this.dataset.poster;
            if(src) openVideo(src, poster);
        });
    });

    // 닫기 이벤트들
    videoModal.addEventListener('click', function(e){
        if(e.target.dataset.videoClose === 'true' || e.target.closest('[data-video-close]')){
            closeVideo();
        }
    });

    window.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && videoModal.classList.contains('is-open')){
            closeVideo();
        }
    });
})();








