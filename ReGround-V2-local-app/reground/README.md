# ReGround V2 — Supplier & Receiver workspaces

## 실행

`ReGround-V2.html`을 브라우저에서 열면 설치나 네트워크 없이 실행됩니다. 전체 소스의 `index.html`도 직접 열 수 있습니다. 로컬 미리보기 주소는 http://127.0.0.1:4173 입니다.

서버 재실행: `reground` 폴더에서 `python3 -m http.server 4173 --bind 127.0.0.1` 실행.

## V2 변경점

### 현재 역할과 조직을 명확하게 표시

상단에 **Supplier — I have surplus** / **Receiver — I need material** 버튼을 나란히 배치했습니다. 선택한 역할을 글자, 선택 상태, 색으로 표시합니다. 왼쪽 조직 카드에 현재 역할, 업무 목적, 조직명, 조직 유형 및 source project / receiving site를 보여줍니다.

공급 조직 정보와 수용 조직 정보를 따로 저장합니다. Receiver 조직은 수용 현장마다 별도로 수정할 수 있습니다. 역할별 마지막 화면도 기억합니다.

### Supplier 업무

- Supply overview: 예측 잉여토, 경로별 비용 절감 추정, 수용 준비도, 운송 거리
- Projects & forecast: 현장별 물량, 재질, 일정
- Plan soil routes: Local / Alternative / Fallback 비교
- Prepare evidence: 공급자 증빙 기록과 참조 메모
- Material profile: 선택한 수용자의 현재 기준
- Verify & release: 배치 PASS/HOLD/FAIL 및 출고 차단
- Outgoing deliveries: 출고 진행, 수용자 확인 대기
- Project impact: 공급자 비용 및 운송 영향 추정, CSV 내보내기

### Receiver 업무

- Receiving overview: 선택한 현장의 목표 잔여량, 수령량, 이동 중 물량, 검토 대기 소스
- Site requirements: 필요 재질·물량·최대 수용량·기간·수분/입도 기준 수정
- Find material: 현장 기준을 검색에 반영, 요청 초안 저장
- Source approvals: 공급자 증빙은 읽기 전용으로 확인하고 Receiver가 조건부 수용 승인
- Incoming deliveries: 해당 현장으로 출고된 배치만 표시, 수령 기록 확인
- Received material: 수령 확인 완료한 배치와 출처
- Receiving report: 현장별 목표 달성률·수령 실적, 별도 CSV 내보내기

요청 초안은 예약 또는 확정 물량에 포함하지 않습니다. Receiver 화면에 Supplier의 처분비 절감액을 표시하지 않습니다.

### 두 역할이 공유하는 정보

수용자가 기간·재질·수용량·검증 범위를 수정하면 관련 source acceptance가 다시 열립니다. 공급자 경로 적합성과 배치 검증에는 변경된 기준이 반영됩니다. 과거 배치 결과는 그대로 보존하고, 아직 출고하지 않은 PASS도 현재 기준과 재검토 상태를 확인합니다.

전체 프로젝트들이 해당 수용자에게 이미 출고한 물량을 합산해 최대 수용량을 검사합니다. 현장별 입고량은 섞이지 않습니다. 출고는 Supplier, 입고 확인은 Receiver 화면에서 진행합니다. 입고 질량이 source 기록과 다르면 수령 완료로 처리하지 않고 검토 대기 상태를 유지합니다.

## 시연

1. Supplier의 `Projects & forecast`에서 예상 잉여량 확인.
2. `Plan soil routes`에서 경로 선택, `Prepare evidence`에서 첫 5개 조건 기록.
3. 상단 Receiver 선택 후 해당 receiving site 선택.
4. `Source approvals`에서 증빙 및 기간/재질/수용량 적합성 확인 후 조건부 수용 기록.
5. Supplier `Verify & release`에서 배치 기록 및 출고.
6. Receiver `Incoming deliveries`에서 기록 참조와 동일 질량을 입력해 수령 확인.
7. 역할별 overview 및 report에서 관련 물량 갱신 확인.

## 접근성·UX 적용

- 역할 선택에 업무 목적 라벨 및 `aria-pressed` 선택 상태
- 현재 위치·조직·현장을 항상 확인할 수 있는 문맥 표시
- 역할에 필요한 메뉴와 다음 작업 우선 표시
- 일반 버튼·주요 역할 전환 최소 44px 높이, 체크박스 24px
- 키보드 포커스 표시, skip link, 모달 제목 연결
- 오류 메시지를 해당 폼에 표시하고 오류 위치로 포커스 이동
- 모바일 메뉴의 포커스 범위 제한, Escape 닫기 및 메뉴 버튼으로 복귀
- 좁은 화면의 폼·지표·헤더 재배치
- 상태를 색과 텍스트로 함께 표시

참고: [WCAG 2.2 개요](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions).

완전한 WCAG 적합성 인증을 수행한 결과는 아닙니다. 스크린 리더별 검증과 전체 대비 검사는 별도입니다.

## 검증 기록

실제 로컬 UI에서 다음을 확인했습니다.

- 역할에 따른 조직명, 메뉴, 현장 선택 및 지표 변경
- Receiver가 다른 현장을 선택할 때 입고·이동 중 물량 분리
- 목표량이 최대 수용량을 넘으면 입력 오류 표시
- 수용 기준 수정 시 기존 sign-off 재검토
- 변경된 수분 기준에 따른 HOLD, 미승인 PASS의 출고 차단
- 입고 질량 불일치 시 수령 완료 차단
- 정상 수령 확인 후 해당 현장의 수령량 갱신
- 모바일 390px 및 320px에서 페이지 가로 넘침 없음
- 모바일 메뉴 Escape 종료와 메뉴 버튼 포커스 복귀
- 최종 점검 화면에서 JavaScript 오류 없음

검증용 브라우저 저장소는 사용자의 일반 미리보기 저장소와 분리했습니다.

## 데이터와 운영 범위

참조 대화에서 확인된 ReGround 흐름을 기반으로 합니다. 원본 ReGround / Auckland soil transport report 첨부 전체는 접근되지 않았습니다. 물량·시험값·거리·가격·조직·현장명은 데모이며 실제 검증 데이터나 업체 예약이 아닙니다. 지도는 축척 없는 개념도입니다. GPS, 계정 인증, 서버 권한, 다중 사용자 동기화, 실험실·현장 장비·위브리지 연동은 없습니다. 역할별 작업 분리는 로컬 인터페이스 동작입니다.

조건부 수용과 현장 conformance를 분리했습니다. PASS는 오염 인증이나 법적 허가를 뜻하지 않습니다. 이 버전은 whole-source 수용 여부를 검사하며 요청 초안으로 부분 물량 offtake를 확정하지 않습니다.

V2는 `reground-v2` 브라우저 저장소를 사용하고 첫 실행 시 기존 V1 프로젝트 기록을 복사해 반영합니다. `reground-v1`은 보존됩니다. 파일 직접 열기와 로컬 주소는 저장소가 다를 수 있습니다.
