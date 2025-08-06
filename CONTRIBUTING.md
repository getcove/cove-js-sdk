# Contributing to Cove JS SDK

## Pull Request Guidelines

When creating a pull request, please ensure:

### PR Description
- Provide a clear description of the changes
- Link any related issues using `#issue-number`
- Mark the type of change:
  - Bug fix (non-breaking change which fixes an issue)
  - New feature (non-breaking change which adds functionality)
  - Breaking change (fix or feature that would cause existing functionality to not work as expected)
  - Documentation update

### PR Checklist
- [ ] Added a changeset (run `pnpm changeset` if this PR contains user-facing changes)
- [ ] Updated documentation (if applicable)
- [ ] Added/updated tests
- [ ] All tests pass (`pnpm test`)
- [ ] Code follows style guidelines (`pnpm lint`)
- [ ] Self-reviewed the code

## Development Workflow

We use a Git flow with two main branches:
- `develop`: Integration branch for new features and fixes
- `main`: Production-ready releases only

### Making Changes

1. **Create a feature branch from develop:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes and test:**
   ```bash
   pnpm dev        # Start development mode
   pnpm test       # Run tests
   pnpm check      # Run type checking and linting
   ```

3. **Add a changeset:**
   ```bash
   pnpm changeset
   ```
   - Select the packages you've changed
   - Choose the version bump type (major/minor/patch)
   - Write a meaningful description for the changelog

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `chore:` Maintenance tasks
   - `refactor:` Code refactoring
   - `test:` Test updates

5. **Push and create a PR:**
   ```bash
   git push origin feat/your-feature-name
   ```
   Then open a PR from your branch to `develop`.

### Release Process

Releases are automated when changes are merged from `develop` to `main`:

1. Create a PR from `develop` to `main`
2. Review all accumulated changes
3. Merge the PR
4. GitHub Actions will automatically:
   - Version packages based on changesets
   - Update CHANGELOGs
   - Publish to npm
   - Create git tags

### Commands

```bash
# Development
pnpm dev          # Start dev mode for all packages
pnpm build        # Build all packages
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode

# Code Quality
pnpm lint         # Check code style
pnpm lint:fix     # Fix code style issues
pnpm typecheck    # Check TypeScript types
pnpm check        # Run all checks
pnpm check:fix    # Fix all auto-fixable issues

# Changesets
pnpm changeset    # Add a changeset
pnpm version      # Version packages (CI only)
pnpm release      # Build and publish (CI only)

# Maintenance
pnpm clean        # Clean build artifacts
pnpm audit        # Check for vulnerabilities
```