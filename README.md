# Equal Experts Grocery List challenge

To get things up and running quickly I decided to use Next.js with Jest https://nextjs.org/docs/app/building-your-application/testing/jest . I find setting things up can take away from that precious development time!

Instructions version: 5b8d0fd276b6d288905ed2f63a934e057e8feca2

## Setup
Once you have cloned the repository:
```
git clone https://github.com/richmoh/groceries-nextjs-jest
cd groceries-nextjs-jest
```

install dependancies: 

```
npm install
```

and copy the .env file from the example
```
cp ./example.env ./.env
```

The app uses SQLite as its database and the .env file sets the location of the `dev.db` file. Prisma ORM was used to help speed up development. You'll fine `dev.db` and the `schema.prisma` files in ./prisma.

To update the database with the latest schema, you will need to run: 
```
npx prisma db push
```
This generates the `dev.db` file.

### Running the app

Thanks to Next.js the front end and back end can be started using the following command: 
```
npm run dev
```

The tests can be run with: 
```
npm run test
```

### Compromises made

Due to the time constraints you will notice that no time was spared for some of the more "advanced" features .. If you can count an deleting item as an advanced feature of course! 
- Lists are created with a basic name "List 1", "List 2" etc. You cannot write your own names for each list.
- You cannot delete grocery lists.
- You cannot delete items.
- I would have liked to view each grocery list in the centre of the page when they are clicked. I didn't have time to add this extra step.