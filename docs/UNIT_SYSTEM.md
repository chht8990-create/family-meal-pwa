# HomeOS Recipe Unit System v1.0

## 1. 지원 단위

### 중량

- g
- kg

### 부피

- ml
- l

### 계량

- tsp
- tbsp
- cup

한국어 표시:

- tsp → 작은술
- tbsp → 큰술
- cup → 컵

### 개수

- piece
- clove
- stalk
- slice
- pack
- bowl
- pinch
- dash

한국어 예:

- piece → 개
- clove → 쪽
- stalk → 대
- slice → 장
- pack → 봉
- bowl → 공기
- pinch → 꼬집
- dash → 약간

---

## 2. 저장 원칙

- 내부 저장은 정규화된 단위를 사용한다.
- 사용자 화면에서는 한국어 단위로 변환한다.
- 가능하면 g/ml를 기준으로 저장한다.
- `적당량`, `조금`, `취향껏`만 단독으로 사용하지 않는다.
- 불가피한 경우 `quantityText`를 함께 사용한다.

---

## 3. 반올림 규칙

- g: 5g 단위
- ml: 5ml 단위
- tsp/tbsp: 0.25 단위
- piece: 0.5개 단위 허용
- clove: 1쪽 단위
- stalk: 0.5대 단위
- pinch/dash: 정수 단위

단, 장보기에서는 실제 판매 단위로 별도 올림할 수 있다.

---

## 4. 환산 금지

다음 변환은 데이터 없이 자동 수행하지 않는다.

- 양파 1개 ↔ g
- 대파 1대 ↔ g
- 소금 1큰술 ↔ g
- 돼지고기 1팩 ↔ g

품목별 변환 정보가 존재할 때만 변환한다.
