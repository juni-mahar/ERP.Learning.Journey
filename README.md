# ERPNext Learning Journey Documentation Portal ⚙️📚

Welcome to your personalized ERPNext documentation portal! This site acts as an interactive notebook to capture, organize, and revise all the business processes, workflows, and accounting entries you learn daily.

## 🚀 How to Run Locally

You can run this project locally without any complex web servers:
1. Double-click the `index.html` file in your file explorer to open it directly in your web browser.
2. Alternatively, if you use VS Code, install the **Live Server** extension, right-click `index.html` and click **Open with Live Server**.

---

## 🛠️ How to Add Day 3 (and Future Days)

Adding a new day is completely automated. You do **not** need to touch the layout, search bar, or navigation code.

1. Open the [docs-content.js](file:///d:/Junaid Project/ERPNext Learning/docs-content.js) file in your code editor.
2. Scroll to the bottom of the `docsData` object.
3. Add a comma `,` after the `day2` block, and add your `day3` entry like this:

```javascript
  day3: {
    title: "Day 3: Manufacturing & BOM",
    category: "Learning Days",
    icon: "🏭", // Any emoji you like!
    content: `
      <h2>Day 3: Manufacturing Process</h2>
      <p>Today I learnt how components are converted into finished goods...</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Bill of Materials (BOM):</strong> The recipe...</li>
      </ul>
    `
  }
```
4. Save the file and refresh your browser. Day 3 will instantly appear in the sidebar, be fully searchable, and load dynamically!

---

## ☁️ How to Push to GitHub & Deploy to Vercel

Follow these steps to deploy your site live so you can access your notes from your phone or share them:

### Step 1: Commit Your Code Locally
Open your command terminal (Command Prompt, PowerShell, or Git Bash) inside the project folder (`d:/Junaid Project/ERPNext Learning/`) and run:
```bash
# Add all files to staging
git add .

# Create your first commit
git commit -m "feat: initial ERPNext learning notes setup"
```

### Step 2: Push to GitHub
1. Go to [GitHub](https://github.com/) and create a new **public** repository named `erpnext-learning-journey`.
2. Do **NOT** initialize it with a README, `.gitignore`, or License (since we already have them).
3. Copy the commands shown under **"…or push an existing repository from the command line"** and paste them into your terminal. They will look similar to this:
```bash
# Rename default branch to main
git branch -M main

# Link your local repo to GitHub (replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/erpnext-learning-journey.git

# Push your code
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and sign up or log in (you can sign in with your GitHub account).
2. Click **Add New** -> **Project**.
3. Import your `erpnext-learning-journey` repository from the GitHub list.
4. Keep the **Framework Preset** as **Other** (Vercel will auto-detect it's a static HTML/CSS/JS site).
5. Click **Deploy**!
6. In less than 10 seconds, your site will be live on a public URL (e.g., `https://yourname-erpnext-learning.vercel.app`).

*Every time you add a new day locally and run `git add .`, `git commit -m "add day 3"`, and `git push`, Vercel will automatically redeploy the updates live within seconds!*
