import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: true,
        selectedSort: '',
        sortOptions: [
            {value: 'title', name: 'Название'},
            {value: 'body', name: 'Содержимое'}
        ],
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPages: 0
    }),
    getters: {
        sortedPosts(state) { // возвращается отсортированный массив, не мутируя исходный
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndFilteredPosts(state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.includes(state.searchQuery)
                || post.body.includes(state.searchQuery)
            );
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setIsPostsLoading(state, isPostsLoading) {
            state.isPostsLoading = isPostsLoading;
        },
        setSelectedSort(state, sort) {
            state.selectedSort = sort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPage(state, totalPages) {
            state.totalPages = totalPages;
        }

    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setIsPostsLoading', true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    },
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
            } catch (e) {
                alert("Error" + e.message);
            } finally {
                commit('setIsPostsLoading', false);
            }
        },

        async loadPage({state, commit}) {
            try {
                commit('setPage', state.page + 1);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    },
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
                console.log("from module posts")
            } catch (e) {
                alert("Error" + e.message);
            }
        }
    },
    namespaced: true,
}