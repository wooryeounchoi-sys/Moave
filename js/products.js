/**
 * Moave 상품 데이터
 *
 * TODO: 상품명 / 가격 / 이미지는 이 파일에서만 수정하면 화면에 자동 반영됩니다.
 * - price 에 숫자(예: 39000)를 넣으면 '39,000원' 으로 자동 표시됩니다.
 * - price 에 문자(예: 'ooooo')를 넣으면 뒤에 '원'만 붙여 그대로 표시됩니다.
 */

/** 메뉴바 / 햄버거 메뉴 카테고리 */
const MENU_ITEMS = ['Set', 'Outer', 'Inner', 'Pants', 'Skirt', 'Shoes'];

/** 배너: Best 6 Set (2개씩 묶어 슬라이드 3장) */
const BEST_SETS = [
  { name: 'BEST 01', image: 'img/best/best1.png' },
  { name: 'BEST 02', image: 'img/best/best2.png' },
  { name: 'BEST 03', image: 'img/best/best3.png' },
  { name: 'BEST 04', image: 'img/best/best4.jpg' },
  { name: 'BEST 05', image: 'img/best/best5.jpg' },
  { name: 'BEST 06', image: 'img/best/best6.jpg' }
];

/**
 * 컨텐츠1: 가을 신상 룩
 * tags 의 x, y 는 카드 이미지 기준 위치(%)입니다.
 * side 는 말풍선이 점의 어느 쪽에 뜰지 ('left' | 'right') 입니다.
 */
const NEW_LOOKS = [
  {
    image: 'img/clothes/new1.jpg',
    alt: '다크 브라운 재킷과 연청 데님 코디',
    tags: [
      { type: 'OUTER', name: '다크 브라운 테일러드 재킷', price: 99000, x: 33, y: 45, side: 'right' },
      { type: 'INNER', name: '아이보리 골지 터틀넥 니트', price: 39000, x: 50, y: 28, side: 'right' },
      { type: 'PANTS', name: '연청 와이드 데님 팬츠', price: 49000, x: 58, y: 76, side: 'left' }
    ]
  },
  {
    image: 'img/clothes/new2.jpg',
    alt: '버건디 맨투맨과 연청 데님 코디',
    tags: [
      { type: 'TOP', name: '버건디 레이어드 셔츠 맨투맨', price: 49000, x: 50, y: 18, side: 'right' },
      { type: 'PANTS', name: '연청 와이드 데님 팬츠', price: 49000, x: 45, y: 62, side: 'right' }
    ]
  },
  {
    image: 'img/best/best4.jpg',
    alt: '베이지 트렌치 코트와 블랙 데님 코디',
    tags: [
      { type: 'OUTER', name: '베이지 클래식 더블브레스트 트렌치 코트', price: 119000, x: 33, y: 52, side: 'right' },
      { type: 'PANTS', name: '와이드 레그 워시드 블랙 데님 팬츠', price: 59000, x: 47, y: 74, side: 'left' }
    ]
  }
];

/**
 * 컨텐츠2: 이달의 인기 상품 (10개)
 * FIXME: img/clothes 폴더에 moave6 파일이 없어 6번은 moave11.png 를 임시 사용 중입니다.
 */
const POPULAR_PRODUCTS = [
  { name: '상품명1', price: 'ooooo', image: 'img/clothes/moave1.png' },
  { name: '상품명2', price: 'ooooo', image: 'img/clothes/moave2.png' },
  { name: '상품명3', price: 'ooooo', image: 'img/clothes/moave3.png' },
  { name: '상품명4', price: 'ooooo', image: 'img/clothes/moave4.png' },
  { name: '상품명5', price: 'ooooo', image: 'img/clothes/moave5.png' },
  { name: '상품명6', price: 'ooooo', image: 'img/clothes/moave11.png' },
  { name: '상품명7', price: 'ooooo', image: 'img/clothes/moave7.png' },
  { name: '상품명8', price: 'ooooo', image: 'img/clothes/moave8.png' },
  { name: '상품명9', price: 'ooooo', image: 'img/clothes/moave9.png' },
  { name: '상품명10', price: 'ooooo', image: 'img/clothes/moave10.png' }
];
