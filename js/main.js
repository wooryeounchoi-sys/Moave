/**
 * Moave 메인 스크립트
 * 데이터(js/products.js)를 읽어 화면을 그리고, 인터랙션을 연결합니다.
 */

/** 가격 표시: 숫자면 천 단위 콤마, 문자면 그대로 + '원' */
function formatPrice(price) {
  return typeof price === 'number' ? `${price.toLocaleString('ko-KR')}원` : `${price}원`;
}

/** 아이콘 SVG 모음 */
const ICONS = {
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>'
};

/** 메뉴바 + 햄버거 메뉴 목록 렌더링 */
function renderMenus() {
  const html = MENU_ITEMS.map((item) => `<li><a href="#none">${item}</a></li>`).join('');
  document.getElementById('gnbList').innerHTML = html;
  document.getElementById('drawerList').innerHTML = html;
}

/** 햄버거 메뉴 열기/닫기 */
function initDrawer() {
  const drawer = document.getElementById('drawer');
  const dim = document.getElementById('drawerDim');
  const toggle = (isOpen) => {
    drawer.classList.toggle('is_open', isOpen);
    dim.classList.toggle('is_open', isOpen);
    document.body.classList.toggle('no_scroll', isOpen);
  };

  document.getElementById('menuOpen').addEventListener('click', () => toggle(true));
  document.getElementById('menuClose').addEventListener('click', () => toggle(false));
  dim.addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
}

/** 배너 슬라이더: 2개씩 묶어 3초마다 자동 전환 */
function initBestSlider() {
  const track = document.getElementById('sliderTrack');
  const dots = document.getElementById('sliderDots');
  const slides = [];

  for (let i = 0; i < BEST_SETS.length; i += 2) {
    slides.push(BEST_SETS.slice(i, i + 2));
  }

  track.innerHTML = slides.map((pair) => `
    <div class="slide">
      ${pair.map((set, idx) => `
        <a href="#none" class="slide_card ${idx === 0 ? 'from_left' : 'from_right'}">
          <img src="${set.image}" alt="${set.name} 인기 세트">
          <span class="slide_label">${set.name}</span>
        </a>
      `).join('')}
    </div>
  `).join('');

  dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="${i + 1}번 슬라이드"></button>`).join('');

  const slideEls = track.querySelectorAll('.slide');
  const dotEls = dots.querySelectorAll('button');
  let current = 0;
  let timer = null;

  const show = (index) => {
    current = (index + slideEls.length) % slideEls.length;
    slideEls.forEach((el, i) => el.classList.toggle('is_active', i === current));
    dotEls.forEach((el, i) => el.classList.toggle('is_active', i === current));
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 3000);
  };

  document.getElementById('slidePrev').addEventListener('click', () => { show(current - 1); start(); });
  document.getElementById('slideNext').addEventListener('click', () => { show(current + 1); start(); });
  dotEls.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));

  show(0);
  start();
}

/** 컨텐츠1: 가을 신상 룩 카드 + 말풍선 태그 */
function renderNewLooks() {
  const list = document.getElementById('lookList');

  list.innerHTML = NEW_LOOKS.map((look) => `
    <li class="look_card" tabindex="0">
      <img src="${look.image}" alt="${look.alt}">
      ${look.tags.map((tag) => `
        <div class="tag tag--${tag.side}" style="left:${tag.x}%; top:${tag.y}%;">
          <span class="tag_dot"></span>
          <div class="tag_bubble">
            <span class="tag_type">${tag.type}</span>
            <strong class="tag_name">${tag.name}</strong>
            <span class="tag_price">${formatPrice(tag.price)}</span>
          </div>
        </div>
      `).join('')}
    </li>
  `).join('');

  /** 터치 기기: 탭으로 말풍선 토글 */
  if (!window.matchMedia('(hover: none)').matches) return;

  list.querySelectorAll('.look_card').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('is_show'));
  });
}

/** 컨텐츠2: 이달의 인기 상품 카드 + 좋아요/장바구니 */
function renderPopular() {
  const list = document.getElementById('productList');
  const cartCount = document.getElementById('cartCount');
  let cartTotal = 0;

  list.innerHTML = POPULAR_PRODUCTS.map((item, i) => `
    <li class="product_card">
      <div class="product_thumb">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="product_actions">
          <button type="button" class="action_btn like" data-index="${i}" aria-label="좋아요" aria-pressed="false">${ICONS.heart}</button>
          <button type="button" class="action_btn add_cart" data-index="${i}" aria-label="장바구니 담기">${ICONS.cart}</button>
        </div>
      </div>
      <h3 class="product_name">${item.name}</h3>
      <p class="product_price">${formatPrice(item.price)}</p>
    </li>
  `).join('');

  list.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.like');
    const cartBtn = e.target.closest('.add_cart');

    if (likeBtn) {
      const isLiked = likeBtn.classList.toggle('is_active');
      likeBtn.setAttribute('aria-pressed', String(isLiked));
    }

    if (cartBtn) {
      cartTotal += 1;
      cartCount.textContent = cartTotal;
      cartCount.classList.remove('is_bump');
      void cartCount.offsetWidth;
      cartCount.classList.add('is_bump');
      cartBtn.classList.add('is_active');
    }
  });
}

/** 플로팅 버튼: 스크롤 시 노출, 클릭 시 맨 위로 */
function initToTop() {
  const btn = document.getElementById('toTop');
  const onScroll = () => btn.classList.toggle('is_show', window.scrollY > 300);

  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
}

renderMenus();
initDrawer();
initBestSlider();
renderNewLooks();
renderPopular();
initToTop();
