# Event Log Model v1.0

## 1. 원칙

현재 상태가 운영의 기준이다.
Event Log는 보조 기록이다.

---

## 2. 이벤트 구조

- id
- entityType
- entityId
- eventType
- previousState
- nextState
- occurredAt
- actor
- payload
- idempotencyKey
- reversed
- reversedByEventId

---

## 3. Meal 이벤트

- MealCookingStarted
- MealCooked
- MealEaten
- MealMarkedDiningOut
- MealMarkedDelivery
- MealMarkedConvenience
- MealMarkedLunchbox
- MealSkipped
- MealReplaced
- MealStateReverted

---

## 4. 재고 관련 이벤트

MealCooked는 재고 차감 명령을 발생시킨다.

재고 쪽에는 별도 이벤트를 기록한다.

- InventoryConsumed
- InventoryConsumptionReverted

Meal 이벤트와 Inventory 이벤트는 correlationId로 연결한다.

---

## 5. 중복 방지

사용자의 한 번의 동작마다 idempotencyKey를 생성한다.

동일한 idempotencyKey가 이미 처리된 경우:

- 상태 재변경 금지
- 재고 재차감 금지
- 새 이벤트 생성 금지
- 기존 결과 반환

---

## 6. 보존

MVP에서는 최근 90일 이벤트를 로컬에 유지한다.
백업 파일에는 전체 이벤트를 포함할 수 있다.

이벤트 로그는 일반 사용자 화면에 상시 노출하지 않는다.
