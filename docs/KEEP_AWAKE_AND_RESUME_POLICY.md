# Keep Awake & Resume Policy v1.0

## 1. 화면 꺼짐 방지

CookingSession status가 active일 때만 요청한다.

해제 조건:

- paused
- completed
- cancelled
- abandoned
- 앱이 조리 화면을 벗어남

---

## 2. 배터리 보호

- 화면 밝기를 강제로 최대로 올리지 않는다.
- 사용자가 화면 꺼짐 방지를 끌 수 있다.
- 60분 이상 사용자 입력이 없으면 조리 계속 여부를 묻는다.
- 응답이 없으면 paused로 전환한다.

---

## 3. 백그라운드 이동

앱이 백그라운드로 이동하면:

- currentStepIndex 저장
- 타이머 종료 시각 유지
- Session을 paused로 바꾸지 않을 수도 있음

MVP 권장:

- 5분 이내 복귀: active 유지
- 5분 초과: paused 안내 표시

---

## 4. 앱 재실행

진행 중 세션이 있으면 홈 화면 상단에 표시한다.

`제육볶음 조리 중 · 3/6단계`

버튼:

- 이어서
- 종료
