# KIDS-FIRST-v2
Second version of the app.

KIDS FIRST is a co-parenting app that aspires to give divorced parents a fair and practical tool to schedule child custody without conflict. Co-parenting requires a significant level of communication and cooperation, which can be a challenge for divorced parents that rather not speak with each other. Lack of communication leads to parents arguing and studies have shown this can negatively affect their child's upbringing and development.

## Requirements:
- Node v18
- MongoDB connection

<h3>Installation Instructions:</h3>

pull repository from GitHub


###Backend: 
0. Open `backend` folder
1. Install dependencies: `npm i`
2. Configure connection with Mongo DB
3. Copy file `.env.example` and rename it to `.env.local`. Or run this command: `cp .env.example .env.local`.
4. Open your `.env.local` file
4. Edit `MONGODB_URI` variable and set it to the value of your MongoDB connection string 
5. Run `npm run start`


###Frontend:

0. Open `frontend` folder
1. Install dependencies by running `npm i`
2. Run `npm run start`

Create your own branch and use it while developing your code.
