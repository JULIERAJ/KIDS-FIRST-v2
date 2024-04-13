# KIDS-FIRST-v2
Second code version of the app.

KIDS FIRST is a co-parenting app that aspires to give divorced parents a fair and practical tool to schedule child custody without conflict. Co-parenting requires a significant level of communication and cooperation, which can be a challenge for divorced parents that rather not speak with each other. Lack of communication leads to parents arguing and studies have shown this can negatively affect their child's upbringing and development.

## Requirements:
- Node (at least the 14th version)
- MongoDB connection

<h3>Installation Instructions:</h3>

1. pull repository from GitHub
2. Open folder and run `npm i`

<h4>Backend:</h4>

3. Open `backend` folder
4. Install dependencies: `npm i`
5. Configure a MongoDB connection [install demo](https://drive.google.com/file/d/1oU_xFIpGq9Il0aLjSJezifT7o68jkpgs/view)
6. Copy file `.env.example` and rename it to `.env.local`. Or run this command: `cp .env.example .env.local`.
7. Open your `.env.local` file
8. Edit `MONGODB_URI` variable and set it to the value of your MongoDB connection string 
9. Run `npm run start`

<h4>Frontend:</h4>

10. Open `frontend` folder
11. Install dependencies by running `npm i`
12. Copy file `.env.example` and rename it to `.env.local`. Or run this command: `cp .env.example .env.local`.
13. Add environment credentials to the `.env.local` (ask other devs)
14. Run `npm run start`

Create your own branch and use it while developing your code.
