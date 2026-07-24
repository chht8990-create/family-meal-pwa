# HomeOS WS-04 Shopping & Inventory Link

레시피 필요량, 현재 재고, 장보기, 구매 완료와 재고 반영을 연결하는 공식 설계 패키지입니다.

## 구성

- docs/WS04_SHOPPING_INVENTORY_FOUNDATION.md
- docs/SHORTAGE_CALCULATION_RULES.md
- docs/UNIT_AND_PURCHASE_RULES.md
- docs/MERGE_AND_SOURCE_RULES.md
- docs/PURCHASE_AND_INVENTORY_RULES.md
- docs/WS04_COMPLETION_REPORT.md
- schemas/inventory-item.schema.json
- schemas/shopping-item.schema.json
- schemas/inventory-transaction.schema.json
- src/shopping-inventory-domain.ts
- src/inventory-transaction-engine.ts
- tests/WS04_TEST_PLAN.md
- samples/shopping-inventory-scenarios.json

## 현재 기준점

- WS-01 Product Foundation Lock: COMPLETE
- WS-02 Recipe Domain Foundation: COMPLETE
- WS-03 Meal State & Real-Life Exceptions: COMPLETE
- WS-04 Shopping & Inventory Link: COMPLETE
- Next: WS-05 Cooking Mode
