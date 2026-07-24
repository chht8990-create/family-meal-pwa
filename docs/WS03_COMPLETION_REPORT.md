# WS-03 Completion Report

## 판정

WS-03 — Meal State & Real-Life Exceptions: COMPLETE

## 완료 항목

- MealPlan 상태 모델 확정
- 상태 전이 규칙 확정
- 오늘은 안 먹어요 UX 확정
- 외식·배달·간편식·도시락·건너뛰기 처리 확정
- 메뉴 변경 구조 확정
- State First 구조 확정
- 보조 Event Log 구조 확정
- 10초 Undo 정책 확정
- 중복 재고 차감 방지 규칙 확정
- JSON Schema 작성
- TypeScript 상태 엔진 작성
- Undo 엔진 작성
- 테스트 계획 작성
- 샘플 시나리오 작성

## 핵심 결정

1. 완전한 Event Sourcing은 사용하지 않는다.
2. 현재 상태를 운영의 기준으로 사용한다.
3. Event Log는 Undo, 추적, 향후 동기화를 위한 보조 기록이다.
4. `오늘은 안 먹어요`는 상태가 아니라 UX 진입점이다.
5. 메뉴 변경은 기존 계획을 덮어쓰지 않고 replaced 상태로 보존한다.
6. 조리 완료는 idempotencyKey로 중복 차감을 방지한다.
7. 외식·배달·건너뛰기는 실패로 평가하지 않는다.

## 다음 Workstream

WS-04 — Shopping & Inventory Link

범위:

- 레시피 필요량 계산
- 현재 재고와 비교
- 부족 수량 계산
- 중복 장보기 항목 병합
- 구매 완료
- 재고 증가
- 판매 단위 처리
- 조리 완료 및 Undo와의 연동
