import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        voice: 'Alex',
        question: '',
        response: ''
    },

    getters: {
        voice: state => {
            return state.voice;
        },
        question: state => {
            return state.question;
        },
        response: state => {
            return state.response;
        }
    },

    mutations: {
        question: (state, question) => {
            state.question = question;
        },
        response: (state, response) => {
            state.response = response;
        }
    },

    actions: {
        setQuestion: ({commit}, payload) => {
            console.log("Set question");
            commit("question", payload);
        },
        setResponse: ({commit}, payload) => {
            commit("response", payload);
        }

    }
});