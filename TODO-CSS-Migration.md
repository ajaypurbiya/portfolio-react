# Tailwind to Pure CSS Migration TODO

## Steps to Complete:

1. [x] Remove Tailwind config files (tailwind.config.js, postcss.config.js)
2. [x] Update frontend/src/index.css - Replace Tailwind directives with global CSS (resets, vars)
3. [x] Update frontend/package.json - Remove Tailwind/PostCSS deps
4. [x] Execute `cd frontend && npm install` to clean deps
5. [x] Create global styles in index.css / App.css
6. [x] Convert Hero.jsx → Hero.css + update import/classes
7. [ ] Convert Navbar.jsx → Navbar.css + update
8. [ ] Convert ProjectCard.jsx → ProjectCard.css + update
9. [ ] Convert Footer.jsx → Footer.css + update
10. [ ] Convert Contact.jsx → Contact.css + update
11. [ ] Convert Skills.jsx → Skills.css + update
12. [ ] Convert Dashboard.jsx → Dashboard.css + update
13. [ ] Convert Home.jsx → Home.css + update
14. [ ] Convert remaining components (AddProjectForm, MessageList, etc.)
15. [ ] Test: `cd frontend && npm start`
16. [ ] Verify dark mode, responsive, hovers work
17. [ ] Complete!

**Progress:** Hero complete. Next: Navbar
