// ERPNext Journey Application Logic

document.addEventListener("DOMContentLoaded", () => {
  const sidebarNav = document.getElementById("sidebar-nav");
  const contentBody = document.getElementById("content-body");
  const searchInput = document.getElementById("search-input");
  const themeToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");

  // --- 1. THEME MANAGEMENT ---
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // --- 2. SIDEBAR BUILDER ---
  function buildSidebar() {
    sidebarNav.innerHTML = "";
    
    // Group documentation pages by category
    const categories = {};
    for (const key in docsData) {
      const page = docsData[key];
      if (!categories[page.category]) {
        categories[page.category] = [];
      }
      categories[page.category].push({ key, ...page });
    }

    // Generate HTML for sidebar categories and items
    for (const catName in categories) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "nav-group";
      
      const title = document.createElement("div");
      title.className = "nav-group-title";
      title.innerText = catName;
      groupDiv.appendChild(title);
      
      const ul = document.createElement("ul");
      ul.className = "nav-list";
      
      categories[catName].forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = "nav-link";
        a.setAttribute("data-page", item.key);
        a.href = `#${item.key}`;
        a.innerHTML = `<span>${item.icon || '📄'}</span> ${item.title}`;
        
        li.appendChild(a);
        ul.appendChild(li);
      });
      
      groupDiv.appendChild(ul);
      sidebarNav.appendChild(groupDiv);
    }
  }

  // --- 3. ROUTER / PAGE RENDERER ---
  function renderPage() {
    const hash = window.location.hash.substring(1) || "intro";
    const page = docsData[hash];

    if (page) {
      // Load content
      contentBody.innerHTML = page.content;
      
      // Update page title in browser
      document.title = `${page.title} | ERPNext Learning Journey`;
      
      // Update sidebar active classes
      document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("data-page") === hash) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
      
      // Scroll to top of content
      document.getElementById("content-wrapper").scrollTop = 0;
    } else {
      contentBody.innerHTML = `<h2>Page Not Found</h2><p>Sorry, the page you are looking for doesn't exist.</p>`;
    }
  }

  // Listen for hash changes
  window.addEventListener("hashchange", () => {
    renderPage();
    // Close sidebar on mobile after clicking
    sidebar.classList.remove("open");
  });

  // --- 4. SEARCH FUNCTIONALITY ---
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
      const pageKey = link.getAttribute("data-page");
      const page = docsData[pageKey];
      
      // Search in page title, category name, or page body text
      const matchesTitle = page.title.toLowerCase().includes(query);
      const matchesCategory = page.category.toLowerCase().includes(query);
      
      // Strip HTML tags for clean text search inside content
      const cleanContent = page.content.replace(/<[^>]*>/g, '').toLowerCase();
      const matchesContent = cleanContent.includes(query);
      
      if (matchesTitle || matchesCategory || matchesContent) {
        link.parentElement.style.display = "block";
        // If content matches, we could highlight it, but let's keep search simple first
      } else {
        link.parentElement.style.display = "none";
      }
    });

    // Hide navigation group titles if all their items are hidden
    document.querySelectorAll(".nav-group").forEach(group => {
      const visibleLinks = group.querySelectorAll("li[style='display: block;']");
      const totalLinks = group.querySelectorAll("li");
      
      // If query is empty, reset display
      if (query === "") {
        group.style.display = "block";
        totalLinks.forEach(li => li.style.display = "block");
        return;
      }
      
      let hasVisibleItem = false;
      totalLinks.forEach(li => {
        if (li.style.display !== "none") {
          hasVisibleItem = true;
        }
      });
      
      group.style.display = hasVisibleItem ? "block" : "none";
    });
  });

  // Keyboard Shortcuts: Focus search on "/" key press
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // --- 5. MOBILE DRAWER TOGGLE ---
  mobileToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Close mobile sidebar if clicked outside of it
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
    }
  });

  // --- INITIALIZE PORTAL ---
  buildSidebar();
  renderPage();
});
