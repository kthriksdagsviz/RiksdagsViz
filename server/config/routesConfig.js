import packageJson from '../../package.json';
import voteringApi from '../api/votering'
import ledamoterApi from '../api/ledamoter'
import nyheterApi from '../api/nyheter'
const API_V1 = '/api/v1';

export default app => {
  app.get(API_V1, (req, res) => {
    res.json({ version: packageJson.version });
  });

  app.use(API_V1,voteringApi )
  app.use(API_V1, ledamoterApi)
  app.use(API_V1, nyheterApi);

  
};