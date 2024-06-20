# Contribution Guidelines for Frontend Team

## Table of Contents
1. [Branching Procedures](#branching-procedures)
2. [Branch Naming Rules](#branch-naming-rules)
3. [Commit Naming Rules and Frequency](#commit-naming-rules-and-frequency)
4. [Pull Request (PR) Rules and Procedure](#pull-request-pr-rules-and-procedure)
5. [Guidelines to Solve Merge Conflicts](#guidelines-to-solve-merge-conflicts)
6. [Guidelines for Reviews](#guidelines-for-reviews)

---

## Branching Procedures

1. **Create/Take an Issue:**
   - Create or take an issue from the GitHub Project board.

2. **Create a New Branch:**
   - Switch to the `dev-front` branch and pull the recent changes:
     ```bash
     git checkout dev-front
     git pull origin dev-front
     ```
   - Create a new branch from `dev-front`:
     ```bash
     git checkout -b <branch-name>
     ```

3. **Keeping Your Branch Updated:**
   - Regularly pull changes from the `dev-front` branch to keep your branch updated:
     ```bash
     git checkout dev-front
     git pull origin dev-front
     git checkout <your-branch>
     git merge dev-front
     ```

---

## Branch Naming Rules

1. **Feature Branches:**
   - Use the `feature/` prefix for adding, refactoring, or removing a feature.
   - Format: `feature/issue-number/description`
   - Example: `feature/123/add-sidebar-component`

2. **Bug Fix Branches:**
   - Use the `bugfix/` prefix for fixing a bug.
   - Format: `bugfix/issue-number/description`
   - Example: `bugfix/456/fix-sidebar-dragging`

3. **Hotfix Branches:**
   - Use the `hotfix/` prefix for changing code with a temporary solution and/or without following the usual process (usually because of an emergency).
   - Format: `hotfix/issue-number/description`
   - Example: `hotfix/789/fix-deployment-issue`

4. **Test Branches:**
   - Use the `test/` prefix for experimenting outside of an issue/ticket.
   - Format: `test/issue-number/description`
   - Example: `test/101/test-new-ui-library`

For more details on branch naming conventions, you can refer to [this guide](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4).

---

## Commit Naming Rules and Frequency

1. **Commit Message Format:**
   - Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
   - Use the following format for commit messages:
     ```
     <type>[optional scope]: <description>
     ```
   - Types can include: `feat` (feature), `fix` (bug fix), `docs` (documentation), `style` (formatting, missing semi colons, etc.), `refactor` (refactoring code), `test` (adding missing tests), `chore` (updating build tasks, package manager configs, etc.).

   - Examples:
     ```
     feat(sidebar): add sidebar component
     ```

     ```
     fix(sidebar): resolve dragging issue
     ```

     ```
     refactor(layout): improve layout performance
     ```

     ```
     docs(readme): update contribution guidelines
     ```

2. **Frequency:**
   - Commit frequently to ensure that your work is saved and changes are smaller and easier to review.
   - Aim for small, focused commits that do one thing well.

---

## Pull Request (PR) Rules and Procedure

1. **Creating a Pull Request:**
   - Push your branch to the remote repository:
     ```bash
     git push origin <branch-name>
     ```
   - Go to the repository on GitHub and create a new Pull Request from your branch to the `dev-front` branch.
   - Change the base branch from `main` to `dev-front`.

2. **PR Template:**
   - Consult the `PR_template_frontend` file in the frontend folder for the standard pull request template.

### Example PR Template 

```markdown
## One Line Description
Fix the dragging issue and improve button clickability.

## Requirements
- Resolve the slight dragging effect when clicking on an item in the sidebar.
- Fix the dragging issue in the layout when navigating from Home to Calendar and back.
- Ensure the entire button is clickable, not just the link inside it.

## Notes
Responsiveness is not in the scope of this ticket.

## Test Steps
1. Open the application.
2. Navigate to the sidebar and click on various items to ensure there is no dragging effect.
3. Navigate between the Home and Calendar pages and verify that there is no dragging in the layout.
4. Ensure that all buttons are fully clickable.

## UI/UX Outcome
- [Insert relevant screenshots or videos here]

## Checklist
- [ ] Pull Request title includes the issue number and a brief description of the change.
- [ ] All changes should be tested and verified to work correctly.
- [ ] Code follows frontend best practices.
- [ ] Branch names follow the conventions in the contributing file.
- [ ] Commit messages follow the naming conventions in the contributing file.
```

3. **Request Reviews:**
   - Request reviews from all relevant team members or people working on the feature.
   - Before merging ensure that at least one developer runs your code, checks it, and provides feedback.

4. **Merging PRs:**
   - Ensure all checks pass.

5. **Delete Branch:**
   - After merging the PR, delete the branch both locally and remotely:
     ```bash
     git branch -d <branch-name>
     git push origin --delete <branch-name>
     ```

For more details on managing Pull Requests, you can refer to [this guide in GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/best-practices-for-pull-requests).

---

## Guidelines to Solve Merge Conflicts

1. **Identify Conflicts:**
   - When you encounter a merge conflict, Git will highlight the conflicting files.
   - Use the following command to see the status of your conflicts:
     ```bash
     git status
     ```

2. **Resolve Conflicts:**
   - Open the conflicting files and look for the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
   - Manually resolve the conflicts by choosing the correct code or combining both changes as needed.
   - After resolving conflicts, mark the file as resolved:
     ```bash
     git add <conflicted-file>
     ```

3. **Continue the Merge:**
   - Once all conflicts are resolved and added, continue with the merge:
     ```bash
     git commit
     ```

4. **Update Your Branch:**
   - If you solved conflicts on GitHub, pull the changes to ensure everything works as intended:
     ```bash
     git pull origin <branch-name>
     ```

5. **Prevent Future Conflicts:**
   - Regularly pull changes from the `dev-front` branch to keep your branch up to date:
     ```bash
     git pull origin dev-front
     ```

For more details on resolving merge conflicts, you can refer to [this guide in GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts).

---

## Guidelines for Reviews

1. **Code Quality:**
   - Ensure the code follows the team's coding standards and guidelines.
   - Check for proper indentation, naming conventions, and code readability.

2. **Functionality:**
   - Verify that the code works as intended by running it locally.
   - Ensure that all new features or bug fixes are properly tested.

3. **Documentation:**
   - Ensure that the code is well-documented.
   - Check that any new functions or classes have appropriate comments and documentation.

4. **Feedback:**
   - Provide constructive feedback and suggest improvements if needed.
   - Be respectful and considerate in your comments.

5. **Approval:**
   - If the code meets all requirements and standards, approve the pull request.
   - If there are issues, request changes and provide clear instructions on what needs to be fixed.

---

By following these guidelines, our frontend team will ensure a consistent and efficient workflow, maintain a clean and understandable codebase, and facilitate smooth collaboration.