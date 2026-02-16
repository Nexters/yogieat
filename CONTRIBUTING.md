# Contributing to YogiEat

Thank you for your interest in contributing to YogiEat! This document provides guidelines and workflows for contributing to the project.

## Table of Contents

- [Development Workflow](#development-workflow)
- [Git Flow Process](#git-flow-process)
- [Conventional Commits](#conventional-commits)
- [Git Worktree Workflow](#git-worktree-workflow)
- [Release Process](#release-process)
- [Code Review Guidelines](#code-review-guidelines)

## Development Workflow

YogiEat uses a structured development workflow based on Git Flow with automated semantic versioning.

### Branch Strategy

- **main** - Production-ready code. All releases are tagged here.
- **develop** - Integration branch for features. Beta pre-releases are created here.
- **feature/*** - Feature development branches (branched from develop)
- **release/YYYYMMDD-N** - Release preparation branches
- **hotfix/*** - Emergency fixes for production (branched from main)

### Getting Started

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/Nexters/yogieat.git
cd yogieat
pnpm install
```

2. Ensure Git Flow is initialized:
```bash
git flow init -d
```

3. Create a feature branch:
```bash
git flow feature start <feature-name>
```

## Git Flow Process

### Feature Development

1. **Start a feature**:
```bash
git flow feature start my-awesome-feature
```

2. **Make changes with conventional commits**:
```bash
git add .
git commit -m "feat: add user authentication flow"
```

3. **Push and create PR**:
```bash
git push origin feature/my-awesome-feature
# Create PR targeting develop branch
```

4. **After PR approval, finish feature**:
```bash
git flow feature finish my-awesome-feature
```

### Creating a Release

1. **Start release branch**:
```bash
# Use date-based naming: YYYYMMDD-N (N = release number for that day)
git flow release start 20260212-1
```

2. **Last-minute documentation updates** (optional):
```bash
# DO NOT manually update package.json version
# semantic-release will handle versioning automatically
git commit -m "docs: update release notes"
```

3. **Finish release**:
```bash
git flow release finish 20260212-1
# This merges to both main and develop
```

4. **Push changes**:
```bash
git push origin main develop --tags
```

5. **Semantic-release automatically**:
   - Analyzes commits since last release
   - Determines version bump (major/minor/patch)
   - Updates CHANGELOG.md
   - Creates Git tag
   - Publishes GitHub Release
   - Commits changes with `[skip ci]`

### Hotfix Process

1. **Start hotfix**:
```bash
git flow hotfix start critical-bug-fix
```

2. **Fix the issue**:
```bash
git commit -m "fix: resolve payment processing error"
```

3. **Finish hotfix**:
```bash
git flow hotfix finish critical-bug-fix
```

4. **Push changes**:
```bash
git push origin main develop --tags
```

## Conventional Commits

YogiEat uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning and changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types and Version Impact

**Types that trigger releases:**

- `feat:` - New feature → **Minor version** (1.0.0 → 1.1.0)
- `fix:` - Bug fix → **Patch version** (1.0.0 → 1.0.1)
- `perf:` - Performance improvement → **Patch version**
- `refactor:` - Code refactoring → **Patch version**
- `build:` - Build system changes → **Patch version**

**Types that don't trigger releases:**

- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, whitespace)
- `test:` - Test additions or modifications
- `ci:` - CI/CD configuration changes
- `chore:` - Maintenance tasks

**Breaking changes:**

- Add `BREAKING CHANGE:` in commit footer → **Major version** (1.0.0 → 2.0.0)

### Commit Examples

#### Feature (Minor Version)
```bash
git commit -m "feat(gathering): add calendar date picker

Add interactive calendar component for gathering date selection.
Users can now select date ranges with visual feedback."
```

#### Bug Fix (Patch Version)
```bash
git commit -m "fix(auth): resolve token refresh race condition

Fix race condition where multiple simultaneous requests
triggered duplicate token refresh attempts."
```

#### Breaking Change (Major Version)
```bash
git commit -m "refactor(api)!: migrate to v2 endpoints

Migrate all API calls to v2 endpoints with improved error handling
and standardized response formats.

BREAKING CHANGE: API endpoint URLs changed from /api/v1/* to /api/v2/*.
All clients must update their base URL configuration."
```

#### Documentation (No Release)
```bash
git commit -m "docs: update API integration guide"
```

### Scope Examples

Common scopes in YogiEat:
- `gathering` - Gathering/meeting related features
- `opinion` - Opinion collection features
- `auth` - Authentication/authorization
- `api` - API integration
- `ui` - User interface components
- `deploy` - Deployment configuration
- `ci` - CI/CD workflows

## Git Worktree Workflow

Git worktree allows working on multiple branches simultaneously without stashing or switching branches.

### When to Use Worktrees

**Use worktrees for:**
- ✅ Long-running feature branches requiring parallel work
- ✅ Quick context switching without stashing changes
- ✅ Testing multiple features simultaneously

**Don't use worktrees for:**
- ❌ Short-lived branches (overkill)
- ❌ Simple hotfixes (work in main repo)
- ❌ Quick experiments

### Recommended Directory Structure

```
~/Desktop/Repository/
├── yogieat/                    # Main working tree (for hotfixes, releases)
├── yogieat-worktrees/          # Centralized worktree directory
│   ├── feature-calendar/       # Feature branch worktree
│   ├── feature-notifications/  # Another feature worktree
│   └── release-test/           # Release testing worktree
```

### Worktree Commands

#### Create a worktree for a feature:
```bash
# Start feature in main repo
git flow feature start my-feature

# Create worktree
mkdir -p ~/Desktop/Repository/yogieat-worktrees
git worktree add ../yogieat-worktrees/my-feature feature/my-feature

# Work in worktree
cd ../yogieat-worktrees/my-feature
```

#### List all worktrees:
```bash
git worktree list
```

#### Remove a worktree:
```bash
# After PR is merged
git worktree remove ../yogieat-worktrees/my-feature

# Clean up any stale references
git worktree prune
```

### Worktree Best Practices

1. **Centralize worktrees**: Keep all worktrees in a dedicated directory
2. **Clean up regularly**: Remove worktrees after merging PRs
3. **Use descriptive names**: Match worktree directory name to branch name
4. **Avoid nested worktrees**: Don't create worktrees inside worktrees
5. **Check active worktrees**: Run `git worktree list` before creating new ones

## Release Process

### Automated Versioning

YogiEat uses semantic-release for automatic version management:

1. **Commit analysis**: Examines all commits since last release
2. **Version calculation**: Determines next version based on commit types
3. **Changelog generation**: Creates/updates CHANGELOG.md
4. **Git tagging**: Creates version tag (e.g., v1.2.0)
5. **GitHub Release**: Publishes release with notes
6. **Auto-commit**: Commits changes with `[skip ci]` to prevent loops

### Version Numbering

Following [Semantic Versioning](https://semver.org/):

- **Major (X.0.0)**: Breaking changes
- **Minor (1.X.0)**: New features (backward compatible)
- **Patch (1.0.X)**: Bug fixes (backward compatible)

### Beta Releases

Pushes to `develop` branch create beta pre-releases:
- Format: `v1.2.0-beta.1`
- Tagged as "Pre-release" on GitHub
- Useful for testing before production release

### Release Checklist

Before creating a release:

- [ ] All features merged to develop
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Migration guide prepared (if needed)

## Code Review Guidelines

### For Contributors

1. **Keep PRs focused**: One feature/fix per PR
2. **Write descriptive titles**: Use conventional commit format
3. **Add tests**: Include relevant tests for changes
4. **Update docs**: Document new features or breaking changes
5. **Check CI**: Ensure all checks pass before requesting review

### For Reviewers

1. **Be constructive**: Provide helpful feedback
2. **Check conventions**: Verify conventional commit format
3. **Test locally**: Pull and test changes if needed
4. **Security review**: Watch for security vulnerabilities
5. **Performance impact**: Consider performance implications

## Getting Help

- **Documentation**: Check [README.md](./README.md) and [CLAUDE.md](./CLAUDE.md)
- **Release Guide**: See [docs/RELEASE.md](./docs/RELEASE.md)
- **Developer Cheatsheet**: Quick reference at [docs/DEVELOPER_CHEATSHEET.md](./docs/DEVELOPER_CHEATSHEET.md)
- **Issues**: Open an issue on GitHub for bugs or questions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
