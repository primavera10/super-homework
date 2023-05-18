<template>
    <div v-if="event && answers" class="container">
        <router-link :to="`/main-page/homework/${id}`" class="block mt-4 underline cursor-pointer">
            Go back
        </router-link>
        <div class="text-3xl font-bold text-primary mt-10">
            Check homework for {{ dayjs(event.date).format('DD/MM/YYYY HH:mm') }}
        </div>
        <div class="text-xl text-darkGray mt-4">
            Student {{ email }}
        </div>
        <div class="mt-10 border border-lightGray p-4 rounded-lg">
            <ul class="list-image-none">
                <li v-for="(answer,index) in answers" :key="answer.addedAt" class="p-3"
                    :class="index > 0 ? 'border-t border-t-lightGray' : ''"
                >
                    <div class="flex justify-between" v-if="answer.message!=='-'">
                        <div>
                            {{ answer.message }}
                        </div>
                        <div>
                            {{ dayjs(answer.addedAt).format('HH:mm DD/MM/YYYY') }}
                        </div>
                    </div>
                    <div v-if="answer.documentLink.length!==0" class="flex justify-between items-center">
                        <div>
                            <file-link v-for="link in answer.documentLink" :key="link" :uid="link" class="p-2 block"/>
                        </div>
                        <div>
                            {{ dayjs(answer.addedAt).format('HH:mm DD/MM/YYYY') }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { useRoute } from "vue-router";
    import { getDoc, doc } from "firebase/firestore";
    import { db, eventConverter, type CalendarEvent } from "@/firebase";
    import * as dayjs from 'dayjs'
    import FileLink from "@/components/FileLink.vue";


    export default defineComponent({
        name: 'UserHomework',
        components: { FileLink },
        setup() {
            const route = useRoute();
            const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
            const email = route.params.email
            const answers = ref<Array<any>>()
            const event = ref<CalendarEvent>()
            getDoc(doc(db, 'events', id).withConverter(eventConverter)).then((e) => {
                event.value = e.data()
                answers.value = event.value?.answers.filter((a: any) => a.email === email)
            })
            return {
                id, email, answers, event, dayjs
            }
        }
    })
</script>

<style scoped>

</style>
