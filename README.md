# Saucy Chef 🍳

**Saucy Chef** is a full-stack web application that allows users to explore a wide variety of recipes, craft custom weekly meal plans, and export ingredients into a downloadable Excel spreadsheet. It also includes an admin dashboard for managing users and recipe content.

**Saucy Chef** on Render 
https://saucy-chef.onrender.com/
---

## 📸 Preview

![Portfolio Preview](/public/uploads/siteImage.png)  

---

## 🚀 Features

- 🔍 **Recipe Browsing & Filtering**  
  Easily find recipes by category, ingredients, or dietary preference.

- 📅 **Weekly Meal Planning**  
  Plan your meals for the week using an intuitive drag-and-drop or selection interface.

- 📄 **Excel Exporting**  
  Generate a formatted Excel file of all the ingredients in your meal plan using [ExcelJS](https://github.com/exceljs/exceljs).

- 🛠️ **Admin Dashboard**  
  Admins can manage users, approve or remove recipes, and moderate content.

---

## 🧰 Built With

- **[Next.js](https://nextjs.org/)** – React framework for high-performance web apps  
- **Node.js** – Backend runtime environment  
- **MongoDB** – Flexible NoSQL database  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **JSX** – Declarative UI component syntax  
- **ExcelJS** – JavaScript library for Excel spreadsheet generation

---

# 📦 Project Dependencies

## Root `package.json` Dependencies

- bcryptjs `^3.0.2`
- clsx `^2.1.1`
- concurrently `^9.1.2`
- cors `^2.8.5`
- dotenv `^16.5.0`
- exceljs `^4.4.0`
- express `^5.1.0`
- file-saver `^2.0.5`
- filesaver `^0.0.13`
- jsonwebtoken `^9.0.2`
- lucide-react `^0.511.0`
- mongoose `^8.15.0`
- morgan `^1.10.0`
- next `15.3.2`
- react `^19.1.0`
- react-dom `^19.1.0`
- react-icons `^5.5.0`
- router `^2.2.0`

## Root `package.json` DevDependencies

- @eslint/eslintrc `^3`
- @tailwindcss/postcss `^4`
- eslint `^9`
- eslint-config-next `15.3.2`
- tailwindcss `^4`

---

## 🔧 Backend `package.json` Dependencies

- bcryptjs `^3.0.2`
- cors `^2.8.5`
- dotenv `^16.5.0`
- express `^5.1.0`
- jsonwebtoken `^9.0.2`
- mongoose `^8.15.0`
- morgan `^1.10.0`
- multer `^1.4.5-lts.2`
- nodemailer `^7.0.3`
- nodemon `^3.1.10`
- path `^0.12.7`

# 📦 Installation

### Clone the repository

```bash
git clone https://github.com/YourUsername/saucy-chef.git
cd saucy-chef
```

### Install root dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### Create a `.env` file in the backend directory

```env
MONGO_URI="your mongodb database"
JWT_SECRET="mysecretkey1234"
EMAIL_USER = "your email"
EMAIL_PASS = "your email password"
CLIENT_URL=http://localhost:3000
ADMIN_PASSWORD=123
```

### Run both frontend and backend (in separate terminals or with concurrently)

```bash
npm run dev     # Frontend
npm run backend # Backend
```

### Navigate to

```
http://localhost:3000
```

# 🧪 Testing

To be added – testing instructions or link to documentation.

# ✍️ Authors

- DanielFreeman068  
- sshafe928  
- oakuopus

# 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

