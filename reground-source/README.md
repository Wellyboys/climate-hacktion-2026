# ReGround — interactive Auckland soil scenario

기존 실제 지도·주황/파랑 3D 비교 기둥 디자인을 유지한 소스입니다.

## 실행
이 폴더에서 `python3 -m http.server 8000`을 실행하고 http://localhost:8000 을 여세요. 빌드나 API 키는 필요 없습니다. 지도는 WebGL을 사용하며 OpenStreetMap 거리 타일에는 인터넷이 필요합니다.

## 수정할 파일
- index.html: 문구와 페이지 구조
- styles.css: 색상, 글꼴, 반응형 레이아웃
- app.js: 시나리오 계산, 지도 기둥, 연도 재생과 버튼
- data/nz.geojson / nz-boundary.js: 실제 뉴질랜드 경계 (Natural Earth)
- assets/: MapLibre GL JS 4.7.1과 라이선스

## 데이터 해석
Auckland 전체의 모델링된 연간 합계이며, 기둥 위치는 비교 표시용 앵커입니다. 개별 현장이나 건물 데이터를 뜻하지 않습니다. 2026 기준 토사 2,000,000톤, 연간 증가율 1.2%, 재사용률 2026년 1% → 2035년 10%, 처분 이동 92km, 지역 재사용 이동 12km, 배출계수 0.105kg CO₂-e/tonne-km을 사용합니다. 시나리오는 예측 또는 관측 결과가 아닙니다. 계산과 주제 맥락은 Wellyboys/climate-hacktion-2026 원본 프로젝트를 기준으로 합니다.

## 이번 세부 수정
범례 단위 정리, 전국 보기에서 Auckland 복귀 버튼 안내, 연도 슬라이더 접근성, 재생 상태 표시, 탭 숨김 시 재생 중지, 동작 줄이기 설정에 따른 지도 이동 지원.
