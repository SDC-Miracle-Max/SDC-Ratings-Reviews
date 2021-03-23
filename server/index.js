const express = require('express');
const query = require('./queries.js')
const morgan = require('morgan');
// const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(morgan('dev'));

app.use(express.json());

// app.get('/api/getTwoReviews', (req, res) => {
//     const { id } = req.params;
//     console.log('id logged:', id);
//     query.getTwoReviews(req, res);
// });

app.get('/reviews/sort/:id/:sort', (req, res) => {
  const { id, sort } = req.params;
  const lowerSort = sort.toLowerCase();
  if (lowerSort === 'newest') {
      query.sortNewest(id, res);
  }
  if (lowerSort === 'relevant') {
      query.sortRelevant(id, res);
  }
  if (lowerSort === 'helpful') {
      query.sortHelpful(id, res);
  }

})

app.get('/reviews/meta/:id', (req, res) => {
    const { id } = req.params;
    query.getMetaData(id, res);
})

app.put('/reviews/:review_id/reported', (req, res) => {
    const { review_id } = req.params;
    query.reportReview(review_id, res);
})

app.put('/reviews/:review_id/helpful', (req, res) => {
    const { review_id } = req.params;
    query.helpfulReview(review_id, res);
})

app.post('/reviews', (req, res) => {
    query.reviewPost(req.body, res)
})


app.listen(PORT, () => {
    console.log(`server listening on localhost://${PORT}`)
})
