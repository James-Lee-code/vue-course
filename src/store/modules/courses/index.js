import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
        lastFetch: null,
        courses:[
        {
          id: 'c1',
          name: 'Max',
          areas: ['多益課程', '雅思課程', '課後輔導'],
          description:
            "對於學習英文有問題，歡迎選取畫課，將在課後輔導給予協助",
          hourlyRate: 30
        },
        {
          id: 'c2',
          name: 'Julie',
          areas: ['多益課程', '課後輔導'],
          description:
            '大家常常因為現在大環境而變得比較少開口說英文，在這堂課你可以盡情地釋放對於學習英文的熱愛',
          hourlyRate: 20
        }
      ]
        }
    },
    mutations,
    actions,
    getters
}