// ERPNext Learning Documentation Content
// To add a new day (e.g. Day 3), simply add a new key-value pair to this object.
// The app will automatically register it, show it in the sidebar, and make it searchable!

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

      <h3>1. Setup & Pre-requisites</h3>
      <ul>
        <li><strong>Supplier / Vendor:</strong> The entity selling you the goods.</li>
        <li><strong>Supplier Group:</strong> Classification (e.g., Local, International) used to organize ledger accounts and financial reporting.</li>
        <li><strong>Local vs. Import Accounts:</strong> 
          <ul>
            <li><em>Local Account:</em> Used for domestic suppliers. Standard local taxes (GST/VAT) are applied.</li>
            <li><em>Import Account:</em> Used for overseas suppliers. Purchases are usually zero-tax at invoicing, but require landing costs (customs, freight) added to the stock value.</li>
          </ul>
        </li>
      </ul>

      <h3>2. The Transaction Workflow (Scenario: 1,000 Laptops)</h3>
      
      <div class="workflow-container">
        <div class="workflow-step">
          <span class="badge request">1. Material Request</span>
          <p><strong>Store Manager</strong> checks inventory, sees stock is low, and requests 1,000 laptops. 
          <em>No accounting entry. Stock status updates to "Indented".</em></p>
        </div>

        <div class="workflow-step">
          <span class="badge rfq">2. Request for Quotation (RFQ)</span>
          <p>Sent to multiple suppliers asking for bids. 
          <em>No accounting or stock impact.</em></p>
        </div>

        <div class="workflow-step">
          <span class="badge quotation">3. Supplier Quotation</span>
          <p>Rates and terms submitted by suppliers are recorded for comparison. 
          <em>No accounting or stock impact.</em></p>
        </div>

        <div class="workflow-step">
          <span class="badge po">4. Purchase Order (PO)</span>
          <p>Formal contract issued to the chosen supplier detailing the agreed price for 1,000 laptops. 
          <em>No financial impact. Updates "Ordered Qty" in stock reports.</em></p>
        </div>

        <div class="workflow-step highlight">
          <span class="badge grn">5. Purchase Receipt (GRN - Goods Receipt Note)</span>
          <p>Laptops arrive physically at the warehouse. Store manager inspects and saves the receipt.</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Stock In Hand (Asset)</td><td>Rs X,XXX,XXX</td><td></td></tr>
              <tr class="cr"><td>Stock Received But Not Billed (Temp Liability)</td><td></td><td>Rs X,XXX,XXX</td></tr>
            </table>
            <p class="description">Increases stock asset and creates a temporary liability since the official bill hasn't arrived yet.</p>
          </div>
        </div>

        <div class="workflow-step highlight">
          <span class="badge invoice">6. Purchase Invoice</span>
          <p>The supplier sends the official bill. The accounts department matches it with the PO and GRN.</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Stock Received But Not Billed (Temp Liability)</td><td>Rs X,XXX,XXX</td><td></td></tr>
              <tr class="dr"><td>Tax Accounts (e.g. Input VAT)</td><td>Rs XX,XXX</td><td></td></tr>
              <tr class="cr"><td>Creditors / Accounts Payable (Liability)</td><td></td><td>Rs X,XXX,XXX</td></tr>
            </table>
            <p class="description">Clears the temporary liability and establishes the official legal payable to the supplier.</p>
          </div>
        </div>

        <div class="workflow-step highlight">
          <span class="badge payment">7. Payment Entry</span>
          <p>Finance makes payment to the supplier (via Bank, Cash, etc.).</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Creditors / Accounts Payable (Liability)</td><td>Rs X,XXX,XXX</td><td></td></tr>
              <tr class="cr"><td>Bank / Cash Account (Asset)</td><td></td><td>Rs X,XXX,XXX</td></tr>
            </table>
            <p class="description">Clears the payable liability and reduces your bank asset balance.</p>
          </div>
        </div>
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

      <h3>1. Setup & Master Data</h3>
      <ul>
        <li><strong>Customer:</strong> The entity you sell to. Can be classified as a Company (B2B) or Individual (B2C).</li>
        <li><strong>Customer Group:</strong> Categorization (e.g., Commercial, Retail) used for discount structures and revenue accounts.</li>
        <li><strong>Territory:</strong> Used for sales routing, geographical reporting, and tax determination (e.g., Pakistan).</li>
        <li><strong>Payment Terms:</strong> Define when payment is due (e.g., 50% Advance, 50% on Delivery).</li>
      </ul>

      <h3>2. The Transaction Workflow (Scenario: 10 Laptops & 10 Mobiles to Cust Shop 01)</h3>

      <div class="workflow-container">
        <div class="workflow-step">
          <span class="badge po">1. Sales Order (SO)</span>
          <p>Binding agreement confirming the customer's intent to buy.
          <em>No accounting entry. Reserves inventory to prevent double-selling.</em></p>
        </div>

        <div class="workflow-step highlight">
          <span class="badge grn">2. Delivery Note (Shipment)</span>
          <p>Goods leave the warehouse. A **Gate Pass** is printed for exit gate security.</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Cost of Goods Sold (COGS) (Expense)</td><td>Rs 700,000</td><td></td></tr>
              <tr class="cr"><td>Stock In Hand (Asset)</td><td></td><td>Rs 700,000</td></tr>
            </table>
            <p class="description">Inventory decreases on the Balance Sheet. <strong>COGS</strong> increases on the P&L to match the revenue generated.</p>
          </div>
        </div>

        <div class="workflow-step highlight">
          <span class="badge invoice">3. Sales Invoice</span>
          <p>Billing statement sent to the customer demanding payment based on the delivery.</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Debtors / Accounts Receivable (Asset)</td><td>Rs 4,500,000</td><td></td></tr>
              <tr class="cr"><td>Sales Revenue (Income)</td><td></td><td>Rs 4,500,000</td></tr>
            </table>
            <p class="description">Establishes the legal debt the customer owes. Sales Revenue is recognized under Income.</p>
          </div>
        </div>

        <div class="workflow-step">
          <span class="badge rfq">4. Payment Request</span>
          <p>A formal request with payment instructions or links sent to the customer for an outstanding amount (e.g., requesting the first 50% installment of Rs 2.25M). 
          <em>No accounting entry.</em></p>
        </div>

        <div class="workflow-step highlight">
          <span class="badge payment">5. Payment Entry (Receipt)</span>
          <p>Customer pays the first installment of Rs 2.25M via Cash.</p>
          <div class="ledger-box">
            <strong>Accounting Entry:</strong>
            <table>
              <tr><th>Account</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr>
              <tr class="dr"><td>Cash Account (Asset)</td><td>Rs 2,250,000</td><td></td></tr>
              <tr class="cr"><td>Debtors / Accounts Receivable (Asset)</td><td></td><td>Rs 2,250,000</td></tr>
            </table>
            <p class="description">Reduces the receivable asset and increases cash assets. The Sales Invoice status changes to <strong>Partially Paid</strong>.</p>
          </div>
        </div>
      </div>

      <h3>3. Taxes & Accounts</h3>
      <ul>
        <li><strong>Sales Taxes and Charges Template:</strong> Used to automate tax calculation (e.g., standard Sales 18% or Export Exempt 0%).</li>
        <li><strong>Export Exempt:</strong> International sales are typically tax-exempt. ERPNext maps these to a dedicated "Export Sales" account to report tax-free earnings separately.</li>
      </ul>
    `
  }
};
