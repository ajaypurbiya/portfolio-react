# GitHub Repo Upload Plan for Portfolio

## Steps:
- [x] Install GitHub CLI (winget/scoop)
- [ ] gh auth login
- [ ] git init
- [x] Create .gitignore, README.md, package.json
- [ ] git add . && git commit -m \"Initial MERN portfolio commit\"
- [ ] gh repo create portfolio --public --remote=origin --source=. --push --public -y
- [ ] Verify push: git remote -v, repo URL
- [ ] Deploy instructions (Vercel frontend, Render backend)
- [ ] Mark complete

Current status: GitHub CLI installed. Next: gh auth login (interactive browser login)
