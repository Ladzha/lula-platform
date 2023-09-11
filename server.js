import  express  from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import { audioRouter } from './routers/audioRouter.js';
import { avatarRouter} from './routers/avatarRouter.js';
import { commentRouter } from './routers/commentRouter.js';
import { imgRouter } from './routers/imgRouter.js';
import { languageRouter } from './routers/languageRouter.js';
import { sectionRouter } from './routers/sectionRouter.js';
import { userRouter} from './routers/userRouter.js';

dotenv.config();
const app = express();
app.use(cookieParser());

const __dirname = path.resolve();
app.use("/", express.static(__dirname + "/static"));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json()) //for work with json 

app.use('/api', audioRouter);
app.use('/api', avatarRouter);
app.use('/api', commentRouter);
app.use('/api', imgRouter);
app.use('/api', languageRouter);
app.use('/api', sectionRouter);
app.use('/api', userRouter);


app.get('/server', (request, response)=>{
    response.send('I am working');
})


// Save image link to the database
app.post('/api/save-image-link', async (req, res) => {
  const { imageLink } = req.body;

  try {
    const result = await db('images').insert({ link: imageLink });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(process.env.PORT, ()=>{
    console.log('I am listening') 
})

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
