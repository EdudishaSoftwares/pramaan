import App from '@/app';
import IndexRoute from '@routes/index.route';
import ExternalRoute from './routes/external.route';
import InternalRoute from './routes/internal.route';

const app = new App([new IndexRoute(), new ExternalRoute(), new InternalRoute()]);

app.listen();
