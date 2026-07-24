# Unit & Purchase Rules v1.0

## 1. 단위 호환

자동 합산 가능:

- g ↔ kg
- ml ↔ l

조건부 합산:

- piece ↔ pack
- stalk ↔ pack
- slice ↔ pack

조건부 합산은 ingredient별 conversion 정보가 있을 때만 가능하다.

자동 합산 금지:

- piece ↔ g
- tbsp ↔ g
- pack ↔ g

---

## 2. 내부 정규 단위

- 중량: g
- 부피: ml
- 개수: ingredient별 기본 count unit

---

## 3. 판매 단위

IngredientCatalog에 다음 정보를 둘 수 있다.

- purchaseUnit
- purchaseSize
- minimumPurchaseQuantity
- commonPackSizes

예:

두부:
- purchaseUnit: pack
- purchaseSize: 1 pack

돼지고기:
- purchaseUnit: g
- commonPackSizes: 600g, 1000g

---

## 4. 구매 수량 계산

계획 구매량은 부족량을 판매 단위에 맞게 올림한다.

예:

부족량 700g  
판매 단위 600g pack

계획 구매량:
- 2 pack
- 총 1200g

단, 사용자 화면에는 부족량과 구매 권장량을 구분해 표시한다.

`필요한 양 700g`
`구매 권장 600g 2팩`

---

## 5. 실제 구매량

구매 완료 시 실제 구매 수량을 확인한다.

사용자는 다음을 수정할 수 있다.

- 실제 구매 수량
- 실제 단위
- 가격
- 유통기한
- 보관 위치

실제 구매량만 재고에 반영한다.
