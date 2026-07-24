# Shortage Calculation Rules v1.0

## 1. 기본 공식

부족량 = 계획된 필요량 - 사용 가능한 재고량

부족량이 0 이하이면 장보기 항목을 생성하지 않는다.

---

## 2. 계획된 필요량

계획된 필요량은 다음 조건을 만족하는 MealPlan만 합산한다.

포함:

- planned
- cooking

제외:

- cooked
- eaten
- dining_out
- delivery
- convenience
- lunchbox
- skipped
- replaced
- cancelled
- archived

조리 완료된 식사는 이미 재고가 차감되었으므로 다시 필요량에 포함하지 않는다.

---

## 3. 사용 가능한 재고

사용 가능 재고는 다음을 제외한다.

- expired
- discarded
- reserved for another confirmed meal
- quantity <= 0

MVP에서는 식사별 재고 예약을 실제 차감으로 처리하지 않는다.
예약량이 도입되면 별도 필드로 계산한다.

---

## 4. 여러 식단 합산

동일 ingredientId가 여러 레시피에 있으면 먼저 정규 단위로 합산한다.

예:

- 양파 1개
- 양파 1.5개
- 양파 0.5개

총 필요량: 3개

---

## 5. 재고 lot 처리

같은 재료가 여러 lot로 존재하면 다음 순서로 사용 가능한 수량을 계산한다.

1. 유통기한이 가장 가까운 lot
2. 유통기한이 없는 lot
3. 최근 구매 lot

실제 차감도 FEFO(First Expired, First Out)를 따른다.

---

## 6. 부족량 재계산 시점

- 식단 추가·삭제
- 메뉴 변경
- 인원 변경
- 조리 완료
- 조리 완료 Undo
- 재고 수동 수정
- 구매 완료
- 폐기
- 유통기한 만료
