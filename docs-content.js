// ERPNext Learning Documentation Content
// This file houses the documentation data with embedded simulators for each learning day.

const docsData = {
  intro: {
    title: "ERP Foundations",
    category: "Getting Started",
    icon: "📚",
    content: `
      <h2>Welcome to your ERPNext Learning Journey!</h2>
      <p>This portal acts as your interactive notebook, designed to capture, organize, and reinforce foundational ERP concepts and workflows as you learn them day by day.</p>
      
      <div class="callout note">
        <h3>💡 Why use an ERP?</h3>
        <p>An Enterprise Resource Planning (ERP) system consolidates all business operations—sales, purchasing, stock, manufacturing, and accounting—into a single centralized database. This eliminates data silos, ensures accounting matches real-world transactions in real-time, and automates tracking of physical stock.</p>
      </div>

      <h3>Core Financial Statements Explained</h3>
      <p>Every transaction in an ERP ultimately affects these four statements. Understanding them is key to making sense of ledger postings:</p>

      <div class="grid-card">
        <div class="card">
          <h4>📂 Chart of Accounts (COA)</h4>
          <p>The structured directory of all ledger accounts. Categorized into five main groups: Assets, Liabilities, Equity, Income, and Expenses.</p>
        </div>
        <div class="card">
          <h4>📊 Profit & Loss (P&L)</h4>
          <p>Shows company performance over a period of time. It tracks Revenue (what you sold) minus Expenses (what you spent). The result is your Net Profit or Loss.</p>
        </div>
        <div class="card">
          <h4>⚖️ Balance Sheet</h4>
          <p>A snapshot of your company's net worth at a specific moment. It follows the formula: <strong>Assets = Liabilities + Equity</strong>.</p>
        </div>
        <div class="card">
          <h4>💸 Cash Flow Statement</h4>
          <p>Tracks physical cash coming in and going out of Bank and Cash accounts. Crucial for verifying that your actual cash matches your reported profits.</p>
        </div>
      </div>
    `
  },
  day1: {
    title: "Day 1: Buying (Procure-to-Pay)",
    category: "Learning Days",
    icon: "🛒",
    content: `
      <h2>Day 1: The Procure-to-Pay (P2P) Cycle</h2>
      <p>The buying process starts from identifying a requirement within the company and ends when the supplier is paid for the delivered goods.</p>

      <div class="callout note">
        <h3>💡 Simple Analogy: Laptop ki Shop 🏬</h3>
        <p>Farz kijiye aapki laptop shop hai aur godown khali ho gaya hai. Aapko stock mangwana hai. Aap pehle internally request create karenge, supplier se contract sign karenge (PO), stock receive karenge (GRN), supplier ka bill record karenge (Invoice), aur aakhir mein bank se payment karenge.</p>
        <p>Let's look at each step with its professional English terms and real-world accounting entries.</p>
      </div>

      <h3>The 5 Transaction Steps (Scenario: Buying 10 Laptops @ Rs 40,000 each)</h3>
      
      <div class="workflow-container">
        
        <!-- Step 1: Material Request -->
        <div class="workflow-step">
          <span class="badge request">1. Material Request (Stock Demand)</span>
          <p><strong>Urdu Analogy:</strong> Godown Manager check karta hai ke laptops khatam hain aur ek internal request daalta hai ke 10 laptops chahiye.</p>
          <p><strong>Professional Concept:</strong> An internal document that specifies the demand for items. It does not affect accounting accounts or general stock quantities. Stock status updates to "Indented" (Requested).</p>
          <p class="description" style="font-style: italic; color: var(--text-muted);">No Accounting Entry (No GL Posting).</p>
        </div>

        <!-- Step 2: Purchase Order -->
        <div class="workflow-step">
          <span class="badge po">2. Purchase Order - PO (Contract)</span>
          <p><strong>Urdu Analogy:</strong> Aap supplier ko formal email bhejte hain: <em>"Hum aapse Rs 40,000 ke rate par 10 laptops khareedna chahte hain."</em> Yeh dono ke darmiyan contract ban jata hai.</p>
          <p><strong>Professional Concept:</strong> A legally binding contract sent to the supplier confirming order details, pricing, and terms. No stock has entered the warehouse and no financial transaction occurred yet.</p>
          <p class="description" style="font-style: italic; color: var(--text-muted);">No Accounting Entry. "Ordered Qty" in stock reports is updated.</p>
        </div>

        <!-- Step 3: Purchase Receipt / GRN -->
        <div class="workflow-step highlight">
          <span class="badge grn">3. Purchase Receipt / GRN (Stock Arrived)</span>
          <p><strong>Urdu Analogy:</strong> Laptops physically godown mein deliver ho gaye. Manager ne unhe check kar ke system mein entry kar li. Laptops hamara **Asset** ban gaye, lekin abhi supplier ka final official bill nahi aaya.</p>
          <p><strong>Professional Concept:</strong> Goods Receipt Note (GRN) records the physical arrival of inventory. It increases the stock asset value and creates a temporary offset liability since the supplier bill is pending.</p>
          
          <div class="ledger-box">
            <strong>Accounting Entry (GL Posting):</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Stock In Hand (Asset)</td><td>Rs 400,000</td><td></td></tr>
              <tr class="cr"><td>Stock Received But Not Billed (Temp Liability)</td><td></td><td>Rs 400,000</td></tr>
            </table>
            <p class="description">Increases inventory value on the Balance Sheet. Creates a temporary liability to track goods that have arrived but haven't been invoiced.</p>
          </div>
        </div>

        <!-- Step 4: Purchase Invoice -->
        <div class="workflow-step highlight">
          <span class="badge invoice">4. Purchase Invoice (Supplier Bill)</span>
          <p><strong>Urdu Analogy:</strong> Supplier ne hume official bill bhej diya. Hamare Accounts Department ne is bill ko system mein charha diya. Ab temporary liability khatam ho kar legal liability (Payable) ban gayi.</p>
          <p><strong>Professional Concept:</strong> The official billing document from the supplier. It clears the temporary 'Stock Received But Not Billed' liability and establishes the legal payable (Creditors) balance.</p>
          
          <div class="ledger-box">
            <strong>Accounting Entry (GL Posting):</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Stock Received But Not Billed (Temp Liability)</td><td>Rs 400,000</td><td></td></tr>
              <tr class="cr"><td>Creditors / Accounts Payable (Liability)</td><td></td><td>Rs 400,000</td></tr>
            </table>
            <p class="description">Clears the temporary ledger holding account. Establishes the formal legal debt (liability) to the supplier.</p>
          </div>
        </div>

        <!-- Step 5: Payment Entry -->
        <div class="workflow-step highlight">
          <span class="badge payment">5. Payment Entry (Settlement)</span>
          <p><strong>Urdu Analogy:</strong> Humne supplier ko bank check ya cash de kar uske paise chukaye (payable clear kiya).</p>
          <p><strong>Professional Concept:</strong> Settle the outstanding payable by transferring funds from the bank or cash ledger accounts to the supplier.</p>
          
          <div class="ledger-box">
            <strong>Accounting Entry (GL Posting):</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Creditors / Accounts Payable (Liability)</td><td>Rs 400,000</td><td></td></tr>
              <tr class="cr"><td>Bank / Cash Account (Asset)</td><td></td><td>Rs 400,000</td></tr>
            </table>
            <p class="description">Clears the accounts payable liability. Decreases the company's bank asset balance.</p>
          </div>
        </div>

      </div>

      <!-- Embedded Day 1 Simulator Section -->
      <h3>🎮 Day 1 Interactive Playground: Buying Simulator</h3>
      <p>Work through the Buying (P2P) cycle step-by-step. Click each action in order and see how the warehouse stocks and accounting ledgers update live!</p>
      
      <div id="day1-simulator-container">
        <!-- Day 1 Simulator will load here -->
      </div>
    `
  },
  day2: {
    title: "Day 2: Sales (Order-to-Cash)",
    category: "Learning Days",
    icon: "💵",
    content: `
      <h2>Day 2: The Order-to-Cash (O2C) Cycle</h2>
      <p>The sales process covers everything from registering a customer to shipping goods and receiving payment.</p>

      <div class="callout note">
        <h3>💡 Simple Analogy: Laptop ki Sales 💵</h3>
        <p>Aapki shop par ek customer aaya aur usne laptops ka order diya. Jab aap laptops shop se nikal kar customer ko de denge (Delivery Note), toh stock kam ho jayega aur uski cost expense (COGS) ban jayegi. Jab aap bill denge (Invoice), toh customer se payable asset banega aur sales revenue book hogi. Payment aane par cash barhega aur customer ka payable clear hoga.</p>
      </div>

      <h3>The 4 Transaction Steps (Scenario: Selling 5 Laptops @ Rs 60,000 each)</h3>

      <div class="workflow-container">
        
        <!-- Step 1: Sales Order -->
        <div class="workflow-step">
          <span class="badge po">1. Sales Order (Customer Commitment)</span>
          <p><strong>Urdu Analogy:</strong> Customer kehta hai: <em>"Mujhe 5 laptops chahiye, main kal lekar jaunga."</em> Hum Sales Order book kar ke 5 laptops lock kar dete hain takay koi aur na khareed sake.</p>
          <p><strong>Professional Concept:</strong> A customer agreement confirming order details. No ledger entries are made. It reserves stock quantity to prevent double-allocation.</p>
          <p class="description" style="font-style: italic; color: var(--text-muted);">No Accounting Entry. "Reserved Qty" in stock reports is updated.</p>
        </div>

        <!-- Step 2: Delivery Note -->
        <div class="workflow-step highlight">
          <span class="badge grn">2. Delivery Note (Stock Outflow)</span>
          <p><strong>Urdu Analogy:</strong> Laptops physically dukan se nikal kar customer ki gaari mein rakh diye gaye. Ab stock asset kam ho gaya aur laptops ki purchase cost **Cost of Goods Sold (COGS)** expense ban gayi.</p>
          <p><strong>Professional Concept:</strong> Records the physical delivery of inventory. It reduces the Stock Asset and increases the COGS expense ledger (matching principle).</p>
          
          <div class="ledger-box">
            <strong>Accounting Entry (GL Posting):</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Cost of Goods Sold (COGS - Expense)</td><td>Rs 200,000</td><td></td></tr>
              <tr class="cr"><td>Stock In Hand (Asset) <span style="font-size:0.75rem;color:var(--text-muted);">(Purchased @ Rs 40k each)</span></td><td></td><td>Rs 200,000</td></tr>
            </table>
            <p class="description">Decreases Stock Asset. Records the original cost (Rs 40,000 each) as an expense to calculate correct profit margin later.</p>
          </div>
        </div>

        <!-- Step 3: Sales Invoice -->
        <div class="workflow-step highlight">
          <span class="badge invoice">3. Sales Invoice (Customer Bill)</span>
          <p><strong>Urdu Analogy:</strong> Humne customer ko Rs 60,000 ke selling rate se bill bana kar de diya. Ab customer se paise lena hamara **Asset** (Debtors) ban gaya, aur hamari **Sales Revenue** income book ho gayi.</p>
          <p><strong>Professional Concept:</strong> The formal bill to the customer. Recognizes income and establishes the legal receivable asset balance.</p>
          
          <div class="ledger-box">
            <strong>Accounting Entry (GL Posting):</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Debtors / Accounts Receivable (Asset)</td><td>Rs 300,000</td><td></td></tr>
              <tr class="cr"><td>Sales Revenue (Income)</td><td></td><td>Rs 300,000</td></tr>
            </table>
            <p class="description">Increases the company's receivable asset. Recognizes the total sales value (Rs 60,000 each) as business income.</p>
          </div>
        </div>

        <!-- Step 4: Payment Entry -->
        <div class="workflow-step highlight">
          <span class="badge payment">4. Payment Entry (Cash Receipt)</span>
          <p><strong>Urdu Analogy:</strong> Customer ne payment kar di (cash de diya ya bank transfer kiya). Customer ka balance clear ho gaya aur dukan mein cash barh gaya.</p>
          <p><strong>Professional Concept:</strong> Records the receipt of payment, clearing the customer receivable balance and increasing cash or bank assets.</p>
          
          <div class="ledger-box">
            <strong>Accounting Entry (GL Posting):</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Bank / Cash Account (Asset)</td><td>Rs 300,000</td><td></td></tr>
              <tr class="cr"><td>Debtors / Accounts Receivable (Asset)</td><td></td><td>Rs 300,000</td></tr>
            </table>
            <p class="description">Increases cash assets. Clears the customer receivable debt.</p>
          </div>
        </div>

      </div>

      <!-- Embedded Day 2 Simulator Section -->
      <h3>🎮 Day 2 Interactive Playground: Sales Simulator</h3>
      <p>Play through the Sales (O2C) cycle. Deliver laptops, bill the customer, collect payment, and view how stock levels, COGS, and Sales accounts change live!</p>
      
      <div id="day2-simulator-container">
        <!-- Day 2 Simulator will load here -->
      </div>
    `
  },
  day3: {
    title: "Day 3: Stock Entries & Dimensions",
    category: "Learning Days",
    icon: "📦",
    content: `
      <h2>Day 3: Stock Transactions & Accounting Dimensions</h2>
      <p>Today we explored the ERPNext Stock module, covering the three core Stock Entry types—Material Issue, Material Transfer, and Material Receipt—along with Accounting Dimensions for advanced financial tracking.</p>

      <div class="callout note">
        <h3>💡 Simple Analogy: Internal Movements & Tags 🧩</h3>
        <p><strong>Stock Movements:</strong> Har bar stock dukan se bahar bechne ke liye ya khareedne ke liye move nahi hota. Agar laptop damage ho jaye ya staff ko dena ho toh **Material Issue** (Expense) karte hain. Agar ek godown se dusre godown bhejna ho toh **Material Transfer** (Location shift) karte hain. Agar koi extra item audit mein mile toh **Material Receipt** (Gain) karte hain.</p>
        <p><strong>Dimensions (Tags):</strong> Agr humein track karna ho ke computer expenses kis department ne kiya (HR ne ya Marketing ne), toh COA mein alag accounts kholne ki zaroorat nahi. Hum ek **Department Dimension (Tag)** laga dete hain!</p>
      </div>

      <h3>1. Core Stock Entries</h3>
      <p>Stock Entries are used to record physical inventory movements that are not directly driven by a standard Purchase or Sales cycle:</p>

      <div class="grid-card">
        <div class="card">
          <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📤</div>
          <h4>Material Issue</h4>
          <p>Used to issue stock out of the warehouse for internal company use (e.g., R&D testing, employee laptops, office stationery, or scrapping damaged inventory).</p>
        </div>
        <div class="card">
          <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚚</div>
          <h4>Material Transfer</h4>
          <p>Used to move goods internally between warehouses (e.g., raw materials from Stores to Production, or finished goods from Plant to Retail Store).</p>
        </div>
        <div class="card">
          <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📥</div>
          <h4>Material Receipt</h4>
          <p>Used to receive stock into a warehouse without buying it from a supplier (e.g., opening stock balances, free samples, or surplus found during inventory audit).</p>
        </div>
      </div>

      <h3>2. Stock Workflows & Ledger Entries (Scenario: 10 Laptops @ Rs 50,000 each)</h3>
      
      <div class="workflow-container">
        
        <!-- Material Issue -->
        <div class="workflow-step highlight">
          <span class="badge po">1. Material Issue Scenario</span>
          <p><strong>Scenario:</strong> Issuing 10 laptops (value Rs 50,000 each) from Stores Warehouse for the Marketing Department team.</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account [Dimension]</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Computer & IT Expense (Expense) <span style="font-size: 0.8rem; color: var(--accent-color);">[Marketing Dept]</span></td><td>Rs 500,000</td><td></td></tr>
              <tr class="cr"><td>Stock In Hand (Asset - Stores)</td><td></td><td>Rs 500,000</td></tr>
            </table>
            <p class="description">Stock asset decreases by Rs 500,000. The value of the 10 laptops is charged to Computer & IT Expense and tagged under the Marketing Department dimension.</p>
          </div>
        </div>

        <!-- Material Transfer -->
        <div class="workflow-step highlight">
          <span class="badge grn">2. Material Transfer Scenario</span>
          <p><strong>Scenario:</strong> Transferring 10 laptops (value Rs 50,000 each) from Central Warehouse to Retail Shop Warehouse.</p>
          <div class="ledger-box">
            <strong>Accounting / Stock Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Stock In Hand (Asset - Retail Shop)</td><td>Rs 500,000</td><td></td></tr>
              <tr class="cr"><td>Stock In Hand (Asset - Central Warehouse)</td><td></td><td>Rs 500,000</td></tr>
            </table>
            <p class="description"><strong>Standard Transfer:</strong> The total inventory value under "Stock In Hand" remains Rs 500,000 overall on the company Balance Sheet. Only stock ledger quantities and locations are updated. (No GL posting is created unless crossing company boundaries or incurring transit/freight costs).</p>
          </div>
        </div>

        <!-- Material Receipt -->
        <div class="workflow-step highlight">
          <span class="badge rfq">3. Material Receipt Scenario</span>
          <p><strong>Scenario:</strong> Receiving 10 laptops (valuation Rs 50,000 each) into Stores Warehouse as opening stock (or finding them during physical stock audit verification).</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Stock In Hand (Asset - Stores)</td><td>Rs 500,000</td><td></td></tr>
              <tr class="cr"><td>Stock Adjustment / Gain Account (Income/Expense)</td><td></td><td>Rs 500,000</td></tr>
            </table>
            <p class="description">Inventory asset increases by Rs 500,000, offsetting the gain to Stock Adjustment (or a temporary opening account if uploading opening balance).</p>
          </div>
        </div>

      </div>

      <h3>3. Accounting Dimensions</h3>
      <p>Accounting Dimensions in ERPNext are custom tags that can be attached to financial transactions, allowing companies to perform multi-dimensional financial reporting without bloating the Chart of Accounts.</p>

      <div class="callout note" style="margin-top: 1.5rem;">
        <h3>💡 Chart of Accounts Inflation vs. Dimensions</h3>
        <p>Instead of creating duplicate ledger accounts for every branch or department (e.g., <em>Office Expense - HR</em>, <em>Office Expense - Sales</em>, <em>Office Expense - Engineering</em>), you create a single <strong>Office Expense</strong> account and define <strong>Department</strong> as an Accounting Dimension. Transactions are then tagged on the fly.</p>
      </div>

      <h4>How Dimensions Work in ERPNext:</h4>
      <ul>
        <li><strong>Standard Dimensions:</strong> Cost Center and Project are pre-built dimensions available in almost all financial transactions.</li>
        <li><strong>Custom Dimensions:</strong> You can create custom dimensions from any Master Doctype (e.g., <em>Branch</em>, <em>Department</em>, <em>Sales Person</em>, or <em>Market Segment</em>).</li>
        <li><strong>Ledger Integration:</strong> When posting a Stock Entry, Sales Invoice, or Purchase Invoice, you select the appropriate dimension (e.g., tag the Material Issue of office chairs to the <code>HR Department</code>).</li>
        <li><strong>Financial Reporting:</strong> You can instantly filter the General Ledger, Profit & Loss Statement, and Balance Sheet by any dimension to analyze profitability by department, branch, or team.</li>
      </ul>

      <!-- Embedded Day 3 Simulator Section -->
      <h3>🎮 Day 3 Interactive Playground: Stock & Dimensions Simulator</h3>
      <p>Create Stock Entries (Issues, Receipts, Transfers), allocate them to Departments, and monitor how they physically move between Warehouses and post to the General Ledger!</p>
      
      <div id="day3-simulator-container">
        <!-- Day 3 Simulator will load here -->
      </div>
    `
  },
  day4: {
    title: "Day 4: CRM (Customer Relationship Management)",
    category: "Learning Days",
    icon: "🤝",
    content: `
      <h2>Day 4: Customer Relationship Management (CRM)</h2>
      <p>CRM is the pre-sales cycle in ERPNext. It manages potential customer interactions, converts cold leads into qualified opportunities, and issues formal price Quotations before handing off to the Sales Order cycle.</p>

      <div class="callout note">
        <h3>💡 Simple Analogy: Customer Ki Inquiry Se Deal Final hone tak 🤝</h3>
        <p>Sochiye ek banda aapki shop par phone karta hai aur puchta hai: <em>"Mujhe apni office ke liye 10 Laptops chahiye, kya rate denge?"</em> Pehle wo sirf ek <strong>Lead</strong> hai. Phir baat aage barhti hai toh wo <strong>Opportunity</strong> banti hai. Jab hum unhe official rate-card bhejte hain toh wo <strong>Quotation</strong> hota hai. Jab wo offer accept kar le, toh deal **Win** ho jati hai aur wo Sales Order (Day 2) ban jati hai!</p>
      </div>

      <h3>The Pre-Sales Pipeline (CRM Flow)</h3>
      
      <div class="workflow-container">
        
        <!-- Step 1: Lead -->
        <div class="workflow-step">
          <span class="badge request">1. Lead (Inquiry)</span>
          <p><strong>Urdu Analogy:</strong> Ek naya banda jiska contact number aur requirement aap note kar lete hain takay sales team follow-up kar sake.</p>
          <p><strong>Professional Concept:</strong> Any individual or organization interested in your products. Contains contact details, lead source (Website, Phone, Campaign), and status (Open, Contacted, Converted).</p>
          <p class="description" style="font-style: italic; color: var(--text-muted);">No accounting or stock impact.</p>
        </div>

        <!-- Step 2: Opportunity -->
        <div class="workflow-step">
          <span class="badge po">2. Opportunity (Qualified Prospect)</span>
          <p><strong>Urdu Analogy:</strong> Salesperson customer se baat karke confirm karta hai ke ye serious buyer hai. Probability set hoti hai (e.g. 70% chance) aur total deal value estimate hoti hai (Rs 600,000).</p>
          <p><strong>Professional Concept:</strong> A qualified lead showing genuine buying intent. Tracks estimated opportunity amount, closing date, and probability percentage.</p>
          <p class="description" style="font-style: italic; color: var(--text-muted);">No accounting or stock impact. Used for Sales Forecasting reports.</p>
        </div>

        <!-- Step 3: Quotation -->
        <div class="workflow-step highlight">
          <span class="badge quotation">3. Quotation (Formal Offer Letter)</span>
          <p><strong>Urdu Analogy:</strong> Customer ko official formal proposal PDF bhejna: <em>"10 Laptops @ Rs 60,000 each = Total Rs 600,000 (Validity: 7 Days)."</em></p>
          <p><strong>Professional Concept:</strong> A formal price commitment sent to the customer specifying items, rates, taxes, payment terms, and validity period.</p>
          <p class="description" style="font-style: italic; color: var(--text-muted);">No GL entry or stock change. Legal offer valid until expiry date.</p>
        </div>

        <!-- Step 4: Convert to Sales Order -->
        <div class="workflow-step highlight">
          <span class="badge payment">4. Convert to Sales Order (Deal Won! 🤝)</span>
          <p><strong>Urdu Analogy:</strong> Customer offer accept kar leta hai aur keh deta hai: <em>"Done! Order final hai."</em> System auto-convert kar ke ise Sales Order (Day 2) bana deta hai.</p>
          <p><strong>Professional Concept:</strong> Clicking "Create Sales Order" converts the Quotation into a confirmed binding sales contract, locking in inventory and starting the Order-to-Cash cycle.</p>
        </div>

      </div>

      <!-- Embedded Day 4 Simulator Section -->
      <h3>🎮 Day 4 Interactive Playground: CRM Pipeline Simulator</h3>
      <p>Test the pre-sales pipeline! Create a Lead, nurture them into an Opportunity, generate an official Quotation, and win the deal to auto-trigger the Sales Order!</p>
      
      <div id="day4-simulator-container">
        <!-- Day 4 Simulator will load here -->
      </div>
    `
  }
};

