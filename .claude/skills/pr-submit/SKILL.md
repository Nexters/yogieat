---
name: pr-submit
description: Submit PR to GitHub with auto-assigned reviewers and labels. Trigger with "submit pr", "upload pr", "/pr-submit", or "create github pr".
metadata:
    author: Yogieat Team
    version: "1.0.0"
    argument-hint: <optional-base-branch>
---

# PR Submit to GitHub

생성된 PR 문서를 GitHub에 업로드하고, CODEOWNERS 기반 reviewer와 타입별 label을 자동으로 설정합니다.

## How It Works

### 1. PR 문서 존재 확인

```bash
# 현재 브랜치명 가져오기
BRANCH=$(git branch --show-current)

# PR 문서 파일 경로
PR_DOC=".claude/pr-drafts/${BRANCH}.md"

# 파일 존재 여부 확인
if [ ! -f "$PR_DOC" ]; then
  echo "❌ PR 문서가 없습니다. 먼저 /pr-create를 실행하세요."
  exit 1
fi
```

### 2. PR 제목 추출 및 타입 분석

```bash
# PR 문서에서 제목 추출
PR_TITLE=$(grep -A 1 "# 🎯 PR 제목" "$PR_DOC" | tail -1)

# Conventional Commit 타입 추출
if [[ "$PR_TITLE" =~ ^(feat|fix|docs|style|refactor|perf|test|chore|ci|build): ]]; then
  TYPE="${BASH_REMATCH[1]}"
else
  echo "⚠️  경고: Conventional Commit 형식이 아닙니다."
  TYPE="unknown"
fi
```

### 3. Label 자동 결정

**타입별 Label 매핑** (`.github/workflows/pr-auto-labeler.yml` 기반):

| Commit Type        | Label         |
| ------------------ | ------------- |
| `feat`             | `✨ Feature`  |
| `fix`              | `🐞 Fix`      |
| `docs`             | `📃 Docs`     |
| `style`            | `🧑‍🎨 Style`    |
| `refactor`, `perf` | `🔨 Refactor` |
| `chore`, `test`    | `⚙ Setting`   |
| `ci`, `build`      | `🌏 Deploy`   |

### 4. Reviewer 자동 추출 (현재 사용자 제외)

```bash
# 현재 GitHub 사용자 확인
CURRENT_USER=$(gh api user --jq .login)

# .github/CODEOWNERS 파일에서 reviewer 추출
ALL_REVIEWERS=$(cat .github/CODEOWNERS | grep -v '^#' | grep -v '^$' | sed 's/@//g' | tr '\n' ',')

# 현재 사용자를 reviewer 목록에서 제거
REVIEWERS=$(echo "$ALL_REVIEWERS" | tr ',' '\n' | grep -v "^${CURRENT_USER}$" | tr '\n' ',' | sed 's/,$//')

# 예: CODEOWNERS에 "RookieAND,youngminss"가 있고 현재 사용자가 RookieAND면
# 결과: "youngminss"
```

### 5. 브랜치 Push 확인

```bash
# 브랜치가 remote에 있는지 확인
if ! git rev-parse --verify "origin/${BRANCH}" >/dev/null 2>&1; then
  echo "⚠️  브랜치가 remote에 없습니다. Push 중..."
  git push -u origin "$BRANCH"
fi
```

### 6. PR 생성

```bash
gh pr create \
  --base <base-branch> \
  --assignee @me \
  --reviewer "$REVIEWERS" \
  --label "$LABEL" \
  --title "$PR_TITLE" \
  --body-file "$PR_DOC"
```

### 7. 정리 작업

```bash
# PR 생성 성공 시 임시 문서 파일 삭제
if [ $? -eq 0 ]; then
  rm "$PR_DOC"
  echo "✅ PR 문서 파일이 정리되었습니다."
fi
```

## Error Handling

### PR 문서가 없는 경우

```
❌ 오류: PR 문서를 찾을 수 없습니다.

현재 브랜치: {branch}
찾는 파일: .claude/pr-drafts/{branch}.md

다음 명령어로 PR 문서를 먼저 생성하세요:
/pr-create
```

