import axios from "axios";
import {computed, onMounted, ref} from "vue";

export default async function usePosts(limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostsLoading = ref(true);

    const fetchingPosts = async () => {
        console.log("ASDASSDSDFSDFGSDFGSDFGSDFGDFGNDGDFNTW");
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _page: 1,
                    _limit: limit
                },
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / this.limit);
            posts.value = response.data;
            console.log("фывфывфывфыв")
            console.log(posts);
        } catch (e) {
            alert("Error" + e.message);
        } finally {
            isPostsLoading.value = false;
        }
    };
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    onMounted(fetchingPosts); // не работает, просто не вызывает
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");

    return {
        posts,
        isPostsLoading,
        totalPages
    }
}