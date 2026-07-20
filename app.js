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
      
      // Initialize corresponding day simulator if active page
      if (hash === "day1") {
        initDay1Simulator();
      } else if (hash === "day2") {
        initDay2Simulator();
      } else if (hash === "day3") {
        initDay3Simulator();
      }
      
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

  // --- 4. SEARCH FUNCTIONALITY & LIVE RESULTS ---
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const navLinks = document.querySelectorAll(".nav-link");
    
    if (query === "") {
      // Restore active page content
      renderPage();
      
      // Restore all sidebar items and groups
      document.querySelectorAll(".nav-group").forEach(group => {
        group.style.display = "block";
        group.querySelectorAll("li").forEach(li => li.style.display = "block");
      });
      return;
    }

    // 1. Filter Sidebar Items
    navLinks.forEach(link => {
      const pageKey = link.getAttribute("data-page");
      const page = docsData[pageKey];
      
      const matchesTitle = page.title.toLowerCase().includes(query);
      const matchesCategory = page.category.toLowerCase().includes(query);
      const cleanContent = page.content.replace(/<[^>]*>/g, '').toLowerCase();
      const matchesContent = cleanContent.includes(query);
      
      if (matchesTitle || matchesCategory || matchesContent) {
        link.parentElement.style.display = "block";
      } else {
        link.parentElement.style.display = "none";
      }
    });

    // Hide empty sidebar groups
    document.querySelectorAll(".nav-group").forEach(group => {
      const totalLinks = group.querySelectorAll("li");
      let hasVisibleItem = false;
      totalLinks.forEach(li => {
        if (li.style.display !== "none") {
          hasVisibleItem = true;
        }
      });
      group.style.display = hasVisibleItem ? "block" : "none";
    });

    // 2. Render Live Search Results in Main Content Panel
    let resultsHtml = `<h2>Search Results</h2><p style="margin-bottom: 2rem;">Showing results for "<strong>${query}</strong>":</p><div class="search-results-list">`;
    let matchCount = 0;

    for (const key in docsData) {
      const page = docsData[key];
      const cleanText = page.content.replace(/<[^>]*>/g, ' ');
      const cleanTextLower = cleanText.toLowerCase();
      
      const matchesTitle = page.title.toLowerCase().includes(query);
      const matchesCategory = page.category.toLowerCase().includes(query);
      const matchIndex = cleanTextLower.indexOf(query);

      if (matchesTitle || matchesCategory || matchIndex !== -1) {
        matchCount++;
        
        // Extract a snippet around the match
        let snippet = "";
        if (matchIndex !== -1) {
          const start = Math.max(0, matchIndex - 60);
          const end = Math.min(cleanText.length, matchIndex + query.length + 60);
          let rawSnippet = cleanText.substring(start, end).trim();
          
          // Add ellipses if truncated
          if (start > 0) rawSnippet = "..." + rawSnippet;
          if (end < cleanText.length) rawSnippet = rawSnippet + "...";
          
          // Highlight the matching query (case-insensitive)
          const regex = new RegExp(`(${query})`, "gi");
          snippet = rawSnippet.replace(regex, `<mark class="search-highlight">$1</mark>`);
        } else {
          // If match is in title/category, just show the beginning of the text
          snippet = cleanText.substring(0, 120).trim() + "...";
        }

        resultsHtml += `
          <div class="search-result-item card" onclick="window.location.hash = '#${key}'" style="cursor: pointer; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <h4 style="margin: 0; color: var(--accent-color);">${page.icon || '📄'} ${page.title}</h4>
              <span class="badge request" style="margin: 0;">${page.category}</span>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">${snippet}</p>
          </div>
        `;
      }
    }

    resultsHtml += `</div>`;

    if (matchCount === 0) {
      resultsHtml = `
        <h2>No Results Found</h2>
        <p>We couldn't find any matches for "<strong>${query}</strong>". Try checking your spelling or search for broader concepts like "sales", "purchase", or "ledger".</p>
      `;
    }

    contentBody.innerHTML = resultsHtml;
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

  // --- 6. INTERACTIVE SIMULATOR ENGINES ---

  // ==========================================
  // DAY 1 SIMULATOR (P2P - BUYING)
  // ==========================================
  let sim1State = null;

  function resetSim1State() {
    sim1State = {
      step: 0,
      stockQty: 0,
      stockVal: 0,
      bankBalance: 1000000,
      stockReceivedButNotBilled: 0,
      accountsPayable: 0,
      generalLedger: [],
      history: [
        { time: new Date().toLocaleTimeString(), action: "Init", details: "Ready to start P2P Cycle. Bank Balance: Rs 1,000,000.", status: "success" }
      ],
      activeTab: "gl"
    };
  }

  function initDay1Simulator() {
    const container = document.getElementById("day1-simulator-container");
    if (!container) return;
    if (!sim1State) resetSim1State();
    renderDay1Simulator();
  }

  function renderDay1Simulator() {
    const container = document.getElementById("day1-simulator-container");
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-layout">
        <!-- Controls Panel -->
        <div class="sim-panel">
          <div class="sim-panel-title">
            <span>🛒 P2P Steps Control</span>
            <button class="btn-secondary" id="btn-reset-sim1">Reset</button>
          </div>
          
          <div class="form-group">
            <label>Current Status:</label>
            <div style="font-weight: 600; color: var(--accent-color); margin-bottom: 1rem; font-size: 0.9rem;" id="sim1-status-text">
              ${getCurrentP2PStatusText()}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn-primary" id="btn-p2p-mr" ${sim1State.step !== 0 ? 'disabled style="opacity: 0.5;"' : ''}>
              1. Create Material Request
            </button>
            <button class="btn-primary" id="btn-p2p-po" ${sim1State.step !== 1 ? 'disabled style="opacity: 0.5;"' : ''}>
              2. Create Purchase Order
            </button>
            <button class="btn-primary" id="btn-p2p-grn" ${sim1State.step !== 2 ? 'disabled style="opacity: 0.5;"' : ''}>
              3. Post Purchase Receipt (GRN)
            </button>
            <button class="btn-primary" id="btn-p2p-invoice" ${sim1State.step !== 3 ? 'disabled style="opacity: 0.5;"' : ''}>
              4. Post Purchase Invoice
            </button>
            <button class="btn-primary" id="btn-p2p-payment" ${sim1State.step !== 4 ? 'disabled style="opacity: 0.5;"' : ''}>
              5. Post Payment Entry
            </button>
          </div>
        </div>

        <!-- Output Panel -->
        <div>
          <!-- Balances Card -->
          <div class="sim-panel">
            <div class="sim-panel-title">📊 Trial Balance & Stock</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.85rem; margin-bottom: 1rem;">
              <div><strong>Stock Qty:</strong> ${sim1State.stockQty} Laptops</div>
              <div><strong>Stock Value:</strong> Rs ${sim1State.stockVal.toLocaleString()}</div>
              <div><strong>Bank Balance:</strong> Rs ${sim1State.bankBalance.toLocaleString()}</div>
              <div><strong>Temp Liability (GRN):</strong> Rs ${Math.abs(sim1State.stockReceivedButNotBilled).toLocaleString()}</div>
              <div style="grid-column: span 2;"><strong>Accounts Payable (Creditors):</strong> Rs ${Math.abs(sim1State.accountsPayable).toLocaleString()}</div>
            </div>
          </div>

          <!-- Ledgers -->
          <div class="sim-panel">
            <div class="ledger-tabs">
              <button class="ledger-tab-btn ${sim1State.activeTab === 'gl' ? 'active' : ''}" id="tab-sim1-gl">GL Posting</button>
              <button class="ledger-tab-btn ${sim1State.activeTab === 'log' ? 'active' : ''}" id="tab-sim1-log">Activity Log</button>
            </div>
            <div id="sim1-tab-content">
              ${renderSim1TabContent()}
            </div>
          </div>
        </div>
      </div>
    `;

    bindDay1Events();
  }

  function getCurrentP2PStatusText() {
    switch(sim1State.step) {
      case 0: return "Step 0: Laptops needed. Awaiting Material Request.";
      case 1: return "Step 1: Material Request created internally. Now create a PO.";
      case 2: return "Step 2: PO issued to Supplier. Awaiting Delivery (GRN).";
      case 3: return "Step 3: Laptops arrived. Stock Asset increased. Awaiting Invoice.";
      case 4: return "Step 4: Invoice booked. Liability created. Awaiting Payment.";
      case 5: return "Step 5: Paid Supplier! P2P cycle successfully completed.";
      default: return "Ready.";
    }
  }

  function renderSim1TabContent() {
    if (sim1State.activeTab === "gl") {
      let rows = "";
      if (sim1State.generalLedger.length === 0) {
        rows = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No accounting impact at this step.</td></tr>`;
      } else {
        sim1State.generalLedger.forEach(item => {
          rows += `
            <tr class="${item.debit > 0 ? 'dr' : 'cr'}">
              <td>${item.account}</td>
              <td>${item.debit > 0 ? 'Rs ' + item.debit.toLocaleString() : '-'}</td>
              <td>${item.credit > 0 ? 'Rs ' + item.credit.toLocaleString() : '-'}</td>
            </tr>
          `;
        });
      }
      return `
        <div class="gl-table-container">
          <table class="gl-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Debit (Dr)</th>
                <th>Credit (Cr)</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    } else {
      let list = "";
      for (let i = sim1State.history.length - 1; i >= 0; i--) {
        const item = sim1State.history[i];
        list += `
          <div class="log-item ${item.status}">
            <div>[${item.time}] <strong>${item.action}</strong></div>
            <div>${item.details}</div>
          </div>
        `;
      }
      return `<div class="log-list">${list}</div>`;
    }
  }

  function bindDay1Events() {
    const timeStr = () => new Date().toLocaleTimeString();

    const handleAction = (btnId, stepNum, actionName, updatesFn) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => {
          sim1State.step = stepNum;
          updatesFn();
          sim1State.activeTab = "gl";
          renderDay1Simulator();
        });
      }
    };

    handleAction("btn-p2p-mr", 1, "Material Request", () => {
      sim1State.history.push({
        time: timeStr(),
        action: "Material Request #MR-001",
        details: "Requested 10 laptops internally. Stock status set to 'Indented'.",
        status: "success"
      });
      sim1State.generalLedger = [];
    });

    handleAction("btn-p2p-po", 2, "Purchase Order", () => {
      sim1State.history.push({
        time: timeStr(),
        action: "Purchase Order #PO-001",
        details: "Contract signed with Supplier for 10 Laptops @ Rs 40,000 each.",
        status: "success"
      });
      sim1State.generalLedger = [];
    });

    handleAction("btn-p2p-grn", 3, "Purchase Receipt", () => {
      sim1State.stockQty = 10;
      sim1State.stockVal = 400000;
      sim1State.stockReceivedButNotBilled = 400000;
      sim1State.generalLedger = [
        { account: "Stock In Hand (Asset)", debit: 400000, credit: 0 },
        { account: "Stock Received But Not Billed (Temp Liability)", debit: 0, credit: 400000 }
      ];
      sim1State.history.push({
        time: timeStr(),
        action: "Goods Receipt Note (GRN)",
        details: "10 Laptops arrived physically. Debited Stock In Hand, Credited Temp Liability.",
        status: "success"
      });
    });

    handleAction("btn-p2p-invoice", 4, "Purchase Invoice", () => {
      sim1State.stockReceivedButNotBilled = 0;
      sim1State.accountsPayable = 400000;
      sim1State.generalLedger = [
        { account: "Stock Received But Not Billed (Temp Liability)", debit: 400000, credit: 0 },
        { account: "Creditors / Accounts Payable (Liability)", debit: 0, credit: 400000 }
      ];
      sim1State.history.push({
        time: timeStr(),
        action: "Purchase Invoice",
        details: "Supplier bill received. Cleared Temp Liability, booked Accounts Payable.",
        status: "success"
      });
    });

    handleAction("btn-p2p-payment", 5, "Payment Entry", () => {
      sim1State.accountsPayable = 0;
      sim1State.bankBalance -= 400000;
      sim1State.generalLedger = [
        { account: "Creditors / Accounts Payable (Liability)", debit: 400000, credit: 0 },
        { account: "Bank / Cash Account (Asset)", debit: 0, credit: 400000 }
      ];
      sim1State.history.push({
        time: timeStr(),
        action: "Payment Entry",
        details: "Rs 400,000 paid to supplier from Bank. Accounts Payable cleared.",
        status: "success"
      });
    });

    const resetBtn = document.getElementById("btn-reset-sim1");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetSim1State();
        renderDay1Simulator();
      });
    }

    const tabGl = document.getElementById("tab-sim1-gl");
    const tabLog = document.getElementById("tab-sim1-log");

    if (tabGl) {
      tabGl.addEventListener("click", () => {
        sim1State.activeTab = "gl";
        document.getElementById("sim1-tab-content").innerHTML = renderSim1TabContent();
        tabGl.classList.add("active");
        tabLog.classList.remove("active");
      });
    }

    if (tabLog) {
      tabLog.addEventListener("click", () => {
        sim1State.activeTab = "log";
        document.getElementById("sim1-tab-content").innerHTML = renderSim1TabContent();
        tabLog.classList.add("active");
        tabGl.classList.remove("active");
      });
    }
  }

  // ==========================================
  // DAY 2 SIMULATOR (O2C - SALES)
  // ==========================================
  let sim2State = null;

  function resetSim2State() {
    sim2State = {
      step: 0,
      stockQty: 10,
      stockVal: 400000,
      bankBalance: 600000,
      accountsReceivable: 0,
      salesRevenue: 0,
      cogs: 0,
      generalLedger: [],
      history: [
        { time: new Date().toLocaleTimeString(), action: "Init", details: "Ready to start O2C Cycle. Laptops in stock: 10 units (Valued at Rs 40,000 each).", status: "success" }
      ],
      activeTab: "gl"
    };
  }

  function initDay2Simulator() {
    const container = document.getElementById("day2-simulator-container");
    if (!container) return;
    if (!sim2State) resetSim2State();
    renderDay2Simulator();
  }

  function renderDay2Simulator() {
    const container = document.getElementById("day2-simulator-container");
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-layout">
        <!-- Controls Panel -->
        <div class="sim-panel">
          <div class="sim-panel-title">
            <span>💵 O2C Steps Control</span>
            <button class="btn-secondary" id="btn-reset-sim2">Reset</button>
          </div>
          
          <div class="form-group">
            <label>Current Status:</label>
            <div style="font-weight: 600; color: var(--accent-color); margin-bottom: 1rem; font-size: 0.9rem;" id="sim2-status-text">
              ${getCurrentO2CStatusText()}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn-primary" id="btn-o2c-so" ${sim2State.step !== 0 ? 'disabled style="opacity: 0.5;"' : ''}>
              1. Create Sales Order
            </button>
            <button class="btn-primary" id="btn-o2c-dn" ${sim2State.step !== 1 ? 'disabled style="opacity: 0.5;"' : ''}>
              2. Post Delivery Note (Ship)
            </button>
            <button class="btn-primary" id="btn-o2c-invoice" ${sim2State.step !== 2 ? 'disabled style="opacity: 0.5;"' : ''}>
              3. Post Sales Invoice
            </button>
            <button class="btn-primary" id="btn-o2c-payment" ${sim2State.step !== 3 ? 'disabled style="opacity: 0.5;"' : ''}>
              4. Post Payment Receipt
            </button>
          </div>
        </div>

        <!-- Output Panel -->
        <div>
          <!-- Balances Card -->
          <div class="sim-panel">
            <div class="sim-panel-title">📊 Trial Balance & Stock</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.85rem; margin-bottom: 1rem;">
              <div><strong>Stock Qty:</strong> ${sim2State.stockQty} Laptops</div>
              <div><strong>Stock Value:</strong> Rs ${sim2State.stockVal.toLocaleString()}</div>
              <div><strong>Bank Balance:</strong> Rs ${sim2State.bankBalance.toLocaleString()}</div>
              <div><strong>Accounts Receivable:</strong> Rs ${sim2State.accountsReceivable.toLocaleString()}</div>
              <div><strong>Sales Revenue (P&L):</strong> Rs ${sim2State.salesRevenue.toLocaleString()}</div>
              <div><strong>COGS Expense (P&L):</strong> Rs ${sim2State.cogs.toLocaleString()}</div>
            </div>
          </div>

          <!-- Ledgers -->
          <div class="sim-panel">
            <div class="ledger-tabs">
              <button class="ledger-tab-btn ${sim2State.activeTab === 'gl' ? 'active' : ''}" id="tab-sim2-gl">GL Posting</button>
              <button class="ledger-tab-btn ${sim2State.activeTab === 'log' ? 'active' : ''}" id="tab-sim2-log">Activity Log</button>
            </div>
            <div id="sim2-tab-content">
              ${renderSim2TabContent()}
            </div>
          </div>
        </div>
      </div>
    `;

    bindDay2Events();
  }

  function getCurrentO2CStatusText() {
    switch(sim2State.step) {
      case 0: return "Step 0: Customer wants 5 laptops. Awaiting Sales Order.";
      case 1: return "Step 1: Sales Order booked. Laptops reserved. Awaiting Delivery.";
      case 2: return "Step 2: Laptops shipped. Stock reduced. Awaiting Invoice Billing.";
      case 3: return "Step 3: Invoice billed. Legal Receivable booked. Awaiting Payment.";
      case 4: return "Step 4: Payment collected! O2C Cycle complete. Net Profit: Rs 100,000.";
      default: return "Ready.";
    }
  }

  function renderSim2TabContent() {
    if (sim2State.activeTab === "gl") {
      let rows = "";
      if (sim2State.generalLedger.length === 0) {
        rows = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No accounting impact at this step.</td></tr>`;
      } else {
        sim2State.generalLedger.forEach(item => {
          rows += `
            <tr class="${item.debit > 0 ? 'dr' : 'cr'}">
              <td>${item.account}</td>
              <td>${item.debit > 0 ? 'Rs ' + item.debit.toLocaleString() : '-'}</td>
              <td>${item.credit > 0 ? 'Rs ' + item.credit.toLocaleString() : '-'}</td>
            </tr>
          `;
        });
      }
      return `
        <div class="gl-table-container">
          <table class="gl-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Debit (Dr)</th>
                <th>Credit (Cr)</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    } else {
      let list = "";
      for (let i = sim2State.history.length - 1; i >= 0; i--) {
        const item = sim2State.history[i];
        list += `
          <div class="log-item ${item.status}">
            <div>[${item.time}] <strong>${item.action}</strong></div>
            <div>${item.details}</div>
          </div>
        `;
      }
      return `<div class="log-list">${list}</div>`;
    }
  }

  function bindDay2Events() {
    const timeStr = () => new Date().toLocaleTimeString();

    const handleAction = (btnId, stepNum, actionName, updatesFn) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => {
          sim2State.step = stepNum;
          updatesFn();
          sim2State.activeTab = "gl";
          renderDay2Simulator();
        });
      }
    };

    handleAction("btn-o2c-so", 1, "Sales Order", () => {
      sim2State.history.push({
        time: timeStr(),
        action: "Sales Order #SO-001",
        details: "Booked order for 5 Laptops @ Rs 60,000 each. 5 units reserved in stock.",
        status: "success"
      });
      sim2State.generalLedger = [];
    });

    handleAction("btn-o2c-dn", 2, "Delivery Note", () => {
      sim2State.stockQty = 5;
      sim2State.stockVal = 200000;
      sim2State.cogs = 200000;
      sim2State.generalLedger = [
        { account: "Cost of Goods Sold (COGS - Expense)", debit: 200000, credit: 0 },
        { account: "Stock In Hand (Asset)", debit: 0, credit: 200000 }
      ];
      sim2State.history.push({
        time: timeStr(),
        action: "Delivery Note #DN-001",
        details: "5 Laptops physically shipped. Cost of Laptops (Rs 40,000 each) charged to COGS.",
        status: "success"
      });
    });

    handleAction("btn-o2c-invoice", 3, "Sales Invoice", () => {
      sim2State.accountsReceivable = 300000;
      sim2State.salesRevenue = 300000;
      sim2State.generalLedger = [
        { account: "Debtors / Accounts Receivable (Asset)", debit: 300000, credit: 0 },
        { account: "Sales Revenue (Income)", debit: 0, credit: 300000 }
      ];
      sim2State.history.push({
        time: timeStr(),
        action: "Sales Invoice",
        details: "Customer billed Rs 300,000 (Selling rate: Rs 60,000 each). Accounts Receivable debited.",
        status: "success"
      });
    });

    handleAction("btn-o2c-payment", 4, "Payment Entry", () => {
      sim2State.accountsReceivable = 0;
      sim2State.bankBalance += 300000;
      sim2State.generalLedger = [
        { account: "Bank / Cash Account (Asset)", debit: 300000, credit: 0 },
        { account: "Debtors / Accounts Receivable (Asset)", debit: 0, credit: 300000 }
      ];
      sim2State.history.push({
        time: timeStr(),
        action: "Payment Entry",
        details: "Rs 300,000 cash received. Debtors balance cleared. P&L Net Profit: Rs 100,000 achieved!",
        status: "success"
      });
    });

    const resetBtn = document.getElementById("btn-reset-sim2");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetSim2State();
        renderDay2Simulator();
      });
    }

    const tabGl = document.getElementById("tab-sim2-gl");
    const tabLog = document.getElementById("tab-sim2-log");

    if (tabGl) {
      tabGl.addEventListener("click", () => {
        sim2State.activeTab = "gl";
        document.getElementById("sim2-tab-content").innerHTML = renderSim2TabContent();
        tabGl.classList.add("active");
        tabLog.classList.remove("active");
      });
    }

    if (tabLog) {
      tabLog.addEventListener("click", () => {
        sim2State.activeTab = "log";
        document.getElementById("sim2-tab-content").innerHTML = renderSim2TabContent();
        tabLog.classList.add("active");
        tabGl.classList.remove("active");
      });
    }
  }

  // ==========================================
  // DAY 3 SIMULATOR (STOCK & DIMENSIONS)
  // ==========================================
  let sim3State = null;

  function resetSim3State() {
    sim3State = {
      warehouses: {
        stores: { name: "Stores Warehouse", qty: 10, valRate: 50000 },
        central: { name: "Central Warehouse", qty: 0, valRate: 0 },
        retail: { name: "Retail Shop Warehouse", qty: 0, valRate: 0 }
      },
      dimensions: {
        marketing: 0,
        hr: 0,
        sales: 0
      },
      stockLedger: [
        { time: new Date().toLocaleTimeString(), type: "System Init", details: "Initial opening stock of 10 Laptops loaded into Stores Warehouse.", status: "success" }
      ],
      generalLedger: [
        { account: "Stock In Hand (Stores Warehouse)", debit: 500000, credit: 0, tag: "" },
        { account: "Stock Adjustment (Income/Equity)", debit: 0, credit: 500000, tag: "" }
      ],
      activeTab: "gl",
      flashElements: {}
    };
  }

  function initDay3Simulator() {
    const container = document.getElementById("day3-simulator-container");
    if (!container) return;
    if (!sim3State) resetSim3State();
    renderDay3Simulator();
  }

  function renderDay3Simulator() {
    const container = document.getElementById("day3-simulator-container");
    if (!container) return;

    const currentType = document.getElementById("sim3-type")?.value || "issue";
    const currentQty = document.getElementById("sim3-qty")?.value || 1;
    const currentSrc = document.getElementById("sim3-source")?.value || "stores";
    const currentTgt = document.getElementById("sim3-target")?.value || "central";
    const currentDim = document.getElementById("sim3-dimension")?.value || "marketing";

    container.innerHTML = `
      <div class="simulator-layout">
        <!-- Form Panel -->
        <div class="sim-panel">
          <div class="sim-panel-title">
            <span>📝 Stock Entry Form</span>
            <button class="btn-secondary" id="btn-reset-sim3">Reset State</button>
          </div>
          
          <form id="sim3-form" onsubmit="event.preventDefault();">
            <div class="form-group">
              <label for="sim3-type">Stock Entry Type</label>
              <select id="sim3-type" class="form-control">
                <option value="issue" ${currentType === "issue" ? "selected" : ""}>Material Issue (Internal Use)</option>
                <option value="transfer" ${currentType === "transfer" ? "selected" : ""}>Material Transfer (Move Stock)</option>
                <option value="receipt" ${currentType === "receipt" ? "selected" : ""}>Material Receipt (Add Stock)</option>
              </select>
            </div>

            <div class="form-group">
              <label>Item</label>
              <select class="form-control" disabled>
                <option>Dell Laptop (Valuation: Rs 50,000)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="sim3-qty">Quantity</label>
              <input type="number" id="sim3-qty" class="form-control" min="1" max="100" value="${currentQty}">
            </div>

            <div class="form-group" id="group3-source">
              <label for="sim3-source">Source Warehouse (From)</label>
              <select id="sim3-source" class="form-control">
                <option value="stores" ${currentSrc === "stores" ? "selected" : ""}>Stores Warehouse (Stock: ${sim3State.warehouses.stores.qty})</option>
                <option value="central" ${currentSrc === "central" ? "selected" : ""}>Central Warehouse (Stock: ${sim3State.warehouses.central.qty})</option>
                <option value="retail" ${currentSrc === "retail" ? "selected" : ""}>Retail Shop Warehouse (Stock: ${sim3State.warehouses.retail.qty})</option>
              </select>
            </div>

            <div class="form-group" id="group3-target" style="display: none;">
              <label for="sim3-target">Target Warehouse (To)</label>
              <select id="sim3-target" class="form-control">
                <option value="stores" ${currentTgt === "stores" ? "selected" : ""}>Stores Warehouse</option>
                <option value="central" ${currentTgt === "central" ? "selected" : ""}>Central Warehouse</option>
                <option value="retail" ${currentTgt === "retail" ? "selected" : ""}>Retail Shop Warehouse</option>
              </select>
            </div>

            <div class="form-group" id="group3-dimension">
              <label for="sim3-dimension">Accounting Dimension (Department Tag)</label>
              <select id="sim3-dimension" class="form-control">
                <option value="marketing" ${currentDim === "marketing" ? "selected" : ""}>Marketing Department</option>
                <option value="hr" ${currentDim === "hr" ? "selected" : ""}>HR Department</option>
                <option value="sales" ${currentDim === "sales" ? "selected" : ""}>Sales Department</option>
                <option value="none" ${currentDim === "none" ? "selected" : ""}>None</option>
              </select>
            </div>

            <button type="submit" class="btn-primary" id="btn-post-entry3">Post Stock Entry</button>
          </form>
        </div>

        <!-- Visualizers & Output -->
        <div>
          <!-- Warehouse Cards -->
          <div class="sim-panel">
            <div class="sim-panel-title">🏬 Warehouse Balances</div>
            <div class="warehouse-visual-grid">
              <div class="warehouse-card ${sim3State.flashElements['stores'] ? 'flash-green' : ''}" id="card-stores">
                <h5>Stores Whse</h5>
                <div class="qty-badge">${sim3State.warehouses.stores.qty}</div>
                <div class="val-label">Rs ${(sim3State.warehouses.stores.qty * 50000).toLocaleString()}</div>
              </div>
              <div class="warehouse-card ${sim3State.flashElements['central'] ? 'flash-green' : ''}" id="card-central">
                <h5>Central Whse</h5>
                <div class="qty-badge">${sim3State.warehouses.central.qty}</div>
                <div class="val-label">Rs ${(sim3State.warehouses.central.qty * 50000).toLocaleString()}</div>
              </div>
              <div class="warehouse-card ${sim3State.flashElements['retail'] ? 'flash-green' : ''}" id="card-retail">
                <h5>Retail Whse</h5>
                <div class="qty-badge">${sim3State.warehouses.retail.qty}</div>
                <div class="val-label">Rs ${(sim3State.warehouses.retail.qty * 50000).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <!-- Dimension Spending Cards -->
          <div class="sim-panel">
            <div class="sim-panel-title">🏷️ Department Expenses (Dimensions)</div>
            <div class="dimension-exp-grid">
              <div class="dimension-exp-card ${sim3State.flashElements['marketing'] ? 'flash-green' : ''}">
                <h5>Marketing</h5>
                <div class="val">Rs ${sim3State.dimensions.marketing.toLocaleString()}</div>
              </div>
              <div class="dimension-exp-card ${sim3State.flashElements['hr'] ? 'flash-green' : ''}">
                <h5>HR Dept</h5>
                <div class="val">Rs ${sim3State.dimensions.hr.toLocaleString()}</div>
              </div>
              <div class="dimension-exp-card ${sim3State.flashElements['sales'] ? 'flash-green' : ''}">
                <h5>Sales Dept</h5>
                <div class="val">Rs ${sim3State.dimensions.sales.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <!-- Ledgers Panel -->
          <div class="sim-panel">
            <div class="ledger-tabs">
              <button class="ledger-tab-btn ${sim3State.activeTab === 'gl' ? 'active' : ''}" id="tab-sim3-gl">General Ledger (GL)</button>
              <button class="ledger-tab-btn ${sim3State.activeTab === 'stock' ? 'active' : ''}" id="tab-sim3-stock">Stock Ledger</button>
            </div>

            <!-- Tab Content -->
            <div id="sim3-tab-content">
              ${renderSim3TabContent()}
            </div>
          </div>
        </div>
      </div>
    `;

    sim3State.flashElements = {};
    bindDay3Events();
  }

  function renderSim3TabContent() {
    if (sim3State.activeTab === "gl") {
      let rows = "";
      if (sim3State.generalLedger.length === 0) {
        rows = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No transaction posted yet.</td></tr>`;
      } else {
        sim3State.generalLedger.forEach(item => {
          const isDr = item.debit > 0;
          rows += `
            <tr class="${isDr ? 'dr' : 'cr'}">
              <td>
                ${item.account}
                ${item.tag ? `<br><small style="color: var(--accent-color); font-size: 0.75rem;">[Dimension: ${item.tag}]</small>` : ''}
              </td>
              <td>${item.debit > 0 ? 'Rs ' + item.debit.toLocaleString() : '-'}</td>
              <td>${item.credit > 0 ? 'Rs ' + item.credit.toLocaleString() : '-'}</td>
            </tr>
          `;
        });
      }
      return `
        <div class="gl-table-container">
          <table class="gl-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Debit (Dr)</th>
                <th>Credit (Cr)</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    } else {
      let list = "";
      for (let i = sim3State.stockLedger.length - 1; i >= 0; i--) {
        const log = sim3State.stockLedger[i];
        list += `
          <div class="log-item ${log.status}">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem; color: var(--text-muted);">
              <span>[${log.time}] <strong>${log.type}</strong></span>
            </div>
            <div>${log.details}</div>
          </div>
        `;
      }
      return `<div class="log-list">${list}</div>`;
    }
  }

  function bindDay3Events() {
    const typeSelect = document.getElementById("sim3-type");
    const groupSource = document.getElementById("group3-source");
    const groupTarget = document.getElementById("group3-target");
    const groupDimension = document.getElementById("group3-dimension");

    function adjustFormFields() {
      const type = typeSelect.value;
      if (type === "issue") {
        groupSource.style.display = "block";
        groupTarget.style.display = "none";
        groupDimension.style.display = "block";
      } else if (type === "transfer") {
        groupSource.style.display = "block";
        groupTarget.style.display = "block";
        groupDimension.style.display = "none";
      } else if (type === "receipt") {
        groupSource.style.display = "none";
        groupTarget.style.display = "block";
        groupDimension.style.display = "block";
      }
    }

    if (typeSelect) {
      typeSelect.addEventListener("change", adjustFormFields);
      adjustFormFields();
    }

    const postBtn = document.getElementById("btn-post-entry3");
    if (postBtn) {
      postBtn.addEventListener("click", () => {
        const type = typeSelect.value;
        const qty = parseInt(document.getElementById("sim3-qty").value);
        const sourceKey = document.getElementById("sim3-source").value;
        const targetKey = document.getElementById("sim3-target").value;
        const dimension = document.getElementById("sim3-dimension").value;

        if (isNaN(qty) || qty <= 0) {
          alert("Please enter a valid quantity greater than 0.");
          return;
        }

        const timeStr = new Date().toLocaleTimeString();

        // Validations
        if (type === "issue" || type === "transfer") {
          const sourceWh = sim3State.warehouses[sourceKey];
          if (sourceWh.qty < qty) {
            sim3State.stockLedger.push({
              time: timeStr,
              type: type === "issue" ? "Material Issue Failed" : "Material Transfer Failed",
              details: `Insufficient stock in ${sourceWh.name}. Required: ${qty}, Available: ${sourceWh.qty}.`,
              status: "error"
            });
            sim3State.activeTab = "stock";
            renderDay3Simulator();
            return;
          }
        }

        if (type === "transfer" && sourceKey === targetKey) {
          sim3State.stockLedger.push({
            time: timeStr,
            type: "Material Transfer Failed",
            details: `Source and Target Warehouses cannot be the same.`,
            status: "error"
          });
          sim3State.activeTab = "stock";
          renderDay3Simulator();
          return;
        }

        const value = qty * 50000;
        sim3State.generalLedger = [];

        if (type === "issue") {
          const sourceWh = sim3State.warehouses[sourceKey];
          sourceWh.qty -= qty;
          sim3State.flashElements[sourceKey] = true;

          let tagText = "";
          if (dimension !== "none") {
            sim3State.dimensions[dimension] += value;
            sim3State.flashElements[dimension] = true;
            tagText = dimension.toUpperCase() + " Dept";
          }

          sim3State.generalLedger.push({
            account: "Computer & IT Expense (Expense)",
            debit: value,
            credit: 0,
            tag: tagText
          });
          sim3State.generalLedger.push({
            account: `Stock In Hand (${sourceWh.name})`,
            debit: 0,
            credit: value,
            tag: ""
          });

          sim3State.stockLedger.push({
            time: timeStr,
            type: "Material Issue",
            details: `Issued ${qty} laptop(s) from ${sourceWh.name} (Value: Rs ${value.toLocaleString()}) to ${tagText || 'No Department'}.`,
            status: "success"
          });
        } 
        else if (type === "transfer") {
          const sourceWh = sim3State.warehouses[sourceKey];
          const targetWh = sim3State.warehouses[targetKey];

          sourceWh.qty -= qty;
          targetWh.qty += qty;
          sim3State.flashElements[sourceKey] = true;
          sim3State.flashElements[targetKey] = true;

          sim3State.generalLedger.push({
            account: `Stock In Hand (${targetWh.name})`,
            debit: value,
            credit: 0,
            tag: ""
          });
          sim3State.generalLedger.push({
            account: `Stock In Hand (${sourceWh.name})`,
            debit: 0,
            credit: value,
            tag: ""
          });

          sim3State.stockLedger.push({
            time: timeStr,
            type: "Material Transfer",
            details: `Transferred ${qty} laptop(s) from ${sourceWh.name} to ${targetWh.name}. (Inventory asset shifted, total value remains same).`,
            status: "success"
          });
        } 
        else if (type === "receipt") {
          const targetWh = sim3State.warehouses[targetKey];
          targetWh.qty += qty;
          sim3State.flashElements[targetKey] = true;

          let tagText = "";
          if (dimension !== "none") {
            tagText = dimension.toUpperCase() + " Dept";
          }

          sim3State.generalLedger.push({
            account: `Stock In Hand (${targetWh.name})`,
            debit: value,
            credit: 0,
            tag: ""
          });
          sim3State.generalLedger.push({
            account: "Stock Adjustment (Income/Gain)",
            debit: 0,
            credit: value,
            tag: tagText
          });

          sim3State.stockLedger.push({
            time: timeStr,
            type: "Material Receipt",
            details: `Received ${qty} laptop(s) into ${targetWh.name} (Valued at Rs ${value.toLocaleString()}). Offset credited to Stock Adjustment.`,
            status: "success"
          });
        }

        sim3State.activeTab = "gl";
        renderDay3Simulator();
      });
    }

    const resetBtn = document.getElementById("btn-reset-sim3");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resetSim3State();
        renderDay3Simulator();
      });
    }

    const tabGl = document.getElementById("tab-sim3-gl");
    const tabStock = document.getElementById("tab-sim3-stock");

    if (tabGl) {
      tabGl.addEventListener("click", () => {
        sim3State.activeTab = "gl";
        document.getElementById("sim3-tab-content").innerHTML = renderSim3TabContent();
        tabGl.classList.add("active");
        tabStock.classList.remove("active");
      });
    }

    if (tabStock) {
      tabStock.addEventListener("click", () => {
        sim3State.activeTab = "stock";
        document.getElementById("sim3-tab-content").innerHTML = renderSim3TabContent();
        tabStock.classList.add("active");
        tabGl.classList.remove("active");
      });
    }
  }

  // --- INITIALIZE PORTAL ---
  buildSidebar();
  renderPage();
});
