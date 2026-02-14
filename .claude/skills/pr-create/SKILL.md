---
name: pr-create
description: Generate GitHub PR documentation from commit history, following project's PULL_REQUEST_TEMPLATE.md format. Trigger with "create pr", "/pr-create", or "pr from commits".
metadata:
  author: Yogieat Team
  version: "2.0.0"
  argument-hint: <optional-base-branch>
---

# PR Documentation Generator

현재 브랜치의 커밋 이력을 분석하여 프로젝트의 PULL_REQUEST_TEMPLATE.md 형식에 맞는 GitHub Pull Request 문서를 자동으로 생성합니다.

## How It Works

### 1. 브랜치 정보 수집

```bash
# 현재 브랜치명 가져오기
git branch --show-current

# 기본 베이스 브랜치 확인 (develop 또는 main)
git branch -r --contains HEAD
```

### 2. 베이스 브랜치 결정

**방법 1: 사용자 인자 사용**
```bash
# /pr-create <base-branch> 형식으로 호출된 경우
# 예: /pr-create develop
```

**방법 2: 기본값 사용**
```bash
# 인자가 없으면 main 브랜치를 기본값으로 사용
# 프로젝트의 기본 브랜치가 develop이면 develop 사용
git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'
```

### 3. 고유 커밋 또는 변경사항 추출

**방법 1: 커밋 기반 (우선)**
```bash
# 베이스 브랜치와 현재 브랜치의 차이점 추출
git log <base-branch>..HEAD --pretty=format:"%H|||%s|||%b" --no-merges

# 출력 형식: commit_hash|||subject|||body
# 예: abc123|||feat: 새 기능 추가|||상세 설명...
```

**방법 2: Staged Changes 기반 (커밋이 없을 때)**
```bash
# Staged 파일 목록
git diff --cached --name-only

# Staged 변경사항 요약
git diff --cached --stat

# 상세 diff
git diff --cached
```

**방법 3: Working Directory Changes 기반 (Staged도 없을 때)**
```bash
# 변경된 파일 목록
git status --short

# 변경사항 요약
git diff --stat

# 상세 diff
git diff
```

### 4. 커밋 분석 및 그룹핑

**Conventional Commit 타입 매핑:**
- `feat` → "기능 추가"
- `fix` → "버그 수정"
- `refactor` → "리팩토링"
- `chore` → "기타 작업"
- `docs` → "문서 작업"
- `style` → "스타일 변경"
- `perf` → "성능 개선"
- `test` → "테스트"
- `build` → "빌드 시스템"
- `ci` → "CI/CD"

**그룹핑 알고리즘:**
1. 각 커밋 메시지를 파싱하여 타입 추출
2. 타입별로 커밋들을 그룹화
3. 각 커밋의 subject를 한글 완성형 문장으로 변환
   - "새 기능 추가" → "새 기능을 추가합니다"
   - "버그 수정" → "버그를 수정합니다"
   - "컴포넌트 개선" → "컴포넌트를 개선합니다"

### 5. PR 제목 생성

**생성 규칙:**
1. 첫 번째 커밋 메시지를 기본으로 사용
2. Conventional Commit 형식에서 **scope는 무조건 제거** (타입: 내용)
   - `feat(ci):` → `feat:`
   - `fix(api):` → `fix:`
   - `docs(readme):` → `docs:`
3. 내용이 길면 핵심만 추출하여 간결하게 작성
4. 길이 제한: 50자 이내 권장

**예시:**
- 커밋: `fix(ci): CI/CD health check 타이밍 개선 및 수동 배포 기능 추가` → 제목: `fix: CI/CD health check 타이밍 개선 및 수동 배포 기능 추가`
- 커밋: `feat(component): 새로운 버튼 컴포넌트 추가` → 제목: `feat: 새로운 버튼 컴포넌트 추가`
- 커밋: `docs: 프로젝트 가이드 추가` → 제목: `docs: 프로젝트 가이드 추가`

### 6. Markdown 문서 생성

**출력 경로:** `.claude/pr-drafts/{branch-name}.md`

**템플릿 구조:** (프로젝트의 `.github/PULL_REQUEST_TEMPLATE.md` 형식 준수)
```markdown
# 🎯 PR 제목

{generated-title}

# 📑 작업 상세 내역

{grouped-commits}

# 🙏 리뷰 요청 사항

- {간단한 리뷰 요청 사항 (1-3줄)}

# 📃 참고 자료

- {관련 이슈 또는 문서 링크}

# 🖼️ 작업 결과물

- {작업 결과물 설명 또는 링크}
```

