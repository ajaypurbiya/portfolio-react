# GitHub Repo Upload Plan for Portfolio

## Steps:
- [x] Install GitHub CLI (winget/scoop)
- [x] gh auth login
- [x] git init
- [x] Create .gitignore, README.md, package.json
- [x] git add . && git commit -m \"Initial MERN portfolio commit\"
- [x] gh repo create portfolio --public --remote=origin --source=. --push --public -y
- [x] Verify push: git remote -v, repo URL (Fixed frontend submodule issue)
- [ ] Deploy instructions (Vercel frontend, Render backend)
- [ ] Mark complete

Current status: Push verified and frontend issue fixed. Next: Deploy instructions
