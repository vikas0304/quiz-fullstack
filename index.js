import app from './app.js';
import { PORT } from './utils/config.js';
import { info, errors } from './utils/logger.js';


app.get('/' , (req , res) => {
    res.send('<h1>Vikas Pal API</h1>')
})

app.listen(PORT, () => {
    info(`Server is running at http://localhost:${PORT}`);
});
