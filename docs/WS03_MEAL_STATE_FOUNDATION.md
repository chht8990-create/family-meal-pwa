# WS-03 — Meal State & Real-Life Exceptions v1.0

## 1. 목적

WS-03은 식사 계획이 실제 생활에서 바뀌는 모든 상황을 정상 흐름으로 처리한다.

HomeOS는 사용자가 계획대로 식사하지 않았다고 평가하지 않는다.
외식, 배달, 간편식, 도시락, 건너뛰기, 메뉴 변경은 모두 정상적인 선택이다.

---

## 2. 핵심 설계 원칙

### State First

현재 상태는 MealPlan 객체에 직접 저장한다.
앱은 이벤트 전체를 다시 계산하지 않고 현재 상태를 즉시 읽는다.

### Event Log as Support

이벤트 로그는 다음 목적에만 사용한다.

- 실행 취소
- 오류 추적
- 상태 변경 이력
- 향후 동기화 기반
- 백업 및 복원 보조

MVP에서는 완전한 Event Sourcing을 사용하지 않는다.

### User Choice Wins

사용자의 명시적 선택은 추천, 자동화, AI보다 항상 우선한다.

### No Judgment

외식, 배달, 건너뛰기를 실패나 계획 미달로 표시하지 않는다.

### Idempotency

같은 행동을 여러 번 눌러도 재고 차감이나 비용 반영이 중복 실행되지 않아야 한다.

---

## 3. MealPlan 상태

### 진행 상태

- planned: 예정
- cooking: 조리 중
- cooked: 조리 완료
- eaten: 식사 완료

### 현실 예외 상태

- dining_out: 외식
- delivery: 배달
- convenience: 간편식
- lunchbox: 도시락
- skipped: 건너뛰기

### 보조 상태

- replaced: 기존 메뉴가 다른 메뉴로 교체됨
- cancelled: 계획 자체가 취소됨
- archived: 보존용

`오늘은 안 먹어요`는 상태가 아니다.
사용자에게 예외 상태를 선택하게 하는 UX 진입점이다.

---

## 4. 허용 전이

### 정상 흐름

planned → cooking  
planned → cooked  
cooking → cooked  
cooked → eaten

### 현실 예외

planned → dining_out  
planned → delivery  
planned → convenience  
planned → lunchbox  
planned → skipped

### 메뉴 변경

planned 메뉴 A → replaced  
새 메뉴 B → planned

메뉴 교체는 기존 객체를 덮어쓰지 않고 이전 계획을 보존한다.

---

## 5. 금지 전이

- eaten → cooking
- dining_out → cooked
- skipped → cooked
- cooked → dining_out
- archived → 모든 활성 상태

수정이 필요하면 Undo 또는 새 MealPlan 생성으로 처리한다.

---

## 6. 상태와 재고 영향

| 상태 | 일반 레시피 재고 차감 | 비용 입력 | 식단 이동 |
|---|---:|---:|---:|
| planned | 없음 | 없음 | 없음 |
| cooking | 없음 | 없음 | 없음 |
| cooked | 있음 | 선택 없음 | 없음 |
| eaten | 추가 차감 없음 | 없음 | 없음 |
| dining_out | 없음 | 선택 | 자동 이동 없음 |
| delivery | 없음 | 선택 | 자동 이동 없음 |
| convenience | 등록된 간편식만 | 선택 | 자동 이동 없음 |
| lunchbox | 연결된 도시락 재고만 | 선택 | 자동 이동 없음 |
| skipped | 없음 | 없음 | 자동 이동 없음 |
| replaced | 없음 | 없음 | 새 계획 생성 |

---

## 7. 완료 기준

- 상태 및 전이 규칙 확정
- 오늘은 안 먹어요 흐름 정의
- 외식·배달·간편식·도시락·건너뛰기 처리
- 메뉴 변경 처리
- 재고 중복 차감 방지
- Undo 규칙
- 이벤트 로그 구조
- TypeScript 상태 엔진
- JSON Schema
- 테스트 시나리오