**자동 대응:**

1. PR 문서가 없으면 자동으로 `/pr-create` 실행
2. 문서 생성 완료 후 다시 PR submit 진행

### 브랜치가 remote에 없는 경우

```
⚠️  경고: 브랜치가 remote에 없습니다.

자동으로 push를 시도합니다...
git push -u origin {branch}
```

### GitHub CLI 인증 실패

```
❌ 오류: GitHub CLI 인증이 필요합니다.

다음 명령어로 인증하세요:
gh auth login
```

### Label이 존재하지 않는 경우

```
⚠️  경고: Label '{label}'이 저장소에 없습니다.

Label 없이 PR을 생성합니다.
나중에 GitHub 웹에서 수동으로 추가할 수 있습니다.
```

## Execution Steps

스킬이 실행되면 다음 순서로 진행하세요:

1. **브랜치 확인**
    - `git branch --show-current`로 현재 브랜치 확인
    - 인자로 베이스 브랜치가 주어졌으면 사용, 없으면 main 사용

2. **PR 문서 존재 확인**
    - `.claude/pr-drafts/{branch}.md` 파일 존재 여부 확인
    - 없으면 자동으로 `/pr-create` 실행
    - 생성 후 다음 단계 진행

3. **PR 제목 및 타입 추출**
    - PR 문서에서 제목 라인 추출 (grep "# 🎯 PR 제목" 다음 줄)
    - Conventional Commit 패턴 매칭으로 타입 추출

4. **Label 자동 결정**
    - 추출한 타입을 Label 매핑 테이블과 매칭
    - 해당하는 label 선택

5. **Reviewer 추출 (현재 사용자 제외)**
    - `gh api user --jq .login`으로 현재 GitHub 사용자 확인
    - `.github/CODEOWNERS` 파일 읽기
    - `@` 제거하고 목록 생성
    - 현재 사용자를 목록에서 제거 (자신에게 리뷰 요청하지 않음)
    - 쉼표로 연결된 최종 reviewer 목록 생성

6. **브랜치 Push 확인**
    - `git rev-parse --verify origin/{branch}` 실행
    - 없으면 `git push -u origin {branch}` 실행
    - 권한 오류 시 사용자에게 수동 push 안내

7. **PR 생성**
    - `gh pr create` 명령어 실행
    - 모든 파라미터 자동 설정

8. **정리 및 출력**
    - 성공 시 `.claude/pr-drafts/{branch}.md` 삭제
    - PR URL 출력

9. **결과 메시지**

    ```
    ✅ PR이 생성되었습니다!

    🔗 PR URL: https://github.com/{owner}/{repo}/pull/{number}
    📝 제목: {title}
    👤 Assignee: @me
    👥 Reviewers: {reviewers}
    🏷️  Label: {label}

    📄 PR 문서 파일이 정리되었습니다.
    ```

## Usage Examples

### 기본 사용

```
/pr-submit
```

main 브랜치를 베이스로 PR 생성

### 특정 베이스 브랜치 지정

```
/pr-submit develop
```

develop 브랜치를 베이스로 PR 생성

### 대화형 실행

```
User: "PR 올려줘"
User: "GitHub에 PR 생성해줘"
User: "pull request 제출해줘"
```

### 실행 흐름 예시

**시나리오 1: PR 문서가 이미 있는 경우**

```bash
$ /pr-submit

✅ PR 문서를 찾았습니다: .claude/pr-drafts/hotfix-prod-ci-health-check.md
📝 PR 제목: fix: CI/CD health check 타이밍 개선 및 수동 배포 기능 추가
🏷️  자동 Label: 🐞 Fix
👤 현재 사용자: RookieAND
👥 자동 Reviewers: youngminss (현재 사용자 제외됨)

⚠️  브랜치가 remote에 없습니다. Push 중...
To github.com:Nexters/hereeat.git
 * [new branch]      hotfix/prod-ci-health-check -> hotfix/prod-ci-health-check

🚀 PR 생성 중...

✅ PR이 생성되었습니다!

🔗 PR URL: https://github.com/Nexters/hereeat/pull/82
📝 제목: fix: CI/CD health check 타이밍 개선 및 수동 배포 기능 추가
👤 Assignee: RookieAND
👥 Reviewers: youngminss (현재 사용자 제외)
🏷️  Label: 🐞 Fix

📄 PR 문서 파일이 정리되었습니다.
```

