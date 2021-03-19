const config = require('../config/dbConfig.js')
const { Pool } = require('pg');
const pool = new Pool (config);

const getTwoReviews = (req, res) => {
    pool.query('SELECT * FROM review WHERE id < 3', (err, results) => {
        if (err) {
            console.log('error in getTwoReviews', err);
            res.sendStatus(500);
        }
        res.json(results.rows);
    })
}

const sortNewest = (id, res) => {
  pool.query(`SELECT * FROM review WHERE product_id = ${id}`, (err, results) => {
      if (err) {
          console.log('err in sortNewest', err);
          res.sendStatus(500);
      } else {
          const sorted = results.rows.sort((a, b) => {
              return b.post_data - a.post_date;
          })
          res.json(sorted);
      }
  })
}

const sortHelpful = (id, res) => {
  pool.query(`SELECT * FROM review WHERE product_id = ${id}`, (err, results) => {
    if (err) {
        console.log('err in sortHelpful', err);
        res.sendStatus(500);
    } else {
        console.log('helpful sort', results.row);
        const sorted = results.rows.sort((a, b) => {
            return b.helpfulness - a.helpfulness;
        })
        res.json(sorted);
    }
  })
}

const sortRelevant = (id, res) => {
  pool.query(`SELECT * FROM review WHERE product_id = ${id}`, (err, results) => {
    if (err) {
        console.log('err in sortRelevant', err);
        res.sendStatus(500);
    } else {
        let relevant = [];
        results.rows.forEach((review) => {
          if (review.recommend === true) {
             relevant.push(review) 
          }
        })
        const sorted = relevant.sort((a, b) => {
            return b.helpfulness - a.helpfulness;
        })
        res.json(sorted);
    }
  })
}

module.exports = {
    getTwoReviews,
    sortHelpful,
    sortRelevant,
    sortNewest
}