const config = require('../config/dbConfig.js')
const { Pool } = require('pg');
const pool = new Pool (config);

// const getTwoReviews = (req, res) => {
//     pool.query('SELECT * FROM review WHERE id < 3', (err, results) => {
//         if (err) {
//             console.log('error in getTwoReviews', err);
//             res.sendStatus(500);
//         }
//         res.json(results.rows);
//     })
// }

const sortNewest = (id, res) => {
  
    const text = `SELECT * FROM review WHERE product_id = $1`;
    const values = [id];
  pool.query(text, values)
    .then((results) => {
      noReportedArr = results.rows.filter((review) => review.reported === false);
      const sorted = noReportedArr.sort((a, b) => {
        return a.post_data - b.post_date;
      })
      res.json(sorted)
    })
    .catch((err) => {
      console.log('err in newest', err);
      res.sendStatus(500);
    });
      
  
}

const sortHelpful = (id, res) => {
  const query = {
    text: `SELECT * FROM review WHERE product_id = $1`,
    values: [ id ]
  }
  pool
    .query(query)
    .then((results) => {
        noReportedArr = results.rows.filter((review) => review.reported === false);
        const sorted = noReportedArr.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
        })
        res.json(sorted)
        })
    .catch((err) => {
      console.log('err in sortHelpful', err);
      res.sendStatus(500);
    });
}

const sortRelevant = (id, res) => {
  const query = {
      text: `SELECT * FROM review WHERE product_id = $1`,
      values: [ id ]
  }
  pool
    .query(query)
    .then((results) => {
        let relevant = [];
        relevantArr = results.rows.filter((review) => review.reported === false);
        relevantArr.forEach((review) => {
            if (review.recommend === true) {
                relevant.push(review);
            }
        })
        const sorted = relevant.sort((a, b) => {
            return b.helpfulness - a.helpfulness;
        })
        res.json(sorted);
    })
    .catch((err) => {
        console.log('err in sortRelevant', err);
        res.sendStatus(500);
    });
}

const getMetaData = (id, res) => {
    rAndRquery = {
        text: 'Select recommend, rating FROM review WHERE product_id = $1',
        values: [id]
    }
    pool.query(rAndRquery.text, rAndRquery.values)
      .then((results) => {
        let resultsObj = {
            ratings: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
            },
            recommend: {
                0: 0
            }
        };
         results.rows.forEach((review) => {
             if (review.recommend) {
                 resultsObj.recommend[0]++;
             }
             if (review.rating === 1) {
                 resultsObj.ratings[1]++;
             }
             if (review.rating === 2) {
                resultsObj.ratings[2]++;
            }
            if (review.rating === 3) {
                resultsObj.ratings[3]++;
            }
            if (review.rating === 4) {
                resultsObj.ratings[4]++;
            }
            if (review.rating === 5) {
                resultsObj.ratings[5]++;
            }
         })
        return resultsObj;
      })
      .then((results) => {
        let resultsObj = results;
        query = {
            text: `SELECT c.character_name, cr.char_value, cr.characteristic_id FROM characteristic c
            INNER JOIN characteristic_review cr ON c.id = cr.characteristic_id WHERE product_id = $1`,
            values: [id]
        }
        pool.query(query.text, query.values)
            .then((results) => {        
                let characteristics = {};
                results.rows.forEach((row) => {
                    if (characteristics[row.character_name]) {
                    characteristics[row.character_name].value = (characteristics[row.character_name].value + row.char_value) / 2;
                    } else {
                        characteristics[row.character_name] = {};
                        characteristics[row.character_name].id = row.characteristic_id;
                        characteristics[row.character_name].value = row.char_value;
                    }
                })
                resultsObj.characteristics = characteristics;
                res.send(resultsObj)
                })
        })
      .catch((err) => {
          console.log('err in getMeta', err);
          res.sendStatus(500);
      })
}

module.exports = {
    // getTwoReviews,
    sortHelpful,
    sortRelevant,
    sortNewest,
    getMetaData
}