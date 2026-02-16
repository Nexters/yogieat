# YogiEat (요기잇)

YogiEat은 다인원 모임에서 함께 먹을 맛집을 추천해주는 서비스입니다.

## Features

- 모임 생성 및 참여자 초대
- 맛집 의견 수집 및 투표
- AI 기반 맞춤 맛집 추천
- 실시간 협업 및 공유

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack React Query 5
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Ky
- **Container**: Docker
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 24.x
- pnpm 9.x
- Docker (optional, for local deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/Nexters/yogieat.git
cd yogieat

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript type checking
```

## Versioning

YogiEat follows [Semantic Versioning](https://semver.org/) with automated release management:

- **Automated Versioning**: Version numbers are automatically determined based on commit messages
- **CHANGELOG Generation**: Release notes are automatically generated from commit history
- **GitHub Releases**: Releases are automatically published on GitHub

### Current Version

![GitHub release (latest by date)](https://img.shields.io/github/v/release/Nexters/yogieat)

See all releases at [GitHub Releases](https://github.com/Nexters/yogieat/releases)

### Version Format

- **Major (X.0.0)**: Breaking changes
- **Minor (1.X.0)**: New features (backward compatible)
- **Patch (1.0.X)**: Bug fixes (backward compatible)
- **Beta (1.0.0-beta.X)**: Pre-release versions on develop branch

## Contributing

We welcome contributions! Please follow our guidelines:

1. Read the [Contributing Guide](./CONTRIBUTING.md)
2. Follow [Conventional Commits](https://www.conventionalcommits.org/) format
3. Use Git Flow for branch management
4. Write tests for new features
5. Update documentation as needed

### Quick Start for Contributors

```bash
# Start a new feature
git flow feature start my-feature

# Make changes with conventional commits
git commit -m "feat(scope): add new feature"

# Push and create PR
git push origin feature/my-feature
```

For more details, see:
- [Contributing Guide](./CONTRIBUTING.md) - Development workflow and guidelines
- [Release Guide](./docs/RELEASE.md) - Release process and versioning
- [Developer Cheatsheet](./docs/DEVELOPER_CHEATSHEET.md) - Quick reference for common tasks

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Project architecture and coding conventions
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [docs/RELEASE.md](./docs/RELEASE.md) - Release process documentation
- [docs/DEVELOPER_CHEATSHEET.md](./docs/DEVELOPER_CHEATSHEET.md) - Developer quick reference

## Deployment

YogiEat uses automated deployment via GitHub Actions:

- **Production**: Deployed on push to `main` branch
- **Staging**: Deployed on push to `develop` branch
- **Zero-downtime**: Rolling deployment with health checks

### Manual Deployment

Trigger manual deployment via GitHub Actions `workflow_dispatch`.

## Project Structure

```
yogieat/
├── app/                    # Next.js App Router pages
├── src/
│   ├── apis/               # API layer (queries, mutations)
│   ├── components/         # Reusable components
│   ├── pageComponents/     # Page-level components
│   ├── hooks/              # Custom React hooks
│   ├── schemas/            # Zod validation schemas
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles and tokens
├── public/                 # Static assets
├── docker/                 # Docker configurations
└── .github/workflows/      # CI/CD workflows
```

## Environment Variables

Required environment variables:

```bash
NEXT_PUBLIC_API_URL=https://dev-api.yogieat.com
NEXT_PUBLIC_AWS_S3=https://yogieat-statics.s3.ap-southeast-2.amazonaws.com
NEXT_PUBLIC_GTM_ID=GTM-M3SWGCR8
```

## License

This project is private and proprietary.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## Support

For questions or issues:

1. Check existing [GitHub Issues](https://github.com/Nexters/hereeat/issues)
2. Create a new issue with detailed description
3. Contact the development team

---

Built with ❤️ by the Nexters team
