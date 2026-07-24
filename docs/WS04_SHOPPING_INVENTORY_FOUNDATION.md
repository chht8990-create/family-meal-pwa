# WS-04 — Shopping & Inventory Link v1.0

## 1. 목적

WS-04는 레시피와 식단에서 필요한 재료를 현재 재고와 비교하여 부족한 수량만 장보기로 만들고,
구매 완료 시 재고에 반영하는 흐름을 정의한다.

핵심 흐름:

레시피 필요량
→ 현재 사용 가능 재고
→ 부족 수량 계산
→ 장보기 항목 생성·병합
→ 구매 완료
→ 재고 증가
→ 비용 입력 선택
→ 이후 식단 부족량 재계산

---

## 2. 핵심 원칙

### Inventory Is Source of Truth

현재 보유 수량은 InventoryItem이 기준이다.

### Shopping Is a Plan

ShoppingItem은 구매 계획이며 실제 재고가 아니다.

### Purchase Confirmation Required

체크만으로 재고가 증가하지 않는다.
`구매 완료`를 확정해야 재고에 반영한다.

### No Silent Overwrite

구매 수량, 단위, 가격을 사용자 확인 없이 자동 확정하지 않는다.

### Idempotency

같은 구매 완료 동작을 반복해도 재고가 두 번 증가하지 않아야 한다.

### Recalculate, Don’t Patch

식단·재고가 바뀌면 기존 부족량에 숫자를 덧붙이는 방식이 아니라 전체 부족량을 다시 계산한다.

---

## 3. 핵심 객체

### InventoryItem

- ingredientId
- quantity
- unit
- minimumQuantity
- expiryDate
- storageLocation
- version

### ShoppingItem

- ingredientId
- requiredQuantity
- plannedPurchaseQuantity
- unit
- purchaseUnit
- sourceMealPlanIds
- sourceRecipeIds
- status
- checked
- purchasedQuantity
- price
- version

### InventoryTransaction

- id
- ingredientId
- type
- quantity
- unit
- source
- correlationId
- idempotencyKey

---

## 4. 장보기 상태

- generated: 자동 생성
- manual: 수동 추가
- ready: 구매 준비
- checked: 매장에서 체크
- purchased: 구매 완료
- stored: 재고 반영 완료
- cancelled: 취소

`checked`는 구매 완료가 아니다.

---

## 5. 완료 기준

- InventoryItem schema
- ShoppingItem schema
- InventoryTransaction schema
- 부족량 계산 규칙
- 단위 호환 규칙
- 동일 재료 병합 규칙
- 판매 단위 올림 규칙
- 구매 완료 재고 증가
- 조리 완료 재고 감소 연동
- Undo 연동
- 중복 처리 방지
- TypeScript 엔진
- 테스트 계획
