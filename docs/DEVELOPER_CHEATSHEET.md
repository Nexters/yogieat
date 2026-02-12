# Developer Cheatsheet

Quick reference guide for common development tasks in YogiEat.

## Table of Contents

- [Git Flow Commands](#git-flow-commands)
- [Conventional Commits](#conventional-commits)
- [Git Worktree Commands](#git-worktree-commands)
- [Release Workflow](#release-workflow)
- [Common Tasks](#common-tasks)
- [Useful Commands](#useful-commands)

## Git Flow Commands

### Feature Development

```bash
# Start new feature
git flow feature start <feature-name>

# Publish feature (push to remote)
git flow feature publish <feature-name>

# Pull latest changes
git flow feature pull origin <feature-name>

# Finish feature (merge to develop)
git flow feature finish <feature-name>

# Delete feature branch
git flow feature delete <feature-name>
```

### Release Management

```bash
# Start release (use date: YYYYMMDD-N)
git flow release start 20260212-1

# Publish release
git flow release publish 20260212-1

# Finish release (merge to main and develop)
git flow release finish 20260212-1

# Delete release branch
git flow release delete 20260212-1
```

### Hotfix Management

```bash
# Start hotfix
git flow hotfix start <hotfix-name>

# Publish hotfix
git flow hotfix publish <hotfix-name>

# Finish hotfix (merge to main and develop)
git flow hotfix finish <hotfix-name>

# Delete hotfix branch
git flow hotfix delete <hotfix-name>
```

## Conventional Commits

### Basic Format

```bash
<type>(<scope>): <subject>
```

### Commit Types

| Type | Version Bump | Usage |
|------|--------------|-------|
| `feat` | Minor (1.0.0 → 1.1.0) | New features |
| `fix` | Patch (1.0.0 → 1.0.1) | Bug fixes |
| `perf` | Patch | Performance improvements |
| `refactor` | Patch | Code refactoring |
| `build` | Patch | Build system changes |
| `docs` | None | Documentation only |
| `style` | None | Code style (formatting) |
| `test` | None | Test additions |
| `ci` | None | CI/CD changes |
| `chore` | None | Maintenance tasks |

### Breaking Changes

```bash
# Option 1: Use ! after type/scope
git commit -m "feat(api)!: change authentication method"

# Option 2: Add BREAKING CHANGE in footer
git commit -m "feat(api): change authentication method

BREAKING CHANGE: Old API keys are no longer valid.
Users must generate new keys from dashboard."
```

### Examples

```bash
# Feature (minor bump)
git commit -m "feat(gathering): add calendar date picker"

# Bug fix (patch bump)
git commit -m "fix(auth): resolve token refresh error"

# Performance (patch bump)
git commit -m "perf(api): optimize database queries"

# Documentation (no release)
git commit -m "docs: update API integration guide"

# Breaking change (major bump)
git commit -m "refactor(api)!: migrate to REST v2

BREAKING CHANGE: API endpoints changed from /v1/* to /v2/*"
```

### Common Scopes

- `gathering` - Meeting/gathering features
- `opinion` - Opinion collection
- `auth` - Authentication
- `api` - API integration
- `ui` - User interface
- `deploy` - Deployment
- `ci` - CI/CD

## Git Worktree Commands

### Create Worktree

```bash
# For existing branch
git worktree add <path> <branch-name>

# Example
git worktree add ../yogieat-worktrees/my-feature feature/my-feature
```

### List Worktrees

```bash
git worktree list

# Example output:
# /Users/goorm/Desktop/Repository/yogieat         d8ae809 [hotfix/prod-ci-health-check]
# /Users/goorm/Desktop/Repository/yogieat-calendar 123abc4 [feature/calendar]
```

### Remove Worktree

```bash
# Remove worktree
git worktree remove <path>

# Force remove (even with uncommitted changes)
git worktree remove --force <path>

# Example
git worktree remove ../yogieat-worktrees/my-feature
```

### Clean Up Stale Worktrees

```bash
# Clean up deleted worktrees
git worktree prune

# Dry run (show what would be deleted)
git worktree prune --dry-run
```

## Release Workflow

### Feature → Beta Release

```bash
# 1. Create and finish feature
git flow feature start my-feature
git commit -m "feat: add new feature"
git flow feature finish my-feature

# 2. Push to develop (triggers beta release)
git push origin develop

# Result: v1.1.0-beta.1 created automatically
```

### Beta → Production Release

```bash
# 1. Create release branch
git flow release start 20260212-1

# 2. Optional: update docs
git commit -m "docs: update release notes"

# 3. Finish release
git flow release finish 20260212-1

# 4. Push to main (triggers production release)
git push origin main develop --tags

# Result: v1.1.0 created automatically
```

### Emergency Hotfix

```bash
# 1. Create hotfix
git flow hotfix start fix-critical-bug

# 2. Fix and commit
git commit -m "fix: resolve critical production issue"

# 3. Finish hotfix
git flow hotfix finish fix-critical-bug

# 4. Push to main (triggers patch release)
git push origin main develop --tags

# Result: v1.0.1 created automatically
```

## Common Tasks

### Start Working on New Feature

```bash
# Option 1: Standard workflow
git flow feature start my-feature
# Work in main repo

# Option 2: With worktree
git flow feature start my-feature
git worktree add ../yogieat-worktrees/my-feature feature/my-feature
cd ../yogieat-worktrees/my-feature
# Work in worktree
```

### Make Changes and Commit

```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "feat(scope): description"

# Push to remote
git push origin feature/my-feature
```

### Create Pull Request

```bash
# Push feature branch
git push origin feature/my-feature

# Create PR via GitHub UI targeting 'develop' branch
# Or use GitHub CLI:
gh pr create --base develop --title "feat: my feature" --body "Description"
```

### Merge Feature to Develop

```bash
# After PR approval
git checkout develop
git pull origin develop

# Finish feature (merges with --no-ff)
git flow feature finish my-feature

# Push develop
git push origin develop
```

### Check Release Status

```bash
# View recent releases
gh release list

# View specific release
gh release view v1.0.0

# View commits since last release
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# View semantic-release workflow status
gh run list --workflow=semantic-release.yml
```

### Update Local Repository

```bash
# Fetch all branches and tags
git fetch --all --tags --prune

# Pull latest main
git checkout main
git pull origin main

# Pull latest develop
git checkout develop
git pull origin develop
```

## Useful Commands

### Git Information

```bash
# Current branch
git branch --show-current

# Recent commits
git log --oneline -10

# Show changed files
git diff --name-only

# Show commit details
git show <commit-hash>

# Search commits
git log --grep="feat"
git log --author="username"
```

### Tag Management

```bash
# List all tags
git tag

# List tags with pattern
git tag -l "v1.*"

# Show tag details
git show v1.0.0

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin :refs/tags/v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"
```

### Branch Management

```bash
# List all branches
git branch -a

# List remote branches
git branch -r

# Delete local branch
git branch -d feature/my-feature

# Force delete local branch
git branch -D feature/my-feature

# Delete remote branch
git push origin --delete feature/my-feature

# Rename current branch
git branch -m new-name
```

### Stash Management

```bash
# Save current changes
git stash save "work in progress"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Pop latest stash (apply and delete)
git stash pop

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### GitHub CLI (gh)

```bash
# View PRs
gh pr list

# View PR details
gh pr view 123

# Checkout PR locally
gh pr checkout 123

# View releases
gh release list

# View release details
gh release view v1.0.0

# View workflow runs
gh run list

# View workflow run details
gh run view <run-id>
```

### Development Server

```bash
# Start development server
pnpm dev

# Build production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Docker Commands

```bash
# Build local image
docker compose -f docker-compose.local.yml build

# Start local container
docker compose -f docker-compose.local.yml up

# Stop and remove containers
docker compose -f docker-compose.local.yml down

# View logs
docker compose logs -f client

# Execute command in container
docker compose exec client sh
```

### Troubleshooting

```bash
# Reset to remote state
git fetch origin
git reset --hard origin/main

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Clean untracked files (dry run)
git clean -n

# Clean untracked files
git clean -fd

# Fix "detached HEAD" state
git checkout main

# Resolve merge conflicts
git status
# Edit conflicted files
git add <resolved-files>
git commit
```

## Quick Reference

### Typical Feature Workflow

```bash
# 1. Start feature
git flow feature start user-profile

# 2. Make changes
git commit -m "feat(profile): add user avatar upload"

# 3. Push and create PR
git push origin feature/user-profile
gh pr create --base develop

# 4. After approval, merge
git flow feature finish user-profile
git push origin develop

# 5. Beta release created automatically
```

### Typical Release Workflow

```bash
# 1. Create release
git flow release start 20260212-1

# 2. Finish release
git flow release finish 20260212-1

# 3. Push to trigger production release
git push origin main develop --tags

# 4. Production release created automatically
```

### Emergency Hotfix Workflow

```bash
# 1. Create hotfix
git flow hotfix start payment-fix

# 2. Fix issue
git commit -m "fix(payment): resolve timeout error"

# 3. Finish hotfix
git flow hotfix finish payment-fix

# 4. Push to trigger patch release
git push origin main develop --tags

# 5. Patch release created automatically
```

## Environment Variables

```bash
# View public env vars
cat .env.production

# Required env vars:
# NEXT_PUBLIC_API_URL=https://dev-api.yogieat.com
# NEXT_PUBLIC_AWS_S3=https://yogieat-statics.s3.ap-southeast-2.amazonaws.com
# NEXT_PUBLIC_GTM_ID=GTM-M3SWGCR8
```

## Additional Resources

- **Full Contributing Guide**: [CONTRIBUTING.md](../CONTRIBUTING.md)
- **Release Process**: [docs/RELEASE.md](./RELEASE.md)
- **Project README**: [README.md](../README.md)
- **Codebase Guide**: [CLAUDE.md](../CLAUDE.md)

## Keyboard Shortcuts (VSCode)

```
Ctrl+` - Toggle terminal
Ctrl+Shift+P - Command palette
Ctrl+P - Quick file open
Ctrl+Shift+F - Search in files
Ctrl+/ - Toggle comment
Ctrl+Shift+K - Delete line
Alt+↑/↓ - Move line up/down
Ctrl+D - Select next occurrence
```

## Tips

- ✅ Always pull before starting new work
- ✅ Write descriptive commit messages
- ✅ Test locally before pushing
- ✅ Keep PRs small and focused
- ✅ Review your own code before requesting review
- ✅ Use worktrees for parallel feature development
- ✅ Clean up worktrees after merging PRs
- ✅ Don't manually edit package.json version
- ✅ Let semantic-release handle versioning
- ❌ Don't force push to main or develop
- ❌ Don't commit directly to main or develop
- ❌ Don't use `git add -A` (stage specific files)
- ❌ Don't skip CI checks
