# HomeOS Workstream Plan v1.0

## 현재 기준점

WS-00 — Prototype & Home Flow  
상태: COMPLETE

검증 완료:
- 아침·점심·저녁 표시
- 레시피 열기
- 조리 완료
- 재고 차감
- 로컬 상태 유지

---

## WS-01 — Product Foundation Lock

상태: COMPLETE

산출물:
- Project Declaration
- Product Principles
- Life Engine Rulebook
- MVP Scope
- Core UX Flow
- Feature Backlog

완료 기준:
- 제품 정의 고정
- 사용자에게 보여줄 표현과 내부 구조 분리
- MVP 포함·제외 범위 명시
- 핵심 상태와 Rule 정의

---

## WS-02 — Recipe Domain Foundation

상태: NEXT

목표:
레시피를 화면용 문자열이 아니라 독립된 데이터 모델로 재구축한다.

범위:
- Recipe schema
- Ingredient schema
- 단위 체계
- 인원 환산 규칙
- 상세 조리 단계
- 준비·팁·보관법
- 레시피 품질 기준
- 데모 레시피 마이그레이션

비범위:
- 영상 검색
- 외부 레시피 수집
- AI 레시피 생성
- 커뮤니티 업로드

완료 기준:
- 모든 데모 레시피가 동일한 schema 사용
- 2~10인 환산 가능
- 레시피 품질 검증 체크리스트 통과
- 기존 조리 완료·재고 차감 회귀 없음

---

## WS-03 — Meal State & Real-Life Exceptions

범위:
- 오늘은 안 먹어요
- 외식·배달·간편식·도시락·건너뛰기
- 메뉴 변경
- 상태 이력
- 중복 재고 차감 방지

---

## WS-04 — Shopping & Inventory Link

범위:
- 부족량 계산
- 장보기 병합
- 구매 완료
- 재고 증가
- 수량 확인

---

## WS-05 — Cooking Mode

범위:
- 단계별 화면
- 타이머
- 이전/다음
- 완료 확인
- 접근성

---

## WS-06 — MVP Hardening

범위:
- 백업/복원
- 오프라인
- 오류 복구
- 실제 30일 사용 검증
- 모바일 UX 개선
