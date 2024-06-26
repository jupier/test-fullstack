# Staycation's Technical Test

## Launch the app

- Launch the PostgreSQL database using `docker-compose up -V`
- Launch the app using `cd staycation-app && nvm use && npm install && npm run dev`

## Launch the tests

- Launch the PostgreSQL database using `docker-compose up -V` (I've implemented some integration tests that need the database to be up)
- Launch the test using `npm install && npm run test`

It's also possible to get the test coverage using `npm run coverage`

## What I've done

1. ✅ Fetch hotels so it matches the hotel model described below
2. ✅ Display hotel cards as shown in the figure below
3. ✅ Top bar should be static while scrolling. Implement it
4. ✅ We want the Staycation logo to be centered in the top bar, as shown in the figure below. Implement it.
5. ✅ Display the aggregated review count & score for each package card
6. ✅ Display the last availability on every package price. See availability definition below
7. ✅ Take bookings into account to compute remaining stock
    - I've implemented a solution, but I've the feeling like it's not perfect especially when there is multiple openings with the same discount price but different openings date.
    - Should I take the opening date into account to compute the remaining stock? And even compute the availability?
    - Happy to discuss it.
8. ✅ If a package is not available on the current sale date, fetch its lowest opening price on the most recent sale date it has availabilites on (careful, it's a windowed lookup ;)). Display these availabilities in grey on the package card.
9. (no code) How would you implement a caching strategy for this app?
    - To discuss

## Thoughts

- I've tried to implement the algorithm with a single query to the database. Unfortunately, I've not been able to do it.
It was always a bit complicated that's why I've decided to split the logic in multiple queries. I'm not really a fan of this solution
and would be happy to discuss it.
- My testing strategy is not perfect. I've implemented some integration tests that need the database to be up. I've also implemented some unit tests.
If I had more time, I would have implemented more unit tests and less integration tests. And even some e2e tests with Cypress.
- I think using NextJs and tailwind was a good idea because it allowed me to quickly implement the app.
Everything is rendered on the server side. Another approach would have been to use more client-side rendering.

## Coding guidelines

### Do whatever you want with the code! 💪️

The code you just pulled is a minimal working frontend/backend app needed to answer the questions.
This is not required, but you can install any additional package you want and do whatever you want
with the code to show us your skills, as long as you answer the questions 😉️

### Styling

A few key points to help you through styling:

1. App must be browsable on any decent-size desktop screen
2. Paddings, margins & border radiuses have discrete values: 4px, 8px or any other multiple of 8
3. Color set is located [here](front/src/styles/colors.scss)

### Appendix

#### Expected hotel model

```json
{
  "id": 1,
  "name": "Molitor",
  "stars": 5,
  "preview": "Petit dej + piscine + ...",
  "pictureId": "<img-url>"
}
```

#### Hotel card

![hotel card](./hotel-card.png)

#### Final expected result

![final result](./final.png)

#### Availability definition

- An hotel availabilities are defined by its rooms openings (easy)
- The table `openings` has 6 interesting columns: `room_id` (malin), `sale_id`, `date`, `stock`, `price` and `discount_price`
- An hotel is bookable on a given day only if there is at least an opening for one of its room on this date and with a stock > 0
- The lowest availability on a sale period for an hotel is the available opening with the lowest `discount_price` on this given `sale_id`
- The last `sale_id` for this test is (obviously) the `sale_dates` row where the date is the latest (`id 90` in our test data)
