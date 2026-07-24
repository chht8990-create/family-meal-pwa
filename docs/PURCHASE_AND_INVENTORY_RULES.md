# Purchase & Inventory Rules v1.0

## 1. 구매 체크

체크는 매장에서 장바구니에 담았다는 표시다.

- status: checked
- 재고 증가 없음
- 비용 기록 없음

---

## 2. 구매 완료

사용자가 `구매 완료`를 누르면:

1. 실제 구매 수량 확인
2. 가격 입력 선택
3. 유통기한 입력 선택
4. 보관 위치 선택
5. InventoryTransaction 생성
6. Inventory lot 증가
7. ShoppingItem status를 stored로 변경
8. 부족량 재계산

---

## 3. 재고 lot

재고는 ingredientId 단일 합계만 저장하지 않고 lot 단위 저장을 지원한다.

각 lot:

- quantity
- unit
- purchasedAt
- expiryDate
- storageLocation
- sourceTransactionId

화면에서는 합계로 보여줄 수 있다.

---

## 4. 조리 완료 연동

WS-03의 MealCooked 이벤트가 발생하면:

1. WS-02 환산 재료량 계산
2. inventoryTracked 재료만 선택
3. FEFO 순서로 lot 차감
4. InventoryConsumed transaction 생성
5. 부족량 재계산

---

## 5. 부족 재고

재고가 충분하지 않아도 조리 완료를 막지 않는다.

대신:

- 실제 보유량까지만 차감
- 부족 차감량을 shortage record로 남김
- 사용자에게 확인 가능하게 표시

음수 재고를 자동으로 숨기지 않는다.

---

## 6. Undo 연동

MealCooked Undo:

- 해당 correlationId의 소비 transaction 역처리
- 원래 lot에 수량 복구
- 장보기 부족량 재계산

Purchase Undo:

- 해당 구매 transaction으로 추가된 수량이 이후 사용되지 않았으면 자동 복구
- 이후 사용되었다면 수정 흐름으로 전환