**작업 상세 내역 섹션 형식:**
```markdown
- **기능 추가**
  - A 기능을 추가합니다
  - B 컴포넌트를 구현합니다
- **버그 수정**
  - C 이슈를 해결합니다
  - D 에러를 수정합니다
```

## Error Handling

### 커밋이 없는 경우

**대응 방법 1: Staged Changes 확인**
```bash
# 커밋이 없으면 staged changes 확인
git diff --cached --name-only

# Staged 파일이 있으면 변경 내역을 기반으로 PR 문서 생성
git diff --cached --stat
```

**대응 방법 2: Working Directory Changes 확인**
```bash
# Staged도 없으면 working directory changes 확인
git status --short

# 변경된 파일이 있으면 변경 내역을 기반으로 PR 문서 생성
git diff --stat
```

**완전히 변경사항이 없는 경우**
```
❌ 오류: 현재 브랜치({branch})에 커밋도 변경사항도 없습니다.
베이스 브랜치({base})와 비교하여 새로운 변경사항을 추가한 후 다시 시도하세요.
```

**변경사항 기반 문서 생성 시 메시지**
```
ℹ️  알림: 커밋이 없어 현재 변경사항(staged/unstaged)을 기반으로 PR 문서를 생성합니다.
변경된 파일: {file-list}

💡 팁: 커밋 후 다시 실행하면 더 정확한 PR 문서를 생성할 수 있습니다.
```

### 베이스 브랜치를 찾을 수 없는 경우
```
⚠️  경고: 베이스 브랜치를 자동으로 찾을 수 없습니다.
기본값으로 'main'을 사용합니다.
다른 베이스 브랜치를 사용하려면 /pr-create <base-branch> 형식으로 실행하세요.
```


## Execution Steps

스킬이 실행되면 다음 순서로 진행하세요:

1. **브랜치 확인**
   - `git branch --show-current`로 현재 브랜치 확인
   - 인자로 베이스 브랜치가 주어졌으면 사용, 없으면 develop/main 추정

2. **커밋 또는 변경사항 추출**
   - `git log <base>..<current> --pretty=format:"%s" --no-merges`로 고유 커밋 수집
   - **커밋이 없는 경우:**
     1. `git diff --cached --name-only`로 staged changes 확인
     2. Staged가 없으면 `git status --short`로 working directory changes 확인
     3. 둘 다 없으면 에러 메시지 출력 후 종료
     4. 변경사항이 있으면 파일 목록과 diff를 기반으로 작업 내역 추정

3. **커밋/변경사항 분석 및 그룹핑**
   - **커밋이 있는 경우:**
     - 각 커밋 메시지에서 Conventional Commit 타입 추출
     - 타입별로 그룹핑하여 "작업 상세 내역" 섹션 생성
   - **커밋이 없는 경우:**
     - 변경된 파일 경로와 diff 내용을 분석
     - 파일 종류에 따라 작업 내역 추정 (예: `.yml` → CI/CD 작업, `.tsx` → 컴포넌트 작업)
     - 간단한 bullet point로 작성
   - 각 항목은 2단계 bullet으로 작성 (카테고리 → 세부 내역)

4. **PR 제목 생성**
   - **커밋이 있는 경우:** 첫 번째 커밋 메시지를 제목으로 사용
   - **scope 제거:** Conventional Commit의 scope 괄호는 무조건 제거
     - `feat(ci):` → `feat:`
     - `fix(api):` → `fix:`
   - **커밋이 없는 경우:** 변경된 파일/내용을 기반으로 제목 생성
     - 예: `chore: CI/CD 워크플로우 개선` (yml 파일 변경 시)
     - 예: `feat: 컴포넌트 추가` (tsx 파일 추가 시)
   - 20-50자 길이로 조정

5. **리뷰 요청 사항 생성**
   - 커밋 내용을 바탕으로 1-3줄의 간단한 리뷰 요청 사항 작성
   - 구체적인 검증 포인트를 bullet point로 나열

6. **문서 생성**
   - `.claude/pr-drafts/` 디렉토리 생성 (없으면)
   - `{branch-name}.md` 파일 생성
   - PULL_REQUEST_TEMPLATE.md 형식에 따라 내용 작성
   - 참고 자료와 작업 결과물은 기본 내용만 제공 (사용자가 추가 작성)

7. **결과 출력**
   ```
   ✅ PR 문서가 생성되었습니다!

   📄 파일 경로: .claude/pr-drafts/{branch-name}.md
   📝 PR 제목: {generated-title}

   다음 단계:
   1. 생성된 파일을 열어 내용을 확인하세요
   2. 필요시 "참고 자료"와 "작업 결과물" 섹션을 추가 작성하세요
   3. /pr-submit 명령어로 GitHub에 PR을 업로드하세요
      (자동으로 reviewer, label, assignee가 설정됩니다)
   ```

