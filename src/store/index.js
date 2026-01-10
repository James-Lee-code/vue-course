import { createStore } from 'vuex';

import coursesModule from './modules/courses/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        courses: coursesModule,
        requests: requestsModule,
        auth: authModule
    }
});

export default store;