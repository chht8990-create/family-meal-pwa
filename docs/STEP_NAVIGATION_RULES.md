# Step Navigation Rules v1.0

## 1. 다음

- 현재 단계 진행 상태 저장
- 현재 단계 completedAt 기록
- currentStepIndex + 1
- 마지막 단계가 아니면 다음 화면 표시

---

## 2. 이전

- currentStepIndex - 1
- 기존 완료 기록은 유지
- 재고나 MealPlan 상태에는 영향 없음

---

## 3. 단계 건너뛰기

기본 화면에 직접 노출하지 않는다.

더보기에서:

- 이 단계 건너뛰기

건너뛰면 `skipped = true` 기록.
안전 관련 단계는 건너뛰기 금지 가능.

---

## 4. 마지막 단계

마지막 단계의 주요 버튼:

`조리 완료`

누르면 즉시 완료하지 않고 확인 화면을 연다.

확인 내용:

- 메뉴명
- 인원
- 재고에서 차감될 주요 재료
- 부족 재고가 있는 경우 안내

버튼:

- 조리 완료
- 계속 조리하기

---

## 5. 중복 완료 방지

CookingSession completed 이후:

- 조리 완료 버튼 비활성화
- 동일 idempotencyKey 재요청 거부
- 재고 차감 이벤트 중복 생성 금지

---

## 6. 취소

첫 단계에서 아직 재고 차감이 없으면:

- 조리 시작 취소 가능
- MealPlan cooking → planned
- Session cancelled

이미 조리 완료된 경우 취소가 아니라 WS-03 Undo를 사용한다.