## Usage Examples

### 기본 사용
```
/pr-create
```
현재 브랜치에서 main을 베이스로 PR 문서 생성

### 특정 베이스 브랜치 지정
```
/pr-create develop
```
develop 브랜치를 베이스로 PR 문서 생성

### 대화형 실행
```
User: "PR 문서 만들어줘"
User: "커밋으로 PR 생성해줘"
User: "이 브랜치로 pull request 만들고 싶어"
```

### 생성 예시 1: 커밋이 있는 경우

**커밋 내역:**
```
fix: CI/CD health check 타이밍 개선 및 수동 배포 기능 추가
```

**생성되는 문서:**
```markdown
# 🎯 PR 제목

fix: CI/CD health check 타이밍 개선 및 수동 배포 기능 추가

# 📑 작업 상세 내역

- **버그 수정**
  - CI/CD health check 타이밍 race condition을 해결합니다
  - Container 'starting' 상태로 인한 false positive 실패를 방지합니다

- **기능 추가**
  - GitHub Actions 수동 배포 기능을 추가합니다
  - 배포 컴포넌트 선택 옵션을 제공합니다

# 🙏 리뷰 요청 사항

- 조건부 로직이 올바르게 동작하는지 검증해주세요.
- Health check 대기 시간이 적절한지 검토해주세요.

# 📃 참고 자료

- 관련 이슈: Production 배포 시 health check 오류
- 변경된 파일: production-deploy.yml, development-deploy.yml

# 🖼️ 작업 결과물

- 수동 배포 기능 사용 가이드 추가
```

### 생성 예시 2: 커밋이 없는 경우 (변경사항 기반)

**변경된 파일:**
```
M .github/workflows/production-deploy.yml
M .github/workflows/development-deploy.yml
M docker-compose.yml
```

**알림 메시지:**
```
ℹ️  알림: 커밋이 없어 현재 변경사항을 기반으로 PR 문서를 생성합니다.
변경된 파일: production-deploy.yml, development-deploy.yml, docker-compose.yml

💡 팁: 커밋 후 다시 실행하면 더 정확한 PR 문서를 생성할 수 있습니다.
```

**생성되는 문서:**
```markdown
# 🎯 PR 제목

ci: GitHub Actions 워크플로우 및 Docker 설정 개선

# 📑 작업 상세 내역

- **CI/CD 개선**
  - production-deploy.yml 워크플로우를 수정합니다
  - development-deploy.yml 워크플로우를 수정합니다
  - docker-compose.yml 설정을 변경합니다

# 🙏 리뷰 요청 사항

- 변경된 워크플로우가 정상적으로 동작하는지 확인해주세요.

# 📃 참고 자료

- 변경된 파일:
  - .github/workflows/production-deploy.yml
  - .github/workflows/development-deploy.yml
  - docker-compose.yml

# 🖼️ 작업 결과물

- CI/CD 파이프라인 개선
```

## Notes

- **자동 생성 항목:**
  - 🎯 PR 제목 (Conventional Commit 타입 기반)
  - 📑 작업 상세 내역 (커밋 이력 기반, 타입별 그룹핑)
  - 🙏 리뷰 요청 사항 (간단한 기본 내용)
  - 📃 참고 자료 (기본 구조만 제공)
  - 🖼️ 작업 결과물 (기본 구조만 제공)

- **사용자 추가 작성 권장:**
  - 리뷰 요청 사항에 더 구체적인 내용 추가
  - 참고 자료에 관련 문서/이슈 링크 추가
  - 작업 결과물에 스크린샷이나 데모 링크 추가

- **프로젝트 규칙 준수:**
  - PULL_REQUEST_TEMPLATE.md 형식 준수
  - Conventional Commits: feat, fix, chore, refactor, docs, style, perf, test, build, ci
  - **중요: PR 제목에서 scope 괄호는 무조건 제거** (예: `feat(ci):` → `feat:`)
  - 커밋 메시지는 한글/영문 혼용 가능
  - PR 제목과 작업 내역은 간결하게 작성

- **중요 원칙:**
  - 체크리스트, 배포 전략, 기술적 세부사항 등 템플릿에 없는 항목은 추가하지 않음
  - 개발자가 직접 작성할 내용(기술적 구현 상세)은 생략
  - 리뷰 요청 사항은 1-3줄로 간단명료하게 작성

- **pr-submit과의 관계:**
  - `pr-create`: PR 문서만 생성 (.md 파일로 저장)
  - `pr-submit`: 생성된 문서를 GitHub에 업로드 (reviewer, label 자동 설정)
  - 두 스킬을 조합하여 유연한 워크플로우 구성 가능