**시나리오 2: PR 문서가 없는 경우**

```bash
$ /pr-submit

❌ PR 문서를 찾을 수 없습니다.

현재 브랜치: feature/new-component
찾는 파일: .claude/pr-drafts/feature-new-component.md

📝 PR 문서를 먼저 생성합니다...

[pr-create 스킬 자동 실행]
✅ PR 문서가 생성되었습니다!
📄 파일 경로: .claude/pr-drafts/feature-new-component.md

🚀 이제 PR을 생성합니다...

✅ PR이 생성되었습니다!
🔗 PR URL: https://github.com/Nexters/hereeat/pull/83
```

## Label Mapping

| Commit Type | Label         | 설명             |
| ----------- | ------------- | ---------------- |
| `feat`      | `✨ Feature`  | 새로운 기능 추가 |
| `fix`       | `🐞 Fix`      | 버그 수정        |
| `docs`      | `📃 Docs`     | 문서 작업        |
| `style`     | `🧑‍🎨 Style`    | 코드 스타일 변경 |
| `refactor`  | `🔨 Refactor` | 리팩토링         |
| `perf`      | `🔨 Refactor` | 성능 개선        |
| `test`      | `⚙ Setting`   | 테스트 추가/수정 |
| `chore`     | `⚙ Setting`   | 빌드/설정 변경   |
| `ci`        | `🌏 Deploy`   | CI/CD 변경       |
| `build`     | `🌏 Deploy`   | 빌드 시스템 변경 |

## Notes

- **자동 설정 항목:**
    - 👤 Assignee: @me (현재 GitHub CLI 인증 사용자)
    - 👥 Reviewers: CODEOWNERS 파일 기반 자동 추출 (현재 사용자는 자동 제외)
    - 🏷️ Label: PR 제목의 Conventional Commit 타입 기반 자동 선택
        - PR 제목은 `pr-create`에서 생성 시 scope가 제거됨 (예: `feat(ci):` → `feat:`)
    - 📝 Base branch: 인자로 지정 또는 main 기본값

- **PR 문서 자동 생성:**
    - PR 문서가 없으면 자동으로 `/pr-create` 실행
    - 사용자 개입 없이 문서 생성 → PR 업로드 자동 진행

- **정리 작업:**
    - PR 생성 성공 시 `.claude/pr-drafts/{branch}.md` 자동 삭제
    - 실패 시 문서 파일 유지 (재시도 가능)

- **권한 처리:**
    - `git push` 권한 오류 시 사용자에게 수동 push 안내
    - `gh pr create` 권한 오류 시 인증 방법 안내

- **의존성:**
    - `git` 명령어 필수
    - `gh` (GitHub CLI) 필수
    - `.github/CODEOWNERS` 파일 권장
    - `.github/workflows/pr-auto-labeler.yml` 참고용

- **pr-create와의 관계:**
    - `pr-create`: PR 문서만 생성 (.md 파일)
    - `pr-submit`: PR 문서를 GitHub에 업로드 (없으면 자동 생성)
    - 두 스킬을 조합하여 유연한 워크플로우 구성 가능

## Workflow Patterns

### 패턴 1: 분리 실행 (검토 후 업로드)

```bash
# 1단계: PR 문서 생성
/pr-create

# 2단계: 문서 검토 및 수정
# .claude/pr-drafts/{branch}.md 파일 열어서 내용 확인/수정

# 3단계: GitHub에 업로드
/pr-submit
```

### 패턴 2: 원스텝 실행 (자동화)

```bash
# PR 문서 없으면 자동 생성 → 바로 업로드
/pr-submit
```

### 패턴 3: 베이스 브랜치 지정

```bash
# develop 브랜치를 베이스로 PR 생성
/pr-create develop
/pr-submit develop
```
