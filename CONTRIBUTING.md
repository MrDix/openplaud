# Contributing to OpenPlaud

Thank you for your interest in contributing to OpenPlaud! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

- **Bug Reports**: Report bugs via [GitHub Issues](https://github.com/openplaud/openplaud/issues)
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests for bug fixes or features
- **Documentation**: Improve documentation, examples, or guides
- **Testing**: Help test new features and report issues
- **Design**: Improve UI/UX, create mockups or design assets

## 📋 Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Search pull requests** to see if someone is already working on it
3. **Open an issue first** for major changes to discuss the approach
4. **Read our [Code of Conduct](CODE_OF_CONDUCT.md)**

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (we use pnpm as package manager)
- PostgreSQL 16+
- Docker & Docker Compose (for testing)
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/openplaud/openplaud.git
   cd openplaud
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add required values:
   ```env
   # Generate secrets
   BETTER_AUTH_SECRET=$(openssl rand -hex 32)
   ENCRYPTION_KEY=$(openssl rand -hex 32)

   # Database
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/openplaud

   # App
   APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb openplaud

   # Run migrations
   pnpm db:migrate
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Access the app**
   - Open http://localhost:3000
   - Create an account
   - Start developing!

## 🏗️ Project Structure

```
openplaud/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (app)/        # Authenticated pages
│   │   ├── (auth)/       # Auth pages (login, register)
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # Base UI components (shadcn)
│   │   ├── settings-sections/  # Settings panels
│   │   └── ...
│   ├── db/               # Database (Drizzle ORM)
│   │   ├── schema.ts     # Database schema
│   │   └── migrations/   # SQL migrations
│   ├── lib/              # Utility libraries
│   │   ├── plaud/        # Plaud API client
│   │   ├── storage/      # Storage providers (local, S3)
│   │   ├── transcription/  # AI transcription
│   │   └── ...
│   ├── hooks/            # React hooks
│   ├── types/            # TypeScript types
│   └── tests/            # Test files
├── docs/                 # Documentation
├── public/               # Static assets
└── ...config files
```

## 💻 Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `feature/your-feature` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic changes)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(transcription): add support for Groq API
fix(sync): prevent duplicate device records
docs(readme): update deployment instructions
refactor(storage): simplify S3 configuration
```

### Code Style

We use **Biome** for linting and formatting:

```bash
# Check for issues
pnpm format-and-lint

# Auto-fix issues
pnpm format-and-lint:fix
```

**Code Guidelines:**
- Use TypeScript for all new code
- Prefer functional components and hooks
- Follow existing patterns in the codebase
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Avoid `any` types - use proper typing

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type check
pnpm type-check
```

**Testing Guidelines:**
- Write tests for new features
- Update tests for changed functionality
- Aim for meaningful test coverage
- Test edge cases and error conditions
- Mock external dependencies (Plaud API, OpenAI, etc.)

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Follow the code style guidelines
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   pnpm format-and-lint:fix
   pnpm type-check
   pnpm test
   pnpm build  # Ensure it builds
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

6. **Create a Pull Request**
   - Go to the [OpenPlaud repository](https://github.com/openplaud/openplaud)
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Link related issues

### PR Requirements

- [ ] Code follows the style guidelines
- [ ] Tests pass (`pnpm test`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Linting passes (`pnpm format-and-lint`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventional commits
- [ ] PR description is clear and detailed

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to reproduce**: Detailed steps to reproduce the issue
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**:
   - OS (macOS, Linux, Windows)
   - Node version
   - Browser (if UI issue)
   - Docker version (if deployment issue)
6. **Screenshots**: If applicable
7. **Logs**: Relevant error messages or logs

## ✨ Feature Requests

When suggesting features:

1. **Use case**: Describe the problem or use case
2. **Proposed solution**: Your suggested implementation
3. **Alternatives**: Other solutions you've considered
4. **Additional context**: Mockups, examples, or references

## 📚 Documentation

Documentation improvements are always welcome:

- README updates
- API documentation
- Code examples
- Deployment guides
- Troubleshooting guides
- Video tutorials

## 🔒 Security

**Do not report security vulnerabilities via public issues!**

Please report security vulnerabilities to: **security@openplaud.com**

See [SECURITY.md](SECURITY.md) for details.

## 🎨 Design Contributions

We welcome design contributions:

- UI/UX improvements
- Component designs
- Icons and assets
- Dark/light theme enhancements
- Accessibility improvements

## 📦 Adding Dependencies

When adding new dependencies:

1. **Justify the need**: Explain why the dependency is needed
2. **Check bundle size**: Ensure it doesn't significantly increase bundle size
3. **Verify license**: Ensure license is compatible (MIT, Apache, etc.)
4. **Consider alternatives**: Use existing dependencies when possible

## 🔄 Database Migrations

When modifying the database schema:

1. **Update schema.ts**
   ```typescript
   // src/db/schema.ts
   export const yourNewTable = pgTable("your_table", { ... });
   ```

2. **Generate migration**
   ```bash
   pnpm db:generate
   ```

3. **Test migration**
   ```bash
   pnpm db:migrate
   ```

4. **Include migration in PR**: Commit the generated SQL file

## 🧪 Integration Testing

For Plaud API integration tests:

```bash
# Set your bearer token
export PLAUD_BEARER_TOKEN="Bearer your-token-here"

# Run integration tests
bun test src/tests/plaud.integration.test.ts
```

**Note**: Integration tests are skipped in CI to avoid leaking credentials.

## 💬 Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Pull Requests**: Code review and collaboration

## 📄 License

By contributing to OpenPlaud, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## ❓ Questions?

If you have questions:

1. Check existing issues and discussions
2. Read the documentation in `/docs`
3. Open a GitHub Discussion
4. Ask in your pull request

Thank you for contributing to OpenPlaud! 🎉
