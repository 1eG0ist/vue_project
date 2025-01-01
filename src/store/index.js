import {createStore} from "vuex";
import {postModule} from "@/store/modules/postModule";

export default createStore({
    modules: { // чтобы не делать мусорку из кучи обособленных данных, можно писать логику определенной части в модуле, и после подключать эти модули
        post: postModule,
    }
})