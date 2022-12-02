# KIDS-FIRST-v2
Second version of the app.

KIDS FIRST is a co-parenting app that aspires to give divorced parents a fair and practical tool to schedule child custody without conflict. Co-parenting requires a significant level of communication and cooperation, which can be a challenge for divorced parents that rather not speak with each other. Lack of communication leads to parents arguing and studies have shown this can negatively affect their child's upbringing and development.

## Requirements:
- Node (at least the 14th version)
- MongoDB connection

<h3>Installation Instructions:</h3>

0. Pull repository from GitHub

<h4>Backend:</h4>

1. Open `backend` folder
2. Install dependencies: `npm i`
3. Configure connection with Mongo DB
4. Copy file `.env.example` and rename it to `.env.local`. Or run this command: `cp .env.example .env.local`.
5. Open your `.env.local` file
6. Edit `MONGODB_URI` variable and set it to the value of your MongoDB connection string 
7. Run `npm run start`


<h4>Frontend:</h4>

1. Open `frontend` folder
2. Install dependencies by running `npm i`
3. Run `npm run start`

Create your own branch and use it while developing your code.
