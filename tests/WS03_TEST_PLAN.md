# WS-03 Test Plan

## 상태 전이

### MS-001

planned → cooking 성공

### MS-002

cooking → cooked 성공

### MS-003

cooked → eaten 성공

### MS-004

eaten → cooking 실패

### MS-005

skipped → cooked 실패

---

## 현실 예외

### RL-001

planned → dining_out  
재고 차감 없음  
선택적 비용 입력 side effect만 생성

### RL-002

planned → delivery  
재고 차감 없음

### RL-003

planned → convenience  
일반 레시피 재료 차감 없음

### RL-004

planned → skipped  
재고와 예산 변경 없음

---

## 메뉴 변경

### RP-001

기존 MealPlan이 replaced로 변경됨

### RP-002

새 MealPlan이 planned로 생성됨

### RP-003

기존 메뉴 재고 차감 없음

### RP-004

새 메뉴 기준 장보기 재계산 발생

### RP-005

cooked 상태에서 직접 교체 금지

---

## 중복 방지

### ID-001

동일 idempotencyKey로 조리 완료 두 번 실행 시 두 번째 실행 거부

### ID-002

재고 차감 이벤트가 한 번만 생성됨

### ID-003

동일 Undo 이벤트 중복 실행 거부

---

## Undo

### UN-001

조리 완료 Undo 시 상태가 이전 상태로 복구됨

### UN-002

차감된 재고가 정확히 복구됨

### UN-003

장보기 부족량이 재계산됨

### UN-004

이미 reversed된 이벤트 Undo 금지

### UN-005

후속 재고 이벤트가 있으면 자동 Undo 대신 수정 흐름 안내

---

## UX 문구

### UX-001

외식 선택 후 실패 표현이 없음

### UX-002

건너뛰기 선택 후 성공률 평가가 없음

### UX-003

상태 변경 후 실행 취소가 10초간 표시됨
