# WS-04 Completion Report

## 판정

WS-04 — Shopping & Inventory Link: COMPLETE

## 완료 항목

- InventoryItem 모델 확정
- ShoppingItem 모델 확정
- InventoryTransaction 모델 확정
- 부족량 계산 규칙 확정
- 계획 식사 상태 필터 확정
- 단위 호환 규칙 확정
- 판매 단위 올림 규칙 확정
- 동일 품목 병합 규칙 확정
- 수동 장보기 병합 규칙 확정
- 구매 체크와 구매 완료 분리
- 구매 완료 재고 lot 증가
- 조리 완료 FEFO 재고 차감
- 재고 부족 기록
- Undo 연동
- idempotency 중복 방지
- JSON Schema 작성
- TypeScript 엔진 작성
- 테스트 계획 작성

## 핵심 결정

1. ShoppingItem은 재고가 아니라 구매 계획이다.
2. 체크만으로 재고를 증가시키지 않는다.
3. 실제 구매 완료 시 사용자 확인값만 재고에 반영한다.
4. 부족량은 변경 시마다 전체 재계산한다.
5. 재고는 lot 단위로 관리하고 화면에서는 합계로 표시한다.
6. 조리 차감은 FEFO를 따른다.
7. 판매 권장량과 실제 필요량을 구분해 표시한다.
8. 사용자가 수정한 구매 수량은 자동 계산이 덮어쓰지 않는다.

## 다음 Workstream

WS-05 — Cooking Mode

범위:

- 한 화면 한 단계
- 이전·다음
- 불 세기
- 완료 판단 기준
- 타이머
- 화면 꺼짐 방지
- 조리 완료 확인
- 접근성
- WS-02 레시피 및 WS-03 상태 엔진 연결
