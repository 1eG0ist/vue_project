import {computed, ref} from "vue";

export default function useSortedAndSearchedPosts(sortedPosts) {
    const searchQuery = ref('');
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(sortedPosts);
    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post =>
            post.title.includes(searchQuery.value)
            || post.body.includes(searchQuery.value)
        );
    });

    return {
        searchQuery,
        sortedAndSearchedPosts,
    }
}