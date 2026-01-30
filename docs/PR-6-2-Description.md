# refactor: Enum Redesign & Component Improvements

**Base Branch**: `feature/opinion-form-validation-core` (PR 6-1)
**Target Branch**: `feature/opinion-form-enum-redesign`

---

# 🙏 리뷰 요청 사항

- Enum 구조의 일관성 검토 부탁드립니다 (DISTANCE_RANGE, FOOD_CATEGORY_LABEL, REGION)
- Single Source of Truth 패턴이 잘 적용되었는지 확인 부탁드립니다
- 컴포넌트 통합/분리가 적절한지 검토 부탁드립니다

---

# 📝 작업 내용

## 1. Enum 구조 표준화 (Single Source of Truth)

모든 enum을 일관된 패턴으로 재설계:

### DISTANCE_RANGE Enum
```typescript
export const DISTANCE_RANGE = {
  RANGE_500M: 0.5,
  RANGE_1KM: 1,
  ANY: null,
} as const;

export const DISTANCE_RANGE_LABEL = {
  RANGE_500M: "500m 내",
  RANGE_1KM: "1km 내",
  ANY: "상관없음",
} as const;
```

### FOOD_CATEGORY_LABEL Enum
```typescript
export const FOOD_CATEGORY_LABEL = {
  KOREAN: "한식",
  JAPANESE: "일식",
  CHINESE: "중식",
  WESTERN: "양식",
  ASIAN: "아시안",
  ANY: "상관없음",
} as const;
```

### REGION Enum
```typescript
export const REGION = {
  HONGDAE: "HONGDAE",
  GANGNAM: "GANGNAM",
} as const;

export const REGION_LABEL = {
  HONGDAE: "홍대입구역",
  GANGNAM: "강남역",
} as const;
```

### 특징
- 모든 enum은 `UPPER_CASE` 네이밍 사용
- 값 → 라벨 → 옵션 배열의 3단 구조
- `as const`로 타입 안정성 보장
- 중앙화된 상수 관리

### 수정 파일
- `src/constants/gathering/opinion/distance.ts`
- `src/constants/gathering/opinion/food.ts`
- `src/constants/gathering/opinion/region.ts`
- `src/constants/gathering/opinion/index.ts`
- `src/pageComponents/gathering/restaurantCard/*` (3개 파일)

## 2. 컴포넌트 구조 개선

### ResultView 통합
- **VoteSummarySection 컴포넌트 제거** (129줄 삭제)
- votes 렌더링 로직을 ResultView로 이동
- VoteList 분리로 관심사 분리

### FoodCard 개선
- FoodCard 타입 개선
- 상수 import 경로 변경
- FoodCategoryCarousel에 inline 통합
- CompleteView 공백 정리

### RegionChip 분리
- **단일 Chip 렌더링 컴포넌트로 분리**
- useController 패턴 적용
- RegionStep에서 REGION_OPTIONS를 map하여 사용

## 3. 폴더 구조 정리

### restaurantCard 이동
도메인별 컴포넌트 구조로 정리:
```
src/components/restaurantCard/
→ src/pageComponents/gathering/restaurantCard/
```

**이동 파일** (4개):
- `OtherCandidateCard.tsx`
- `RestaurantCard.tsx`
- `TopRecommendCard.tsx`
- `index.ts`

### recommend-result → recommendResult
kebab-case를 camelCase로 통일:
```
src/apis/recommend-result/ → src/apis/recommendResult/
src/hooks/apis/recommend-result/ → src/hooks/apis/recommendResult/
```

**이동 파일** (7개):
- API 파일 5개
- Hook 파일 2개

---

# 📊 변경 통계

```
27 files changed, 245 insertions(+), 432 deletions(-)
```

### 신규 파일 (1개)
- `src/pageComponents/gathering/create/RegionChip.tsx`

### 삭제 파일 (1개)
- `src/pageComponents/gathering/opinion/VoteSummarySection.tsx`

### 이동 파일 (11개)
- API: `recommend-result` → `recommendResult` (5개)
- Hook: `recommend-result` → `recommendResult` (2개)
- Component: `components/restaurantCard` → `pageComponents/gathering/restaurantCard` (4개)

### 수정 파일 (14개)
- Constants: 4개
- Components: 8개
- App: 2개

---

# ✨ 기술적 개선사항

### 코드 품질
- ✅ Single Source of Truth 구현
- ✅ 일관된 네이밍 규칙 (UPPER_CASE)
- ✅ 타입 안정성 강화 (`as const`)
- ✅ 중복 코드 제거 (VoteSummarySection 통합)

### 유지보수성
- ✅ 중앙화된 상수 관리
- ✅ 도메인별 컴포넌트 구조
- ✅ 일관된 폴더 네이밍 (camelCase)
- ✅ 관심사 분리 (VoteList)

### 확장성
- ✅ 새로운 enum 값 추가 용이
- ✅ 라벨 변경 시 한 곳만 수정
- ✅ UI 옵션 배열 자동 생성

---

# 📃 참고 자료

- PR 6-1: Validation Core & Hook Pattern (선행 PR)
- PR 5: `feature/opinion-page-api-integration` (기반 PR)

---

# 🖼️ 작업 결과물

- ✅ 빌드 성공 확인
- [프로젝트 문서]()

---

# 🚨 Breaking Changes

없음. 모든 변경은 내부 구현만 수정하며, 외부 API는 동일합니다.

---

# 📋 커밋 히스토리

1. `refactor: VoteSummarySection을 ResultView에 통합`
2. `refactor: FoodCard를 FoodCategoryCarousel에 inline 통합`
3. `refactor: restaurantCard를 pageComponents/gathering으로 이동`
4. `refactor: Enum 구조를 일관되게 재설계`
5. `refactor: recommend-result 폴더명을 recommendResult로 변경`
6. `refactor: RegionChip 컴포넌트 분리 및 useController 적용`

---

# 🔗 Enum 사용 예시

### Before (PR 6-1)
```typescript
// 여러 곳에 흩어진 라벨 정의
const DISTANCE_LABELS = Object.fromEntries(
  DISTANCE_OPTIONS.map(({ value, label }) => [value, label]),
);
```

### After (PR 6-2)
```typescript
// 중앙화된 enum
export const DISTANCE_RANGE_LABEL = {
  RANGE_500M: "500m 내",
  RANGE_1KM: "1km 내",
  ANY: "상관없음",
} as const;

// 일관된 사용
{DISTANCE_RANGE_LABEL[restaurant.majorityDistanceRange]}
```
