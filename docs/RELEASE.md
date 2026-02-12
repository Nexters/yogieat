# Release Guide

This guide explains how to create releases in the YogiEat project using automated semantic versioning.

## Table of Contents

- [Overview](#overview)
- [How Semantic Release Works](#how-semantic-release-works)
- [Release Workflows](#release-workflows)
- [Version Determination](#version-determination)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Overview

YogiEat uses [semantic-release](https://semantic-release.gitbook.io/) for automated version management. This eliminates manual version updates and ensures consistent release practices.

### What Gets Automated

- ✅ Version number calculation (based on commit history)
- ✅ CHANGELOG.md generation
- ✅ Git tag creation
- ✅ GitHub Release creation
- ✅ package.json version update
- ✅ Discord notifications

### What You Need to Do

- ✅ Write conventional commit messages
- ✅ Follow Git Flow process
- ✅ Push to main or develop branches

## How Semantic Release Works

### Trigger Events

Semantic-release runs automatically when code is pushed to:
- **main branch** → Production releases (v1.2.0)
- **develop branch** → Beta pre-releases (v1.2.0-beta.1)

### Workflow Steps

1. **GitHub Action triggers** on push to main/develop
2. **Analyzes commits** since last release
3. **Determines version bump** based on commit types
4. **Generates CHANGELOG.md** from commit messages
5. **Updates package.json** with new version
6. **Creates Git tag** (e.g., v1.2.0)
7. **Publishes GitHub Release** with notes
8. **Commits changes** with `[skip ci]` flag
9. **Sends Discord notification** on success

### Commit Analysis Rules

The following rules determine version bumps:

| Commit Type | Version Impact | Example |
|-------------|----------------|---------|
| `feat:` | Minor (1.0.0 → 1.1.0) | New features |
| `fix:` | Patch (1.0.0 → 1.0.1) | Bug fixes |
| `perf:` | Patch (1.0.0 → 1.0.1) | Performance improvements |
| `refactor:` | Patch (1.0.0 → 1.0.1) | Code refactoring |
| `build:` | Patch (1.0.0 → 1.0.1) | Build system changes |
| `BREAKING CHANGE:` | Major (1.0.0 → 2.0.0) | Breaking changes |
| `docs:`, `style:`, `test:`, `ci:`, `chore:` | No release | Non-functional changes |

## Release Workflows

### Feature Release (Standard Flow)

**Step 1: Develop features on feature branches**

```bash
# Create feature branch
git flow feature start user-authentication

# Make changes with conventional commits
git commit -m "feat(auth): add login functionality"
git commit -m "feat(auth): add password reset flow"

# Push and create PR
git push origin feature/user-authentication
```

**Step 2: Merge to develop (beta release)**

```bash
# After PR approval
git flow feature finish user-authentication

# Push to develop
git push origin develop

# Semantic-release creates beta pre-release automatically
# Example: v1.1.0-beta.1
```

**Step 3: Create release branch**

```bash
# Create release branch with date-based naming
git flow release start 20260212-1

# Optional: Update documentation
git commit -m "docs: update changelog for release"

# DO NOT manually update package.json version!
```

**Step 4: Finish release (production deployment)**

```bash
# Merge to main and develop
git flow release finish 20260212-1

# Push everything
git push origin main develop --tags

# Semantic-release creates production release automatically
# Example: v1.1.0
```

**Step 5: Verify release**

Check the following:

1. **GitHub Actions**: Visit https://github.com/Nexters/hereeat/actions
   - ✅ "Semantic Release" workflow succeeded
   - ✅ "Production Deploy" workflow triggered after release

2. **GitHub Releases**: Visit https://github.com/Nexters/hereeat/releases
   - ✅ New release created with correct version
   - ✅ Release notes generated from commits
   - ✅ Assets attached (if configured)

3. **Local repository**:
```bash
# Pull the automated commit
git pull origin main

# Verify updated files
cat package.json | grep version
cat CHANGELOG.md
```

4. **Discord**: Check deployment notification channel

### Hotfix Release (Emergency Flow)

**When to use**: Critical bugs in production requiring immediate fix.

**Step 1: Create hotfix branch**

```bash
# Hotfix branches from main
git flow hotfix start fix-payment-error

# Make the fix
git commit -m "fix(payment): resolve transaction timeout error

Add retry logic with exponential backoff for payment processing.
Fixes issue where transactions would fail silently."

# Test thoroughly!
```

**Step 2: Finish hotfix**

```bash
# Merge to main and develop
git flow hotfix finish fix-payment-error

# Push everything
git push origin main develop --tags

# Semantic-release creates patch version automatically
# Example: v1.0.1
```

**Step 3: Verify deployment**

- Check GitHub Actions for successful release and deployment
- Monitor production logs for errors
- Verify fix resolves the issue

### Beta Testing Flow

**Purpose**: Test features in staging environment before production release.

**Step 1: Merge features to develop**

```bash
# Multiple features can be merged to develop
git checkout develop
git merge --no-ff feature/feature-1
git merge --no-ff feature/feature-2
git push origin develop

# Beta pre-release created automatically
# Example: v1.2.0-beta.1
```

**Step 2: Deploy beta to staging**

Beta releases can be deployed to a staging environment for testing.

**Step 3: Additional changes**

```bash
# If bugs found, create feature branch from develop
git flow feature start fix-beta-bug

git commit -m "fix: resolve beta testing issue"
git flow feature finish fix-beta-bug
git push origin develop

# New beta version created
# Example: v1.2.0-beta.2
```

**Step 4: Promote to production**

Once beta testing is complete:

```bash
# Create release branch
git flow release start 20260212-1
git flow release finish 20260212-1
git push origin main develop --tags

# Production release created
# Example: v1.2.0
```

## Version Determination

### Semantic Versioning Format

```
MAJOR.MINOR.PATCH[-PRERELEASE]

Examples:
- v1.0.0        Production release
- v1.1.0-beta.1 Beta pre-release
- v2.0.0        Major breaking change
```

### How Versions Are Calculated

**Scenario 1: Multiple commit types**

Commits since last release:
```
feat: add user profile
fix: resolve logout bug
docs: update API docs
```

Result: **Minor version bump** (feat takes precedence over fix)
- v1.0.0 → v1.1.0

**Scenario 2: Only bug fixes**

Commits since last release:
```
fix: resolve memory leak
fix: correct date formatting
```

Result: **Patch version bump**
- v1.0.0 → v1.0.1

**Scenario 3: Breaking change**

Commits since last release:
```
feat: redesign authentication flow

BREAKING CHANGE: Session tokens are no longer supported.
All clients must migrate to JWT tokens.
```

Result: **Major version bump**
- v1.0.0 → v2.0.0

**Scenario 4: No releasable commits**

Commits since last release:
```
docs: fix typo in README
style: format code with prettier
test: add unit tests for auth
```

Result: **No release created**
- Version remains v1.0.0

### Beta Version Increment

Each push to develop creates a new beta version:

```
First push:  v1.1.0-beta.1
Second push: v1.1.0-beta.2
Third push:  v1.1.0-beta.3
```

When promoted to main, becomes:
```
v1.1.0 (production release)
```

## Troubleshooting

### Issue: Semantic release workflow fails

**Check**: GitHub Actions logs at https://github.com/Nexters/hereeat/actions

**Common causes:**

1. **Invalid commit messages**
   - Error: "No commits found that trigger a release"
   - Solution: Ensure at least one commit follows conventional format

2. **Permission errors**
   - Error: "Resource not accessible by integration"
   - Solution: Verify workflow has `contents: write` permission

3. **Git tag conflicts**
   - Error: "Tag already exists"
   - Solution: Delete conflicting tag and re-run

4. **Network timeouts**
   - Error: "Request timeout"
   - Solution: Re-run workflow (usually transient issue)

### Issue: Wrong version was released

**Example**: Expected v1.1.0 but got v2.0.0

**Cause**: Likely a commit with `BREAKING CHANGE:` in footer

**Solution**: Review commits since last release:
```bash
git log v1.0.0..HEAD --oneline
git show <commit-hash>  # Check for BREAKING CHANGE footer
```

### Issue: No release was created

**Check commits since last release:**
```bash
git log v1.0.0..HEAD --oneline
```

**Possible causes:**

1. **Only non-releasable commits** (docs, style, test, chore)
   - This is expected behavior

2. **No new commits**
   - Semantic-release won't create duplicate releases

3. **Workflow didn't run**
   - Check if commit message contains `[skip ci]`

### Issue: CHANGELOG.md has merge conflicts

**Cause**: Multiple releases in different branches

**Solution:**
```bash
# Keep both versions and merge manually
git checkout --ours CHANGELOG.md    # Or --theirs
git add CHANGELOG.md
git commit -m "chore: resolve CHANGELOG merge conflict"
```

### Issue: Deployment failed after release

**Check**: Production deploy workflow at https://github.com/Nexters/hereeat/actions

**Fallback**: Use manual deployment
```bash
# Trigger workflow_dispatch in GitHub Actions UI
# Or roll back to previous version
```

## Rollback Procedures

### Scenario 1: Buggy release deployed to production

**Step 1: Create hotfix**
```bash
git flow hotfix start revert-buggy-feature

# Revert problematic commits
git revert <commit-hash>

git commit -m "fix: revert buggy feature causing production issues"

git flow hotfix finish revert-buggy-feature
git push origin main develop --tags
```

**Step 2: New patch version created automatically**
- Example: v1.1.1 (fixes v1.1.0)

### Scenario 2: Wrong version number released

**Example**: v2.0.0 was created but should have been v1.1.0

**Step 1: Delete Git tag**
```bash
# Delete locally
git tag -d v2.0.0

# Delete remotely
git push origin :refs/tags/v2.0.0
```

**Step 2: Delete GitHub Release**

1. Go to https://github.com/Nexters/hereeat/releases
2. Find the incorrect release
3. Click "Delete" (requires admin access)

**Step 3: Revert semantic-release commit**
```bash
git checkout main
git revert HEAD  # Revert the "[skip ci]" commit
git push origin main
```

**Step 4: Fix commit messages (if needed)**

If the issue was caused by incorrect commit message:
```bash
# Interactive rebase to fix commit messages
git rebase -i v1.0.0

# Edit the problematic commit message
# Save and push
git push origin main --force  # ⚠️ Use with caution!
```

**Step 5: Re-trigger semantic-release**

Push a new commit to trigger semantic-release again:
```bash
git commit --allow-empty -m "chore: re-trigger semantic-release"
git push origin main
```

### Scenario 3: Emergency rollback to previous version

**Step 1: Find previous version**
```bash
git tag --sort=-v:refname | head -n 5
```

**Step 2: Revert to previous version**
```bash
# Create hotfix to revert
git flow hotfix start rollback-to-v1.0.0

# Revert all commits since v1.0.0
git revert --no-commit v1.0.0..HEAD
git commit -m "fix: emergency rollback to stable version

Revert all changes since v1.0.0 due to critical production issues.
This is a temporary rollback while investigating root cause."

git flow hotfix finish rollback-to-v1.0.0
git push origin main develop --tags
```

**Step 3: Investigate and fix**

After rollback:
1. Investigate the issue in feature branch
2. Fix the problem
3. Test thoroughly
4. Create new release

### Scenario 4: Semantic-release created duplicate releases

**Cause**: Multiple pushes to main in quick succession

**Solution**: Delete duplicate releases
```bash
# Delete duplicate tag
git tag -d v1.1.1
git push origin :refs/tags/v1.1.1

# Delete GitHub Release via UI
```

## Best Practices

### Before Creating Release

- [ ] All features tested on develop (beta)
- [ ] Breaking changes documented
- [ ] Migration guide prepared (if needed)
- [ ] Team notified of upcoming release

### During Release

- [ ] Use conventional commit format
- [ ] Don't manually edit package.json version
- [ ] Verify CI/CD pipelines are green
- [ ] Monitor deployment progress

### After Release

- [ ] Verify GitHub Release created
- [ ] Check CHANGELOG.md accuracy
- [ ] Monitor production logs
- [ ] Notify stakeholders

### Writing Good Commit Messages

**Good examples:**
```bash
feat(auth): add OAuth2 integration with Google

Implement OAuth2 authentication flow using Google Identity Platform.
Users can now sign in with their Google accounts.

Closes #123
```

```bash
fix(api): resolve race condition in token refresh

Add mutex lock to prevent concurrent token refresh requests.
Fixes intermittent 401 errors during high traffic periods.

Fixes #456
```

**Bad examples:**
```bash
# Too vague
git commit -m "fix stuff"

# Missing type
git commit -m "update authentication"

# No description
git commit -m "feat: auth"
```

## Additional Resources

- [Semantic Versioning Specification](https://semver.org/)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Project Contributing Guide](../CONTRIBUTING.md)
- [Developer Cheatsheet](./DEVELOPER_CHEATSHEET.md)
