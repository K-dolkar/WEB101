# Project Setup Guide (Windows)

## What You Need
- Windows 10 or 11
- Internet connection
- Your Windows login password

---

## Step 1: Extract the ZIP

Download the ZIP from GitHub, right click it and select **Extract All**. Open the extracted folder.

---

## Step 2: Install Node.js

1. Go to **https://nodejs.org**
2. Download the **LTS version** (the big green button)
3. Run the installer and click Next all the way through
4. Open **Command Prompt** (press `Win + R`, type `cmd`, press Enter)
5. Check it installed correctly:

```cmd
node --version
```

It should say `v20.x.x` or higher.

---

## Step 3: Install PostgreSQL

> If you already have PostgreSQL installed and remember your password, skip to Step 4.

1. Go to **https://www.postgresql.org/download/windows/**
2. Click **Download the installer**
3. Run the installer
4. When it asks for a **password**, set it to something you will remember — for example: `password123`
5. Leave the port as `5432`
6. Finish the installation

---

## Step 4: Create the Database

1. Press `Win + S` and search for **pgAdmin 4** — open it (it comes with PostgreSQL)
2. It will ask for a **master password** — set one if it asks
3. On the left panel, click **Servers** → **PostgreSQL** → enter your postgres password from Step 3
4. Right click on **Databases** → **Create** → **Database**
5. In the **Database** field type: `tiktok`
6. Click **Save**

---

## Step 5: Update the `.env` File

Open `TikTok_Server-main\.env` in Notepad. It looks like this:

```
PORT=8001
NODE_ENV=development
DATABASE_URL="postgresql://namgyel:password123@localhost:5432/tiktok?schema=public"
JWT_SECRET=supersecretjwtkey123456789
JWT_EXPIRE=30d
```

Change the `DATABASE_URL` line to use `postgres` as the user and the password you set in Step 3:

```
DATABASE_URL="postgresql://postgres:password123@localhost:5432/tiktok?schema=public"
```

> On Windows, PostgreSQL is installed with the user `postgres` by default — so just use `postgres` as the username.

---

## Step 6: Install Dependencies and Set Up the Database

Open **Command Prompt** inside the extracted folder.

### Backend

```cmd
cd TikTok_Server-main
npm install
npx prisma migrate deploy
```

You should see at the end:

```
All migrations have been successfully applied.
```

### Frontend

```cmd
cd ..\TikTok_Frontend-main
npm install
```

---

## Step 7: Start Both Servers

You need **two Command Prompt windows open at the same time**.

### Window 1 — Backend

```cmd
cd TikTok_Server-main
npm run dev
```

You should see:

```
Server running on port http://localhost:8001
```

### Window 2 — Frontend

```cmd
cd TikTok_Frontend-main
npm run dev
```

You should see:

```
Local: http://localhost:3000
```

---

## Step 8: Open in Browser

Go to **http://localhost:3000**

Register an account, upload a video, and test it out.

---

## Common Problems

| Problem | Fix |
|---|---|
| `node` is not recognized | Restart Command Prompt after installing Node.js |
| `prisma` is not recognized | Make sure you ran `npm install` first |
| Password authentication failed | The password in DATABASE_URL does not match what you set during PostgreSQL installation |
| `database tiktok does not exist` | You skipped Step 4 — create the database in pgAdmin first |
| Port already in use | Something else is running on that port — restart your laptop and try again |
| `Cannot find module` | Run `npm install` again in the correct folder |
