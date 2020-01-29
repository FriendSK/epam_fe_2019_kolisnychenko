global.ABSPATH = __dirname;
global.INCPATH = ABSPATH + '/libs';
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const routes = require('./routes');
const config = require(INCPATH + '/config');
const log = require(INCPATH + '/log')(module);
const swaggerDocument = YAML.load('./config/swagger.yaml');

const app = express();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.use('/api', routes);

app.listen(config.get('port'), () => {
  log.info('Server start running on port ' + config.get('port'));
});
