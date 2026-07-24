# Cooking Session Model v1.0

## 1. CookingSession

- id
- mealPlanId
- recipeId
- recipeVersion
- currentStepIndex
- status
- startedAt
- pausedAt
- resumedAt
- completedAt
- stepProgress
- activeTimerIds
- keepAwakeRequested
- version

---

## 2. Session 상태

- active
- paused
- completed
- cancelled
- abandoned

### active

조리 진행 중

### paused

사용자가 일시 중단했거나 앱이 백그라운드로 이동

### completed

조리 완료 확인까지 끝남

### cancelled

조리를 시작하지 않은 것으로 되돌림

### abandoned

조리 중 오래 이탈하여 사용자가 종료함

---

## 3. StepProgress

각 단계별로 다음을 저장할 수 있다.

- stepOrder
- enteredAt
- completedAt
- skipped
- timerStarted
- notes

MVP에서는 단계별 메모 입력은 제공하지 않아도 된다.

---

## 4. Recipe 버전 고정

조리 세션이 시작되면 recipeVersion을 고정한다.

조리 중 레시피 원본이 수정되어도 현재 세션에는 영향을 주지 않는다.

---

## 5. 복귀

앱 재실행 시 active 또는 paused 세션이 있으면 다음 안내를 표시한다.

`제육볶음 조리를 이어서 할까요?`

- 이어서
- 종료

강제로 자동 진입하지 않는다.
