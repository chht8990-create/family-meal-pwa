# HomeOS Life Engine Rulebook v0.1

## 1. 목적

Life Engine은 화면이 아니라 HomeOS 내부의 생활 규칙 계층이다.

화면은 사용자의 행동을 전달하고 결과를 보여준다.  
식재료 차감, 장보기 반영, 상태 변경 등은 Life Engine 규칙이 처리한다.

---

## 2. 핵심 객체

### MealPlan

특정 날짜와 식사 시간대에 예정된 메뉴.

- date
- mealType: breakfast | lunch | dinner
- recipeId
- servings
- status
- replacementReason
- completedAt

### Recipe

- name
- baseServings
- ingredients
- preparation
- steps
- timing
- heatLevel
- tips
- storage
- sideDishes

### InventoryItem

- ingredientId
- quantity
- unit
- minimumQuantity
- expiryDate
- storageLocation

### ShoppingItem

- ingredientId
- requestedQuantity
- unit
- source
- status

### Expense

- category
- amount
- occurredAt
- source

---

## 3. 식사 상태

- planned: 예정
- cooking: 조리 중
- cooked: 조리 완료
- eaten: 식사 완료
- dining_out: 외식
- delivery: 배달
- convenience: 간편식
- lunchbox: 도시락
- skipped: 건너뜀
- replaced: 메뉴 변경

`오늘은 안 먹어요`는 최종 상태가 아니라 다음 선택지를 여는 UX 명칭이다.

---

## 4. 핵심 규칙

### RULE-001 조리 시작

조건:
- MealPlan.status = planned

행동:
- status를 cooking으로 변경
- 재고는 변경하지 않음

### RULE-002 조리 완료

조건:
- status = cooking 또는 planned
- 사용자가 확인함

행동:
- recipe ingredients를 servings 기준으로 환산
- 재고에서 차감
- status를 cooked로 변경
- 같은 MealPlan에서 중복 차감 금지

### RULE-003 식사 완료

조건:
- status = cooked

행동:
- status를 eaten으로 변경
- 재고 추가 변경 없음

### RULE-004 외식

행동:
- status를 dining_out으로 변경
- 예정 레시피 재고 차감 없음
- 비용 입력은 선택
- 식단 자동 이동 없음
- 사용자가 원할 때만 메뉴를 다른 날짜로 이동

### RULE-005 배달

행동:
- status를 delivery로 변경
- 재고 차감 없음
- 배달비·식비 입력은 선택

### RULE-006 간편식

행동:
- status를 convenience로 변경
- 등록된 간편식 재고가 있으면 해당 품목만 차감
- 일반 레시피 재료는 차감하지 않음

### RULE-007 식사 건너뛰기

행동:
- status를 skipped로 변경
- 재고와 예산 변경 없음
- 사용자에게 죄책감이나 실패 표현을 보여주지 않음

### RULE-008 메뉴 변경

행동:
- 기존 MealPlan을 replaced로 기록
- 새 MealPlan 생성 또는 recipeId 교체
- 기존 메뉴 재료는 차감하지 않음
- 새 메뉴 기준으로 부족 재료 재계산

### RULE-009 장보기 부족 판단

조건:
- 계획된 레시피의 필요량 > 현재 사용 가능 재고량

행동:
- 부족 수량만 ShoppingItem 후보로 생성
- 자동 추가 여부는 사용자 설정 또는 확인에 따름
- 동일 재료 중복 항목 병합

### RULE-010 장보기 완료

행동:
- 구매 수량을 재고에 증가
- ShoppingItem을 purchased로 변경
- 가격 입력 시 Expense 기록
- 가격 입력은 선택 사항

### RULE-011 유통기한 임박

조건:
- expiryDate가 설정됨
- 기준일 이내

행동:
- 오늘 화면에 조용한 안내 표시
- 자동 메뉴 변경 금지
- 관련 메뉴 제안 가능

### RULE-012 내일 준비

조건:
- 다음날 레시피에 해동·불림·재움 등 선행 작업이 존재

행동:
- 전날 적절한 시간에 준비 항목 표시
- 강제 알림 금지
- 사용자가 끌 수 있어야 함

---

## 5. 충돌 우선순위

1. 사용자의 명시적 선택
2. 이미 확정된 식사 상태
3. 재고 실제 수량
4. 계획된 식단
5. 추천 규칙
6. AI 제안

AI 제안은 사용자의 선택이나 실제 데이터를 덮어쓸 수 없다.

---

## 6. 금지 규칙

- 사용자의 확인 없이 식단 자동 변경
- 외식한 메뉴를 자동으로 다음날로 이동
- 재고가 부족한 상태에서 음수 재고를 숨김
- 조리 완료 중복 실행
- AI 추천을 확정 상태로 저장
- 식사 건너뛰기를 실패로 평가
