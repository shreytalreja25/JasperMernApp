const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/api/reports', (req, res) => {
  axios.get('http://localhost:8081/jasperserver/rest_v2/folders/Reports/Interactive/reports', {
    auth: {
      username: 'jasperadmin',
      password: 'jasperadmin'
    }
  })
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
