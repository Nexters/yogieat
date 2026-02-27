# Changelog

All notable changes to the YogiEat project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.2-beta.1](https://github.com/Nexters/yogieat/compare/v2.1.1...v2.1.2-beta.1) (2026-02-27)

### Bug Fixes

* 의견 결과 취합 대기 페이지 내 설명 수정 ([0c33cb2](https://github.com/Nexters/yogieat/commit/0c33cb2fa4bea1f24ef6a26c4934e8b43347d70d))

## [2.1.1](https://github.com/Nexters/yogieat/compare/v2.1.0...v2.1.1) (2026-02-27)

### Code Refactoring

- Figma 디자인에 맞춰 애니메이션 및 캐릭터 배치 업데이트 ([#124](https://github.com/Nexters/yogieat/issues/124)) ([ec6a75b](https://github.com/Nexters/yogieat/commit/ec6a75bc409ce1ea1025f98dd359fc8f93f2d52e))

## [2.1.0](https://github.com/Nexters/yogieat/compare/v2.0.0...v2.1.0) (2026-02-27)

### Features

- 닉네임 입력 단계 랜덤 닉네임 및 중복 확인 기능 추가 ([#123](https://github.com/Nexters/yogieat/issues/123)) ([4cf0323](https://github.com/Nexters/yogieat/commit/4cf032363d058a35a8d33e406a8baa445861c447))

## [2.0.0](https://github.com/Nexters/yogieat/compare/v1.5.1...v2.0.0) (2026-02-27)

### ⚠ BREAKING CHANGES

- OpinionForm field names changed

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: update schema field names and exports

* foodCategorySchema → categorySchema
* dislikedFoodSchema → dislikedCategoriesSchema
* preferredMenusSchema → preferredCategoriesSchema
* Update opinionFormSchema with new field names
* Replace hardcoded "ANY" with CATEGORY.ANY

- Schema field names changed

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: rename component files to use Category naming

* FoodCard → CategoryCard
* FoodCategoryCarousel → CategoryCarousel
* DislikedFoodButton → DislikedCategoryButton

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: update component export names

* FoodCard → CategoryCard
* FoodCategoryCarousel → CategoryCarousel
* DislikedFoodButton → DislikedCategoryButton
* Update component function names to match new file names
* Internal logic unchanged (will be updated in next PR)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: update import references to use new constant names

* Update all components to use new constant names:
    - RANKS → RANK_LIST
    - RANK_LABELS → RANK_LABEL
    - FOOD_CATEGORIES → CATEGORY_LIST
    - FOOD_CATEGORY_LABEL → CATEGORY_LABEL
    - FOOD_CATEGORY_VALUES → CATEGORY_VALUES
    - dislikedFoodSchema → dislikedCategoriesSchema
    - preferredMenusSchema → preferredCategoriesSchema

* Update type imports:
    - FoodCategory → Category

* Update form field references:
    - dislikedFoods → dislikedCategories
    - preferredMenus → preferredCategories

* Fix component imports after file renames:
    - FoodCategoryCarousel → CategoryCarousel
    - DislikedFoodButton → DislikedCategoryButton

This ensures the build succeeds after type system changes.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- style: run prettier format

* Format code according to project prettier rules
* No logic changes, only formatting

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

### Features

- 404, 500 에러 페이지 추가 ([#107](https://github.com/Nexters/yogieat/issues/107)) ([e9e5772](https://github.com/Nexters/yogieat/commit/e9e57725127ea384c2836c61910488e137801271))
- opinion 랜딩 페이지 UI 업데이트 (로고·lottie·footer) ([#120](https://github.com/Nexters/yogieat/issues/120)) ([2817c50](https://github.com/Nexters/yogieat/commit/2817c5085db4088a0d200416ba9314689e41b440))
- SSE Event Registry 시스템 구현 및 마이그레이션 ([#119](https://github.com/Nexters/yogieat/issues/119)) ([178c79c](https://github.com/Nexters/yogieat/commit/178c79ca0cdb0a6c93ac502342329ba0b2c6e14f))
- SSE 기반 실시간 모임 현황 업데이트 구현 ([#87](https://github.com/Nexters/yogieat/issues/87)) ([0d220e0](https://github.com/Nexters/yogieat/commit/0d220e002c11da6cb470c793960d6736909e63a0))
- 결과 페이지 - 투표 결과 섹션 구현 ([#106](https://github.com/Nexters/yogieat/issues/106)) ([c633225](https://github.com/Nexters/yogieat/commit/c6332256a59ef96b079f7ac26705b30c0e9ae02c))
- 과반수 이상 의견 제출 시 추천 결과 생성 관련 API, Hook 추가 ([#103](https://github.com/Nexters/yogieat/issues/103)) ([5b31eec](https://github.com/Nexters/yogieat/commit/5b31eec62d2c3009053591d30b635118efdabbce)), closes [#105](https://github.com/Nexters/yogieat/issues/105)
- 인원 수 선택 시 시각적 피드백 추가 ([e9f6de6](https://github.com/Nexters/yogieat/commit/e9f6de6e647cc9825db8b88014ee5e2c6042a38e))
- 추천 결과 API response 타입 업데이트 ([#100](https://github.com/Nexters/yogieat/issues/100)) ([1d046ab](https://github.com/Nexters/yogieat/commit/1d046abea2361174e64927d29c92035da2899db5)), closes [#101](https://github.com/Nexters/yogieat/issues/101) [#102](https://github.com/Nexters/yogieat/issues/102)
- 추천 결과 생성 대기 페이지 및 애니메이션 구현 ([#118](https://github.com/Nexters/yogieat/issues/118)) ([a720a76](https://github.com/Nexters/yogieat/commit/a720a762b0947078044ece3710dc8a4e290c61d8))
- 취향 요약 카드 추가 ([#104](https://github.com/Nexters/yogieat/issues/104)) ([816fa96](https://github.com/Nexters/yogieat/commit/816fa96e04460501abfa485bd987c90a70c186da))

### Bug Fixes

- 1, 3순위를 선택했으나 2순위를 선택하지 않았을 경우 Validation 을 막지 않았던 문제 수정 ([#113](https://github.com/Nexters/yogieat/issues/113)) ([22e58e8](https://github.com/Nexters/yogieat/commit/22e58e844539bfaf787ada837585d3a2590f8df3))
- GitHub Actions 워크플로우 개선 및 스타일 가이드 업데이트 ([#91](https://github.com/Nexters/yogieat/issues/91)) ([e6c009e](https://github.com/Nexters/yogieat/commit/e6c009e7f27a8c75fbfb49f0dc9fd832c83643a5))
- 결과 대기 페이지 내 공유 버튼 스타일을 Tertiary 로 수정 ([#115](https://github.com/Nexters/yogieat/issues/115)) ([a63ddd1](https://github.com/Nexters/yogieat/commit/a63ddd14dfb507937572e9929250749f9ceed519))
- 결과 페이지 - 상단 취향 요약 섹션, 하단 투표 결과 선호 카테고리 노출 순서 로직 수정 ([#117](https://github.com/Nexters/yogieat/issues/117)) ([f5c4a1c](https://github.com/Nexters/yogieat/commit/f5c4a1c0d9f38ae57e7d00128086c1aa6643d4e8))
- 모임 인원 초과 및 결과 생성 완료 시 Toast 커스텀 기능 추가 ([#116](https://github.com/Nexters/yogieat/issues/116)) ([6088935](https://github.com/Nexters/yogieat/commit/6088935b3b31eb824e557adf912ead7d7d74bb4d))
- 음식 카테고리 일러스트레이터를 Figma 내 최신 시안으로 수정 ([#114](https://github.com/Nexters/yogieat/issues/114)) ([18f9cc3](https://github.com/Nexters/yogieat/commit/18f9cc38dda3000852cca056fe186405750d0a53))

### Code Refactoring

* opinion 페이지 컴포넌트 구조 개선 및 로직 통합 ([#109](https://github.com/Nexters/yogieat/issues/109)) ([a76f75f](https://github.com/Nexters/yogieat/commit/a76f75f165cbf1526e037b1b765452503dacfe6f))
* PeopleIllustration 캐릭터 배치 및 구조 개선 ([#112](https://github.com/Nexters/yogieat/issues/112)) ([ae95b72](https://github.com/Nexters/yogieat/commit/ae95b7274306d9edced38f6f9cb889d7e6cf0b5b))
* ProgressBar 컴포넌트 UI 개선 및 코드 최적화 ([#122](https://github.com/Nexters/yogieat/issues/122)) ([c73de1d](https://github.com/Nexters/yogieat/commit/c73de1d79ab2f51c720036cf8b2cfd4e789e64cc))
* SSE 이벤트를 recommend-result-created로 변경 ([#121](https://github.com/Nexters/yogieat/issues/121)) ([222e613](https://github.com/Nexters/yogieat/commit/222e613a172b43709c6ffef303abc66683af7812))
* 타입 시스템 리팩토링 - enum을 as const 패턴으로 전환 ([#110](https://github.com/Nexters/yogieat/issues/110)) ([d427378](https://github.com/Nexters/yogieat/commit/d4273786f2b6db4f5f5c88fca18f7c960f1898b1)), closes [#111](https://github.com/Nexters/yogieat/issues/111)
## [2.0.0-beta.11](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2026-02-27)

### Features

* 닉네임 입력 단계 랜덤 닉네임 및 중복 확인 기능 추가 ([#123](https://github.com/Nexters/yogieat/issues/123)) ([4cf0323](https://github.com/Nexters/yogieat/commit/4cf032363d058a35a8d33e406a8baa445861c447))

## [2.0.0-beta.10](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2026-02-27)

### Code Refactoring

- ProgressBar 컴포넌트 UI 개선 및 코드 최적화 ([#122](https://github.com/Nexters/yogieat/issues/122)) ([c73de1d](https://github.com/Nexters/yogieat/commit/c73de1d79ab2f51c720036cf8b2cfd4e789e64cc))

## [2.0.0-beta.9](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2026-02-27)

### Code Refactoring

- SSE 이벤트를 recommend-result-created로 변경 ([#121](https://github.com/Nexters/yogieat/issues/121)) ([222e613](https://github.com/Nexters/yogieat/commit/222e613a172b43709c6ffef303abc66683af7812))

## [2.0.0-beta.8](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2026-02-27)

### Features

- SSE Event Registry 시스템 구현 및 마이그레이션 ([#119](https://github.com/Nexters/yogieat/issues/119)) ([178c79c](https://github.com/Nexters/yogieat/commit/178c79ca0cdb0a6c93ac502342329ba0b2c6e14f))

## [2.0.0-beta.7](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2026-02-26)

### Features

- opinion 랜딩 페이지 UI 업데이트 (로고·lottie·footer) ([#120](https://github.com/Nexters/yogieat/issues/120)) ([2817c50](https://github.com/Nexters/yogieat/commit/2817c5085db4088a0d200416ba9314689e41b440))
- 추천 결과 생성 대기 페이지 및 애니메이션 구현 ([#118](https://github.com/Nexters/yogieat/issues/118)) ([a720a76](https://github.com/Nexters/yogieat/commit/a720a762b0947078044ece3710dc8a4e290c61d8))

## [2.0.0-beta.6](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2026-02-25)

### Bug Fixes

- 결과 페이지 - 상단 취향 요약 섹션, 하단 투표 결과 선호 카테고리 노출 순서 로직 수정 ([#117](https://github.com/Nexters/yogieat/issues/117)) ([f5c4a1c](https://github.com/Nexters/yogieat/commit/f5c4a1c0d9f38ae57e7d00128086c1aa6643d4e8))

## [2.0.0-beta.5](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2026-02-25)

### Bug Fixes

- 모임 인원 초과 및 결과 생성 완료 시 Toast 커스텀 기능 추가 ([#116](https://github.com/Nexters/yogieat/issues/116)) ([6088935](https://github.com/Nexters/yogieat/commit/6088935b3b31eb824e557adf912ead7d7d74bb4d))

## [2.0.0-beta.4](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2026-02-25)

### Bug Fixes

- 결과 대기 페이지 내 공유 버튼 스타일을 Tertiary 로 수정 ([#115](https://github.com/Nexters/yogieat/issues/115)) ([a63ddd1](https://github.com/Nexters/yogieat/commit/a63ddd14dfb507937572e9929250749f9ceed519))

## [2.0.0-beta.3](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2026-02-25)

### Bug Fixes

- 음식 카테고리 일러스트레이터를 Figma 내 최신 시안으로 수정 ([#114](https://github.com/Nexters/yogieat/issues/114)) ([18f9cc3](https://github.com/Nexters/yogieat/commit/18f9cc38dda3000852cca056fe186405750d0a53))

### Code Refactoring

- PeopleIllustration 캐릭터 배치 및 구조 개선 ([#112](https://github.com/Nexters/yogieat/issues/112)) ([ae95b72](https://github.com/Nexters/yogieat/commit/ae95b7274306d9edced38f6f9cb889d7e6cf0b5b))

## [2.0.0-beta.2](https://github.com/Nexters/yogieat/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2026-02-25)

### Bug Fixes

- 1, 3순위를 선택했으나 2순위를 선택하지 않았을 경우 Validation 을 막지 않았던 문제 수정 ([#113](https://github.com/Nexters/yogieat/issues/113)) ([22e58e8](https://github.com/Nexters/yogieat/commit/22e58e844539bfaf787ada837585d3a2590f8df3))

## [2.0.0-beta.1](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.8...v2.0.0-beta.1) (2026-02-25)

### ⚠ BREAKING CHANGES

- OpinionForm field names changed

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: update schema field names and exports

* foodCategorySchema → categorySchema
* dislikedFoodSchema → dislikedCategoriesSchema
* preferredMenusSchema → preferredCategoriesSchema
* Update opinionFormSchema with new field names
* Replace hardcoded "ANY" with CATEGORY.ANY

- Schema field names changed

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: rename component files to use Category naming

* FoodCard → CategoryCard
* FoodCategoryCarousel → CategoryCarousel
* DislikedFoodButton → DislikedCategoryButton

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: update component export names

* FoodCard → CategoryCard
* FoodCategoryCarousel → CategoryCarousel
* DislikedFoodButton → DislikedCategoryButton
* Update component function names to match new file names
* Internal logic unchanged (will be updated in next PR)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- refactor: update import references to use new constant names

* Update all components to use new constant names:
    - RANKS → RANK_LIST
    - RANK_LABELS → RANK_LABEL
    - FOOD_CATEGORIES → CATEGORY_LIST
    - FOOD_CATEGORY_LABEL → CATEGORY_LABEL
    - FOOD_CATEGORY_VALUES → CATEGORY_VALUES
    - dislikedFoodSchema → dislikedCategoriesSchema
    - preferredMenusSchema → preferredCategoriesSchema

* Update type imports:
    - FoodCategory → Category

* Update form field references:
    - dislikedFoods → dislikedCategories
    - preferredMenus → preferredCategories

* Fix component imports after file renames:
    - FoodCategoryCarousel → CategoryCarousel
    - DislikedFoodButton → DislikedCategoryButton

This ensures the build succeeds after type system changes.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

- style: run prettier format

* Format code according to project prettier rules
* No logic changes, only formatting

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

### Code Refactoring

- 타입 시스템 리팩토링 - enum을 as const 패턴으로 전환 ([#110](https://github.com/Nexters/yogieat/issues/110)) ([d427378](https://github.com/Nexters/yogieat/commit/d4273786f2b6db4f5f5c88fca18f7c960f1898b1)), closes [#111](https://github.com/Nexters/yogieat/issues/111)

## [1.6.0-beta.8](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.7...v1.6.0-beta.8) (2026-02-25)

### Code Refactoring

- opinion 페이지 컴포넌트 구조 개선 및 로직 통합 ([#109](https://github.com/Nexters/yogieat/issues/109)) ([a76f75f](https://github.com/Nexters/yogieat/commit/a76f75f165cbf1526e037b1b765452503dacfe6f))

## [1.6.0-beta.7](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.6...v1.6.0-beta.7) (2026-02-24)

### Features

- 인원 수 선택 시 시각적 피드백 추가 ([e9f6de6](https://github.com/Nexters/yogieat/commit/e9f6de6e647cc9825db8b88014ee5e2c6042a38e))

## [1.6.0-beta.6](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.5...v1.6.0-beta.6) (2026-02-24)

### Features

- 결과 페이지 - 투표 결과 섹션 구현 ([#106](https://github.com/Nexters/yogieat/issues/106)) ([c633225](https://github.com/Nexters/yogieat/commit/c6332256a59ef96b079f7ac26705b30c0e9ae02c))

## [1.6.0-beta.5](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.4...v1.6.0-beta.5) (2026-02-24)

### Features

- 404, 500 에러 페이지 추가 ([#107](https://github.com/Nexters/yogieat/issues/107)) ([e9e5772](https://github.com/Nexters/yogieat/commit/e9e57725127ea384c2836c61910488e137801271))

## [1.6.0-beta.4](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.3...v1.6.0-beta.4) (2026-02-24)

### Features

- 과반수 이상 의견 제출 시 추천 결과 생성 관련 API, Hook 추가 ([#103](https://github.com/Nexters/yogieat/issues/103)) ([5b31eec](https://github.com/Nexters/yogieat/commit/5b31eec62d2c3009053591d30b635118efdabbce)), closes [#105](https://github.com/Nexters/yogieat/issues/105)

## [1.6.0-beta.3](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.2...v1.6.0-beta.3) (2026-02-23)

### Features

- 취향 요약 카드 추가 ([#104](https://github.com/Nexters/yogieat/issues/104)) ([816fa96](https://github.com/Nexters/yogieat/commit/816fa96e04460501abfa485bd987c90a70c186da))

## [1.6.0-beta.2](https://github.com/Nexters/yogieat/compare/v1.6.0-beta.1...v1.6.0-beta.2) (2026-02-22)

### Features

- SSE 기반 실시간 모임 현황 업데이트 구현 ([#87](https://github.com/Nexters/yogieat/issues/87)) ([0d220e0](https://github.com/Nexters/yogieat/commit/0d220e002c11da6cb470c793960d6736909e63a0))

## [1.6.0-beta.1](https://github.com/Nexters/yogieat/compare/v1.5.0...v1.6.0-beta.1) (2026-02-22)

### Features

- 추천 결과 API response 타입 업데이트 ([#100](https://github.com/Nexters/yogieat/issues/100)) ([1d046ab](https://github.com/Nexters/yogieat/commit/1d046abea2361174e64927d29c92035da2899db5)), closes [#101](https://github.com/Nexters/yogieat/issues/101) [#102](https://github.com/Nexters/yogieat/issues/102)

### Bug Fixes

- GitHub Actions 워크플로우 개선 및 스타일 가이드 업데이트 ([#91](https://github.com/Nexters/yogieat/issues/91)) ([e6c009e](https://github.com/Nexters/yogieat/commit/e6c009e7f27a8c75fbfb49f0dc9fd832c83643a5))
- nicknameSchema 내 Error Message 에 작성되었던 오류 메세지 오타 수정 ([e2ee69e](https://github.com/Nexters/yogieat/commit/e2ee69ed9f75b8793cb637fd06e72541fdb12702))
- 불호 선택 스텝 내 설명 수정 ([d7975ab](https://github.com/Nexters/yogieat/commit/d7975ab966b5f6e1174202fafac83de13ad4e422))

## [1.5.0-beta.3](https://github.com/Nexters/yogieat/compare/v1.5.0-beta.2...v1.5.0-beta.3) (2026-02-21)

### Features

- 추천 결과 API response 타입 업데이트 ([#100](https://github.com/Nexters/yogieat/issues/100)) ([1d046ab](https://github.com/Nexters/yogieat/commit/1d046abea2361174e64927d29c92035da2899db5)), closes [#101](https://github.com/Nexters/yogieat/issues/101) [#102](https://github.com/Nexters/yogieat/issues/102)

## [1.5.0-beta.2](https://github.com/Nexters/yogieat/compare/v1.5.0-beta.1...v1.5.0-beta.2) (2026-02-21)

### Bug Fixes

- GitHub Actions 워크플로우 개선 및 스타일 가이드 업데이트 ([#91](https://github.com/Nexters/yogieat/issues/91)) ([e6c009e](https://github.com/Nexters/yogieat/commit/e6c009e7f27a8c75fbfb49f0dc9fd832c83643a5))

## [1.5.0-beta.1](https://github.com/Nexters/yogieat/compare/v1.4.0...v1.5.0-beta.1) (2026-02-20)

### Features

- 랜딩 페이지 header section Figma 시안 반영 ([#98](https://github.com/Nexters/yogieat/issues/98)) ([1ccef44](https://github.com/Nexters/yogieat/commit/1ccef4473f31f56285ba39b297c04fa94ed93225))

## [1.4.0](https://github.com/Nexters/yogieat/compare/v1.3.0...v1.4.0) (2026-02-20)

### Features

- 지역 선택 스텝 신규 지역 chip 5개 추가 ([#97](https://github.com/Nexters/yogieat/issues/97)) ([98d2575](https://github.com/Nexters/yogieat/commit/98d2575cbab481970502cfcdc5dd27710595d6dc))

### Bug Fixes

- 의견 수합 폼 스키마 검증 로직 개선 ([#96](https://github.com/Nexters/yogieat/issues/96)) ([447cc7f](https://github.com/Nexters/yogieat/commit/447cc7fca61c28bcf2dbf9a46e25ec7ef0afdfac))

## [1.3.0-beta.3](https://github.com/Nexters/yogieat/compare/v1.3.0-beta.2...v1.3.0-beta.3) (2026-02-20)

### Features

- 랜딩 페이지 header section Figma 시안 반영 ([#98](https://github.com/Nexters/yogieat/issues/98)) ([1ccef44](https://github.com/Nexters/yogieat/commit/1ccef4473f31f56285ba39b297c04fa94ed93225))

## [1.3.0-beta.2](https://github.com/Nexters/yogieat/compare/v1.3.0-beta.1...v1.3.0-beta.2) (2026-02-20)

### Features

- 지역 선택 스텝 신규 지역 chip 5개 추가 ([#97](https://github.com/Nexters/yogieat/issues/97)) ([98d2575](https://github.com/Nexters/yogieat/commit/98d2575cbab481970502cfcdc5dd27710595d6dc))

### Bug Fixes

- 의견 수합 폼 스키마 검증 로직 개선 ([#96](https://github.com/Nexters/yogieat/issues/96)) ([447cc7f](https://github.com/Nexters/yogieat/commit/447cc7fca61c28bcf2dbf9a46e25ec7ef0afdfac))

## [1.3.0](https://github.com/Nexters/yogieat/compare/v1.2.0...v1.3.0) (2026-02-19)

## [1.3.0-beta.1](https://github.com/Nexters/yogieat/compare/v1.2.0...v1.3.0-beta.1) (2026-02-19)

## [1.3.0](https://github.com/Nexters/yogieat/compare/v1.2.0...v1.3.0) (2026-02-19)

### Features

- Calendar 및 BottomSheet 컴포넌트 구현 ([#85](https://github.com/Nexters/yogieat/issues/85)) ([afd5007](https://github.com/Nexters/yogieat/commit/afd5007375455496f5e0c726a8b7708bb3a0d1ba)), closes [#848B9C](https://github.com/Nexters/yogieat/issues/848B9C)
- 랜딩 페이지 일러스트레이션을 Lottie 애니메이션으로 교체 ([#92](https://github.com/Nexters/yogieat/issues/92)) ([11d70f2](https://github.com/Nexters/yogieat/commit/11d70f215ee314b91db54a347a96ea77c566bb4a))

## [1.2.0-beta.3](https://github.com/Nexters/yogieat/compare/v1.2.0-beta.2...v1.2.0-beta.3) (2026-02-19)

### Features

- Calendar 및 BottomSheet 컴포넌트 구현 ([#85](https://github.com/Nexters/yogieat/issues/85)) ([afd5007](https://github.com/Nexters/yogieat/commit/afd5007375455496f5e0c726a8b7708bb3a0d1ba)), closes [#848B9C](https://github.com/Nexters/yogieat/issues/848B9C)

## [1.2.0-beta.2](https://github.com/Nexters/yogieat/compare/v1.2.0-beta.1...v1.2.0-beta.2) (2026-02-19)

### Features

- 랜딩 페이지 일러스트레이션을 Lottie 애니메이션으로 교체 ([#92](https://github.com/Nexters/yogieat/issues/92)) ([11d70f2](https://github.com/Nexters/yogieat/commit/11d70f215ee314b91db54a347a96ea77c566bb4a))

## [1.2.0-beta.1](https://github.com/Nexters/yogieat/compare/v1.1.1-beta.1...v1.2.0-beta.1) (2026-02-18)

### Features

- SEO 크롤링/인덱싱 및 소셜 공유 메타데이터 강화 ([#93](https://github.com/Nexters/yogieat/issues/93)) ([fe88b97](https://github.com/Nexters/yogieat/commit/fe88b9752722be8e658562403fb52410efce502d))

## [1.1.1-beta.1](https://github.com/Nexters/yogieat/compare/v1.1.0...v1.1.1-beta.1) (2026-02-18)

## [1.1.1](https://github.com/Nexters/yogieat/compare/v1.1.0...v1.1.1) (2026-02-18)

### Bug Fixes

- nickname step에서 Zod 유효성 검사 적용 ([7aec153](https://github.com/Nexters/yogieat/commit/7aec153e19d8c9a0590ca988e5621486054faa69))

## [1.1.0](https://github.com/Nexters/yogieat/compare/v1.0.0...v1.1.0) (2026-02-18)

### Features

- 비선호 음식 선택을 최대 2개까지 지정할 수 있도록 제한 ([#86](https://github.com/Nexters/yogieat/issues/86)) ([f037c79](https://github.com/Nexters/yogieat/commit/f037c799cdd51da3d90e6bd777f1466639f2fbe9))
- 의견 수렴 퍼널에 닉네임 입력 단계 추가 ([#90](https://github.com/Nexters/yogieat/issues/90)) ([e62b44a](https://github.com/Nexters/yogieat/commit/e62b44a91c0624c28fd6b4778d40d1ce11d806be))

## [1.0.0-beta.4](https://github.com/Nexters/yogieat/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2026-02-17)

### Features

- 비선호 음식 선택을 최대 2개까지 지정할 수 있도록 제한 ([#86](https://github.com/Nexters/yogieat/issues/86)) ([f037c79](https://github.com/Nexters/yogieat/commit/f037c799cdd51da3d90e6bd777f1466639f2fbe9))

## [1.0.0-beta.3](https://github.com/Nexters/yogieat/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2026-02-17)

### Features

- 의견 수렴 퍼널에 닉네임 입력 단계 추가 ([#90](https://github.com/Nexters/yogieat/issues/90)) ([e62b44a](https://github.com/Nexters/yogieat/commit/e62b44a91c0624c28fd6b4778d40d1ce11d806be))

## 1.0.0 (2026-02-16)

### Features

- [#70](https://github.com/Nexters/yogieat/issues/70) ([#72](https://github.com/Nexters/yogieat/issues/72)) ([b676e0e](https://github.com/Nexters/yogieat/commit/b676e0eee1b4b0f2ee9e42c28dcaf132c77c0f5f))
- [QA] 모임 생성 완료, 결과페이지 페이지 UI 개선 ([#66](https://github.com/Nexters/yogieat/issues/66)) ([f10225d](https://github.com/Nexters/yogieat/commit/f10225d3308eda57f1a1d5b05b2b1fe4de05e976))
- [QA] 서비스 전체 배경색 및 Layout Root 그림자 효과 적용 ([#59](https://github.com/Nexters/yogieat/issues/59)) ([384b56f](https://github.com/Nexters/yogieat/commit/384b56fbf513cc4104aad751d122a73fec0bdfdb))
- analytics 개선 및 네이버 서치 어드바이저 등록 ([#88](https://github.com/Nexters/yogieat/issues/88)) ([4372aa5](https://github.com/Nexters/yogieat/commit/4372aa5daaf21939fd85d58521edc16f403ac8ea))
- api client 모듈 생성 ([#37](https://github.com/Nexters/yogieat/issues/37)) ([a37b0a9](https://github.com/Nexters/yogieat/commit/a37b0a933dd0a21e66096fc8a79bf368bd66f9a8)), closes [#38](https://github.com/Nexters/yogieat/issues/38) [#39](https://github.com/Nexters/yogieat/issues/39) [#40](https://github.com/Nexters/yogieat/issues/40) [#41](https://github.com/Nexters/yogieat/issues/41)
- Button 컴포넌트 추가 ([#11](https://github.com/Nexters/yogieat/issues/11)) ([83b7607](https://github.com/Nexters/yogieat/commit/83b7607b7a1e2044b7bfaaef4202ca00f382bb38))
- Chip Component 추가 ([#9](https://github.com/Nexters/yogieat/issues/9)) ([e9d8b8f](https://github.com/Nexters/yogieat/commit/e9d8b8f11079b1a1d901fb60623a88df7097c866))
- Color theme 초기화 ([#2](https://github.com/Nexters/yogieat/issues/2)) ([97f1dcc](https://github.com/Nexters/yogieat/commit/97f1dccfc27db6ed6e90b7d93189ca2c95075214))
- DotsLoader 컴포넌트 추가 ([#48](https://github.com/Nexters/yogieat/issues/48)) ([cfe4582](https://github.com/Nexters/yogieat/commit/cfe4582549de5d8797fdc25d0e4c6e21c9c45c9f)), closes [#49](https://github.com/Nexters/yogieat/issues/49)
- GA4 이벤트 트래킹 통합 ([#70](https://github.com/Nexters/yogieat/issues/70)) ([0c1b9fa](https://github.com/Nexters/yogieat/commit/0c1b9fa5e1d0f26aa08d6d98edc7593f20480556))
- GTM(Google Tag Manager) 통합을 위한 Analytics 컴포넌트 추가 ([#57](https://github.com/Nexters/yogieat/issues/57)) ([87a6ded](https://github.com/Nexters/yogieat/commit/87a6ded085d57509b77309a003e458b72e83f848))
- IconBase 컴포넌트 및 아이콘 컴포넌트들 구축 ([#13](https://github.com/Nexters/yogieat/issues/13)) ([8557b75](https://github.com/Nexters/yogieat/commit/8557b750de7600a7e030a190d86feb04dc639c14)), closes [#FFCD00](https://github.com/Nexters/yogieat/issues/FFCD00) [#FFAD00](https://github.com/Nexters/yogieat/issues/FFAD00) [#15](https://github.com/Nexters/yogieat/issues/15) [#ff5a3c](https://github.com/Nexters/yogieat/issues/ff5a3c)
- InputField 컴포넌트 추가 ([#16](https://github.com/Nexters/yogieat/issues/16)) ([99b8aa2](https://github.com/Nexters/yogieat/commit/99b8aa2463b405ca0d89d395eb0cabfa19bca420))
- Landing / Opinion Form 페이지 분리 ([#61](https://github.com/Nexters/yogieat/issues/61)) ([0f11e71](https://github.com/Nexters/yogieat/commit/0f11e717e5a3b6cf7498589895f1f407512aee57))
- Layout 컴포넌트 추가 ([#10](https://github.com/Nexters/yogieat/issues/10)) ([9efce6f](https://github.com/Nexters/yogieat/commit/9efce6fb31394a315987ed3dfeb77b1650b3247e))
- Semantic Color Token 추가 ([#19](https://github.com/Nexters/yogieat/issues/19)) ([fcaedaf](https://github.com/Nexters/yogieat/commit/fcaedafbcbf133f102807de2e4c33a1e1c946576))
- Spacing utility 클래스 초기화 ([#8](https://github.com/Nexters/yogieat/issues/8)) ([2e38d7a](https://github.com/Nexters/yogieat/commit/2e38d7a187402b0869c650faebec8da9911dd177))
- Tag 컴포넌트 추가 ([#20](https://github.com/Nexters/yogieat/issues/20)) ([f69dd05](https://github.com/Nexters/yogieat/commit/f69dd05e91374d2a085e27c52e5b0707fe48ee6a))
- Toast 컴포넌트 추가 ([#21](https://github.com/Nexters/yogieat/issues/21)) ([76e84b0](https://github.com/Nexters/yogieat/commit/76e84b0f7c0179a7913b6aebd990b01a22ed4c18))
- 모임 생성 완료 페이지 UI 리뉴얼 ([#89](https://github.com/Nexters/yogieat/issues/89)) ([17a3fc1](https://github.com/Nexters/yogieat/commit/17a3fc1b55c09593e63d771644c68e05e19d3c30))
- 모임 생성 퍼널 Step 1 (인원 선택) 구현 ([#23](https://github.com/Nexters/yogieat/issues/23)) ([7fc01a1](https://github.com/Nexters/yogieat/commit/7fc01a1ee7a83873fd11bccf36aa7e341112c967)), closes [#24](https://github.com/Nexters/yogieat/issues/24) [#1f2933](https://github.com/Nexters/yogieat/issues/1f2933) [#ff5a3c](https://github.com/Nexters/yogieat/issues/ff5a3c) [#25](https://github.com/Nexters/yogieat/issues/25) [#26](https://github.com/Nexters/yogieat/issues/26) [#27](https://github.com/Nexters/yogieat/issues/27) [#28](https://github.com/Nexters/yogieat/issues/28) [#29](https://github.com/Nexters/yogieat/issues/29) [#30](https://github.com/Nexters/yogieat/issues/30) [#31](https://github.com/Nexters/yogieat/issues/31) [#32](https://github.com/Nexters/yogieat/issues/32) [#34](https://github.com/Nexters/yogieat/issues/34)
- 프로젝트 기초 세팅 진행 ([aa0ec20](https://github.com/Nexters/yogieat/commit/aa0ec20d1d0dc13392ceeaf8c9d059397178417e))
- 프로젝트 폴더 구조 반영 ([e54962d](https://github.com/Nexters/yogieat/commit/e54962dc4664b363c9c23f64653c5048bdb758f3))

### Bug Fixes

- 1순위를 1개라도 선택했다면 바로 CTA 가 활성화 되도록 수정 ([#60](https://github.com/Nexters/yogieat/issues/60)) ([e5758b4](https://github.com/Nexters/yogieat/commit/e5758b434b4066b88104db3134f3375a1c85e0d8))
- 1차 MVP 배포 이전 최종 QA 항목 반영 ([#58](https://github.com/Nexters/yogieat/issues/58)) ([6574231](https://github.com/Nexters/yogieat/commit/6574231c2734386ccf706a910efc96700c23af16))
- Button/Chip type 속성 추가 및 의견 수렴 UX 개선 ([#50](https://github.com/Nexters/yogieat/issues/50)) ([7e86e4a](https://github.com/Nexters/yogieat/commit/7e86e4a88263c493df289175b5509df5ffe867cd)), closes [#51](https://github.com/Nexters/yogieat/issues/51) [#52](https://github.com/Nexters/yogieat/issues/52) [#53](https://github.com/Nexters/yogieat/issues/53) [#54](https://github.com/Nexters/yogieat/issues/54) [#55](https://github.com/Nexters/yogieat/issues/55) [#56](https://github.com/Nexters/yogieat/issues/56)
- cat 에서 echo 로 env.production 파일을 생성하도록 수정 ([f15307d](https://github.com/Nexters/yogieat/commit/f15307d12610660f8180c213f5fb14f9ca457e7f))
- CI/CD health check 타이밍 개선 및 수동 배포 기능 추가 ([54fd2b8](https://github.com/Nexters/yogieat/commit/54fd2b8f092151071fdd42753d7ca944767d2a88))
- Docker build-args로 환경 변수 전달 방식 변경 ([#77](https://github.com/Nexters/yogieat/issues/77)) ([e5fa0b9](https://github.com/Nexters/yogieat/commit/e5fa0b96f73ad3841dd927c3f74b8fc11a49f683))
- Docker 이미지 강제 pull 및 컨테이너 재생성 ([#79](https://github.com/Nexters/yogieat/issues/79)) ([c253ec1](https://github.com/Nexters/yogieat/commit/c253ec193728e575fa5086d58b968088233c2feb))
- Health check 전략 개선 및 curl 기반으로 변경 ([765d3da](https://github.com/Nexters/yogieat/commit/765d3da2f63ce151b5218c8070a8e639e47da7d9))
- nginx http2 deprecated 경고 해결 ([2fd9c75](https://github.com/Nexters/yogieat/commit/2fd9c758c4b1f5643e6356a5c914abc6c01680e0))
- PendingView 내에서 ShareButton 을 렌더링 하지 않도록 수정 ([7bc3e12](https://github.com/Nexters/yogieat/commit/7bc3e12315377c91d9e94b193fd1216658dd234a))
- 결과 페이지 맛집 이미지 기본 placeholder, 공유하기 toast 미노출 ([#68](https://github.com/Nexters/yogieat/issues/68)) ([3c80844](https://github.com/Nexters/yogieat/commit/3c80844b259b2486aa162e8f915a7b7306ac2174))
- 동시 배포 방지를 위한 concurrency 설정 추가 ([e9bfd52](https://github.com/Nexters/yogieat/commit/e9bfd52b0091797a939365ac8e84cebef76ed9ee))
- 모임 생성 퍼널 필드 상태 초기화 버그 수정 ([#64](https://github.com/Nexters/yogieat/issues/64)) ([3934066](https://github.com/Nexters/yogieat/commit/3934066049c41dc6ec55b8d78e8cf316f418ba2a)), closes [#65](https://github.com/Nexters/yogieat/issues/65)
- 모임 생성 폼 필드명 변경 (meetingDate → scheduledDate, location → region) ([#35](https://github.com/Nexters/yogieat/issues/35)) ([e90beed](https://github.com/Nexters/yogieat/commit/e90beedd82abed89eb7729cced7612668755de95))
- 배포 워크플로우에 GA4 환경 변수 추가 ([#73](https://github.com/Nexters/yogieat/issues/73)) ([835ae1f](https://github.com/Nexters/yogieat/commit/835ae1f576fb628e99e49fb6e923c355a9a07414))
- 의견 수렴 페이지 내 UI 수정 및 인터렉션 개선 ([#36](https://github.com/Nexters/yogieat/issues/36)) ([a74f7da](https://github.com/Nexters/yogieat/commit/a74f7dabdff14f7f2eb130b5599b778e10bd2c00))
- 의견 수합 Form Capacity 폴링 제거 및 ErrorCode 타입 시스템 추가 ([#67](https://github.com/Nexters/yogieat/issues/67)) ([d55dba1](https://github.com/Nexters/yogieat/commit/d55dba1ebbb1009739c1bd9279ed0c6c3d67cef6))
- 인원 수 선택 Grid 및 의견 수렴 QA 수정 사항 반영 ([f01626e](https://github.com/Nexters/yogieat/commit/f01626e739650491df3390fd9a9412ff0901ab2b))
- 테스트 용으로 추가했던 페이지 제거 및 icons 폴더 추가 ([4116025](https://github.com/Nexters/yogieat/commit/41160259867ae4766686eab6e4b48881daf8c981))

### Code Refactoring

- Button 컴포넌트 스펙을 Figma 명세에 맞춰 수정 ([#14](https://github.com/Nexters/yogieat/issues/14)) ([2e27f17](https://github.com/Nexters/yogieat/commit/2e27f17d947f69e1a139cc75103104729b47fd74))

### Build System

- Docker 빌드 시 NEXT_PUBLIC 환경변수 주입 프로세스 추가 ([#47](https://github.com/Nexters/yogieat/issues/47)) ([88ba163](https://github.com/Nexters/yogieat/commit/88ba16308a08e93abf448ca27ada9eef3511dcf2))

### Documentation

- 프로젝트 개발 가이드 문서 추가 ([#84](https://github.com/Nexters/yogieat/issues/84)) ([4313145](https://github.com/Nexters/yogieat/commit/43131453fd650392629f25b8140944025a5cad94))

## [1.0.0-beta.2](https://github.com/Nexters/yogieat/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2026-02-16)

### Features

- analytics 개선 및 네이버 서치 어드바이저 등록 ([#88](https://github.com/Nexters/yogieat/issues/88)) ([4372aa5](https://github.com/Nexters/yogieat/commit/4372aa5daaf21939fd85d58521edc16f403ac8ea))
- 모임 생성 완료 페이지 UI 리뉴얼 ([#89](https://github.com/Nexters/yogieat/issues/89)) ([17a3fc1](https://github.com/Nexters/yogieat/commit/17a3fc1b55c09593e63d771644c68e05e19d3c30))

## 1.0.0-beta.1 (2026-02-16)

### Features

- [#70](https://github.com/Nexters/yogieat/issues/70) ([#72](https://github.com/Nexters/yogieat/issues/72)) ([b676e0e](https://github.com/Nexters/yogieat/commit/b676e0eee1b4b0f2ee9e42c28dcaf132c77c0f5f))
- [QA] 모임 생성 완료, 결과페이지 페이지 UI 개선 ([#66](https://github.com/Nexters/yogieat/issues/66)) ([f10225d](https://github.com/Nexters/yogieat/commit/f10225d3308eda57f1a1d5b05b2b1fe4de05e976))
- [QA] 서비스 전체 배경색 및 Layout Root 그림자 효과 적용 ([#59](https://github.com/Nexters/yogieat/issues/59)) ([384b56f](https://github.com/Nexters/yogieat/commit/384b56fbf513cc4104aad751d122a73fec0bdfdb))
- api client 모듈 생성 ([#37](https://github.com/Nexters/yogieat/issues/37)) ([a37b0a9](https://github.com/Nexters/yogieat/commit/a37b0a933dd0a21e66096fc8a79bf368bd66f9a8)), closes [#38](https://github.com/Nexters/yogieat/issues/38) [#39](https://github.com/Nexters/yogieat/issues/39) [#40](https://github.com/Nexters/yogieat/issues/40) [#41](https://github.com/Nexters/yogieat/issues/41)
- Button 컴포넌트 추가 ([#11](https://github.com/Nexters/yogieat/issues/11)) ([83b7607](https://github.com/Nexters/yogieat/commit/83b7607b7a1e2044b7bfaaef4202ca00f382bb38))
- Chip Component 추가 ([#9](https://github.com/Nexters/yogieat/issues/9)) ([e9d8b8f](https://github.com/Nexters/yogieat/commit/e9d8b8f11079b1a1d901fb60623a88df7097c866))
- Color theme 초기화 ([#2](https://github.com/Nexters/yogieat/issues/2)) ([97f1dcc](https://github.com/Nexters/yogieat/commit/97f1dccfc27db6ed6e90b7d93189ca2c95075214))
- DotsLoader 컴포넌트 추가 ([#48](https://github.com/Nexters/yogieat/issues/48)) ([cfe4582](https://github.com/Nexters/yogieat/commit/cfe4582549de5d8797fdc25d0e4c6e21c9c45c9f)), closes [#49](https://github.com/Nexters/yogieat/issues/49)
- GA4 이벤트 트래킹 통합 ([#70](https://github.com/Nexters/yogieat/issues/70)) ([0c1b9fa](https://github.com/Nexters/yogieat/commit/0c1b9fa5e1d0f26aa08d6d98edc7593f20480556))
- GTM(Google Tag Manager) 통합을 위한 Analytics 컴포넌트 추가 ([#57](https://github.com/Nexters/yogieat/issues/57)) ([87a6ded](https://github.com/Nexters/yogieat/commit/87a6ded085d57509b77309a003e458b72e83f848))
- IconBase 컴포넌트 및 아이콘 컴포넌트들 구축 ([#13](https://github.com/Nexters/yogieat/issues/13)) ([8557b75](https://github.com/Nexters/yogieat/commit/8557b750de7600a7e030a190d86feb04dc639c14)), closes [#FFCD00](https://github.com/Nexters/yogieat/issues/FFCD00) [#FFAD00](https://github.com/Nexters/yogieat/issues/FFAD00) [#15](https://github.com/Nexters/yogieat/issues/15) [#ff5a3c](https://github.com/Nexters/yogieat/issues/ff5a3c)
- InputField 컴포넌트 추가 ([#16](https://github.com/Nexters/yogieat/issues/16)) ([99b8aa2](https://github.com/Nexters/yogieat/commit/99b8aa2463b405ca0d89d395eb0cabfa19bca420))
- Landing / Opinion Form 페이지 분리 ([#61](https://github.com/Nexters/yogieat/issues/61)) ([0f11e71](https://github.com/Nexters/yogieat/commit/0f11e717e5a3b6cf7498589895f1f407512aee57))
- Layout 컴포넌트 추가 ([#10](https://github.com/Nexters/yogieat/issues/10)) ([9efce6f](https://github.com/Nexters/yogieat/commit/9efce6fb31394a315987ed3dfeb77b1650b3247e))
- Semantic Color Token 추가 ([#19](https://github.com/Nexters/yogieat/issues/19)) ([fcaedaf](https://github.com/Nexters/yogieat/commit/fcaedafbcbf133f102807de2e4c33a1e1c946576))
- Spacing utility 클래스 초기화 ([#8](https://github.com/Nexters/yogieat/issues/8)) ([2e38d7a](https://github.com/Nexters/yogieat/commit/2e38d7a187402b0869c650faebec8da9911dd177))
- Tag 컴포넌트 추가 ([#20](https://github.com/Nexters/yogieat/issues/20)) ([f69dd05](https://github.com/Nexters/yogieat/commit/f69dd05e91374d2a085e27c52e5b0707fe48ee6a))
- Toast 컴포넌트 추가 ([#21](https://github.com/Nexters/yogieat/issues/21)) ([76e84b0](https://github.com/Nexters/yogieat/commit/76e84b0f7c0179a7913b6aebd990b01a22ed4c18))
- 모임 생성 퍼널 Step 1 (인원 선택) 구현 ([#23](https://github.com/Nexters/yogieat/issues/23)) ([7fc01a1](https://github.com/Nexters/yogieat/commit/7fc01a1ee7a83873fd11bccf36aa7e341112c967)), closes [#24](https://github.com/Nexters/yogieat/issues/24) [#1f2933](https://github.com/Nexters/yogieat/issues/1f2933) [#ff5a3c](https://github.com/Nexters/yogieat/issues/ff5a3c) [#25](https://github.com/Nexters/yogieat/issues/25) [#26](https://github.com/Nexters/yogieat/issues/26) [#27](https://github.com/Nexters/yogieat/issues/27) [#28](https://github.com/Nexters/yogieat/issues/28) [#29](https://github.com/Nexters/yogieat/issues/29) [#30](https://github.com/Nexters/yogieat/issues/30) [#31](https://github.com/Nexters/yogieat/issues/31) [#32](https://github.com/Nexters/yogieat/issues/32) [#34](https://github.com/Nexters/yogieat/issues/34)
- 프로젝트 기초 세팅 진행 ([aa0ec20](https://github.com/Nexters/yogieat/commit/aa0ec20d1d0dc13392ceeaf8c9d059397178417e))
- 프로젝트 폴더 구조 반영 ([e54962d](https://github.com/Nexters/yogieat/commit/e54962dc4664b363c9c23f64653c5048bdb758f3))

### Bug Fixes

- 1순위를 1개라도 선택했다면 바로 CTA 가 활성화 되도록 수정 ([#60](https://github.com/Nexters/yogieat/issues/60)) ([e5758b4](https://github.com/Nexters/yogieat/commit/e5758b434b4066b88104db3134f3375a1c85e0d8))
- 1차 MVP 배포 이전 최종 QA 항목 반영 ([#58](https://github.com/Nexters/yogieat/issues/58)) ([6574231](https://github.com/Nexters/yogieat/commit/6574231c2734386ccf706a910efc96700c23af16))
- Button/Chip type 속성 추가 및 의견 수렴 UX 개선 ([#50](https://github.com/Nexters/yogieat/issues/50)) ([7e86e4a](https://github.com/Nexters/yogieat/commit/7e86e4a88263c493df289175b5509df5ffe867cd)), closes [#51](https://github.com/Nexters/yogieat/issues/51) [#52](https://github.com/Nexters/yogieat/issues/52) [#53](https://github.com/Nexters/yogieat/issues/53) [#54](https://github.com/Nexters/yogieat/issues/54) [#55](https://github.com/Nexters/yogieat/issues/55) [#56](https://github.com/Nexters/yogieat/issues/56)
- cat 에서 echo 로 env.production 파일을 생성하도록 수정 ([f15307d](https://github.com/Nexters/yogieat/commit/f15307d12610660f8180c213f5fb14f9ca457e7f))
- CI/CD health check 타이밍 개선 및 수동 배포 기능 추가 ([54fd2b8](https://github.com/Nexters/yogieat/commit/54fd2b8f092151071fdd42753d7ca944767d2a88))
- Docker build-args로 환경 변수 전달 방식 변경 ([#77](https://github.com/Nexters/yogieat/issues/77)) ([e5fa0b9](https://github.com/Nexters/yogieat/commit/e5fa0b96f73ad3841dd927c3f74b8fc11a49f683))
- Docker 이미지 강제 pull 및 컨테이너 재생성 ([#79](https://github.com/Nexters/yogieat/issues/79)) ([c253ec1](https://github.com/Nexters/yogieat/commit/c253ec193728e575fa5086d58b968088233c2feb))
- Health check 전략 개선 및 curl 기반으로 변경 ([765d3da](https://github.com/Nexters/yogieat/commit/765d3da2f63ce151b5218c8070a8e639e47da7d9))
- nginx http2 deprecated 경고 해결 ([2fd9c75](https://github.com/Nexters/yogieat/commit/2fd9c758c4b1f5643e6356a5c914abc6c01680e0))
- PendingView 내에서 ShareButton 을 렌더링 하지 않도록 수정 ([7bc3e12](https://github.com/Nexters/yogieat/commit/7bc3e12315377c91d9e94b193fd1216658dd234a))
- 결과 페이지 맛집 이미지 기본 placeholder, 공유하기 toast 미노출 ([#68](https://github.com/Nexters/yogieat/issues/68)) ([3c80844](https://github.com/Nexters/yogieat/commit/3c80844b259b2486aa162e8f915a7b7306ac2174))
- 동시 배포 방지를 위한 concurrency 설정 추가 ([e9bfd52](https://github.com/Nexters/yogieat/commit/e9bfd52b0091797a939365ac8e84cebef76ed9ee))
- 모임 생성 퍼널 필드 상태 초기화 버그 수정 ([#64](https://github.com/Nexters/yogieat/issues/64)) ([3934066](https://github.com/Nexters/yogieat/commit/3934066049c41dc6ec55b8d78e8cf316f418ba2a)), closes [#65](https://github.com/Nexters/yogieat/issues/65)
- 모임 생성 폼 필드명 변경 (meetingDate → scheduledDate, location → region) ([#35](https://github.com/Nexters/yogieat/issues/35)) ([e90beed](https://github.com/Nexters/yogieat/commit/e90beedd82abed89eb7729cced7612668755de95))
- 배포 워크플로우에 GA4 환경 변수 추가 ([#73](https://github.com/Nexters/yogieat/issues/73)) ([835ae1f](https://github.com/Nexters/yogieat/commit/835ae1f576fb628e99e49fb6e923c355a9a07414))
- 의견 수렴 페이지 내 UI 수정 및 인터렉션 개선 ([#36](https://github.com/Nexters/yogieat/issues/36)) ([a74f7da](https://github.com/Nexters/yogieat/commit/a74f7dabdff14f7f2eb130b5599b778e10bd2c00))
- 의견 수합 Form Capacity 폴링 제거 및 ErrorCode 타입 시스템 추가 ([#67](https://github.com/Nexters/yogieat/issues/67)) ([d55dba1](https://github.com/Nexters/yogieat/commit/d55dba1ebbb1009739c1bd9279ed0c6c3d67cef6))
- 인원 수 선택 Grid 및 의견 수렴 QA 수정 사항 반영 ([f01626e](https://github.com/Nexters/yogieat/commit/f01626e739650491df3390fd9a9412ff0901ab2b))
- 테스트 용으로 추가했던 페이지 제거 및 icons 폴더 추가 ([4116025](https://github.com/Nexters/yogieat/commit/41160259867ae4766686eab6e4b48881daf8c981))

### Code Refactoring

- Button 컴포넌트 스펙을 Figma 명세에 맞춰 수정 ([#14](https://github.com/Nexters/yogieat/issues/14)) ([2e27f17](https://github.com/Nexters/yogieat/commit/2e27f17d947f69e1a139cc75103104729b47fd74))

### Build System

- Docker 빌드 시 NEXT_PUBLIC 환경변수 주입 프로세스 추가 ([#47](https://github.com/Nexters/yogieat/issues/47)) ([88ba163](https://github.com/Nexters/yogieat/commit/88ba16308a08e93abf448ca27ada9eef3511dcf2))

### Documentation

- 프로젝트 개발 가이드 문서 추가 ([#84](https://github.com/Nexters/yogieat/issues/84)) ([4313145](https://github.com/Nexters/yogieat/commit/43131453fd650392629f25b8140944025a5cad94))

## [Unreleased]

### Added

- Automated semantic versioning with semantic-release
- CHANGELOG.md auto-generation
- GitHub Release automation
- Beta pre-releases on develop branch
- Comprehensive contribution guidelines (CONTRIBUTING.md)
- Release process documentation (docs/RELEASE.md)
- Developer cheatsheet (docs/DEVELOPER_CHEATSHEET.md)

---

_Note: This CHANGELOG will be automatically updated by semantic-release based on conventional commits._
