const express = require('express');
const query = require('./queries.js')
const morgan = require('morgan');
// const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(morgan('dev'));

app.use(express.json());

app.get('/api/getTwoReviews', (req, res) => {
    const { id } = req.params;
    console.log('id logged:', id);
    query.getTwoReviews(req, res);
});

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



app.listen(PORT, () => {
    console.log(`server listening on localhost://${PORT}`)
})


// REVIEWS
// app.get('/reviews/sort/:id/:sort', (req, res) => {
//     const { id, sort } = req.params;
//     const lowerSort = sort.toLowerCase();
//     const reviewsURL = `${options.url}/reviews/?product_id=${id}&count=100&sort=${lowerSort}`;
//     axios
//       .get(reviewsURL, options)
//       .then(({ data }) => res.send(data.results))
//       .catch((err) => console.log(err));
//   });
  
//   app.get('/reviews/meta/:id', (req, res) => {
//     const { id } = req.params;
//     const metaReviewsURL = `${options.url}/reviews/meta/?product_id=${id}`;
//     axios
//       .get(metaReviewsURL, options)
//       .then(({ data }) => res.send(data))
//       .catch((err) => console.log(err));
//   });
  
//   app.put('/reviews/:review_id/helpful', (req, res) => {
//     const { review_id } = req.params;
//     axios.put(`${options.url}/reviews/${review_id}/helpful`, { body: { review_id } }, options)
//       .then(() => res.send(204))
//       .catch(console.log);
//   });
  
//   app.post('/reviews', (req, res) => {
//     axios.post(`${options.url}/reviews`, req.body, options)
//       .then(() => res.send(204))
//       .catch(console.log);
//   });
  
//   app.put('/reviews/:review_id/report', (req, res) => {
//     const { review_id } = req.params;
//     axios.put(`${options.url}/reviews/${review_id}/report`, { body: { review_id } }, options)
//       .then(() => res.send(204))
//       .catch(console.log);
//   });
  