# Shopping Merge & Source Rules v1.0

## 1. 병합 기준

다음이 같으면 하나의 ShoppingItem으로 병합한다.

- ingredientId
- 호환 가능한 단위
- 같은 household
- cancelled 또는 purchased 상태가 아님

---

## 2. 출처 추적

병합 후에도 출처를 잃지 않는다.

- sourceMealPlanIds
- sourceRecipeIds
- manualSourceNotes

예:

양파 3개

출처:
- 월요일 제육볶음 2개
- 화요일 카레 1개

---

## 3. 자동 항목과 수동 항목

자동 장보기와 수동 추가가 같은 재료라면 병합할 수 있다.

단, 수동 입력 메모는 유지한다.

예:

자동 부족량: 우유 1L  
수동 추가: 우유 1L, “아이들 간식용”

병합:
- 총 2L
- 메모 유지

---

## 4. 구매 완료된 항목

purchased 또는 stored 항목에는 새 부족량을 합치지 않는다.

새 부족량이 생기면 새 ShoppingItem을 생성한다.

---

## 5. 사용자 수정 보호

사용자가 plannedPurchaseQuantity를 직접 수정한 경우:

- 시스템은 requiredQuantity만 재계산
- 사용자 수정값은 유지
- 부족해질 경우 조용한 안내만 표시

예:

`필요한 양보다 1개 적게 설정되어 있어요.`
