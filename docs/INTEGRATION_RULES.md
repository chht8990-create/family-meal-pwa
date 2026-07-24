# WS-05 Integration Rules v1.0

## 1. WS-02 Recipe 연동

Cooking Mode는 Recipe.steps를 사용한다.

필수 필드:

- order
- instruction
- heat
- minutes
- timerRecommended
- completionCue

조리 시작 시 recipeVersion 고정.

---

## 2. WS-03 Meal State 연동

조리 시작:

planned → cooking

조리 완료:

cooking → cooked

조리 시작 취소:

cooking → planned

이미 완료 후 수정:

WS-03 Undo 사용

---

## 3. WS-04 Inventory 연동

조리 완료 확인 후:

1. servings 기준 재료 환산
2. inventoryTracked 재료 선택
3. FEFO 차감
4. shortage 기록
5. InventoryConsumed transaction 생성
6. 장보기 부족량 재계산

Cooking Mode 자체가 재고를 직접 수정하지 않는다.
Inventory Engine에 명령을 전달한다.

---

## 4. 원자성

MealPlan cooked 변경과 InventoryConsumed는 하나의 작업 단위로 처리한다.

둘 중 하나가 실패하면 전체를 완료 상태로 저장하지 않는다.

로컬 환경에서는 transaction-like commit 패턴을 사용한다.

---

## 5. 오류 처리

재고 차감 실패:

- 조리 완료 자체를 잃지 않도록 pending completion 저장 가능
- 사용자에게 `재고 반영을 다시 시도해 주세요.` 표시
- 중복 처리 방지를 위해 idempotencyKey 유지
