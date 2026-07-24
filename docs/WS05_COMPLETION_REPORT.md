# WS-05 Completion Report

## 판정

WS-05 — Cooking Mode: COMPLETE

## 완료 항목

- CookingSession 모델 확정
- 한 화면 한 단계 원칙 확정
- 단계 이전·다음 규칙 확정
- 마지막 단계 명시적 완료 확인
- 타이머 정책 확정
- 최대 3개 동시 타이머 제한
- wall-clock 기반 백그라운드 타이머
- 화면 꺼짐 방지 및 해제 정책
- 일시 중단·복귀 정책
- recipeVersion 고정
- 접근성·안전 기준
- WS-02 Recipe 연동
- WS-03 Meal State 연동
- WS-04 Inventory 연동
- 원자적 완료 처리 기준
- JSON Schema 작성
- TypeScript 세션·타이머 엔진 작성
- 테스트 계획 작성

## 핵심 결정

1. 한 화면에는 현재 단계 하나만 표시한다.
2. 타이머 종료가 다음 단계 완료를 의미하지 않는다.
3. 마지막 단계도 사용자 확인 없이 자동 완료하지 않는다.
4. Cooking Mode는 재고를 직접 수정하지 않고 Inventory Engine에 명령을 전달한다.
5. MealPlan cooked 변경과 재고 차감은 하나의 작업 단위로 처리한다.
6. 조리 중 레시피가 수정되어도 시작 시점 버전을 유지한다.
7. 화면 꺼짐 방지는 조리 중에만 사용한다.
8. 음성·카메라·스마트 가전은 MVP에서 제외한다.

## 다음 Workstream

WS-06 — MVP Hardening & Integrated Prototype

범위:

- WS-02~WS-05 통합
- 기존 PWA 구조 교체 또는 마이그레이션
- 실제 홈 화면 연결
- 오늘은 안 먹어요 구현
- Cooking Mode UI 구현
- 장보기·재고 연동 구현
- 백업·복원
- 오프라인
- 오류 복구
- 모바일 실사용 검증
