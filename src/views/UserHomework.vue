<template>
    <div v-if="event && answers" class="container bg-white">
        <div v-if="modalOpen" @click.self="redirectBack"
             class="fixed left-0 top-0 h-screen flex items-center justify-center w-screen modal-bg-color">
            <div class="bg-white w-fit text-black rounded-xl p-10">
                Your mark was successfully placed!
            </div>
        </div>
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
        <div class="mt-20">
            <div class="mb-3 text-lg">
                Your mark
            </div>
            <div class="flex gap-4">
                <input
                    class="border-lightGray focus:outline-cyan border rounded-lg p-3"
                    type="number"
                    v-model="mark"/>
                <button class="rounded-xl bg-primary hover:bg-cyan text-white p-3" @click="sendMark">
                    Submit
                </button>
            </div>
            <div v-if="checkMark" class="mt-4 text-red">
                Please put a mark
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { useRoute } from "vue-router";
    import { getDoc,updateDoc, doc } from "firebase/firestore";
    import { db, eventConverter, type CalendarEvent } from "@/firebase";
    import * as dayjs from 'dayjs'
    import FileLink from "@/components/FileLink.vue";
    import router from "@/router";


    export default defineComponent({
        name: 'UserHomework',
        components: { FileLink },
        setup() {
            const route = useRoute();
            const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
            const email = route.params.email
            const answers = ref<Array<any>>()
            const event = ref<CalendarEvent>()
            const studentUid = ref ('')
            const checkMark = ref (false)
            getDoc(doc(db, 'events', id).withConverter(eventConverter)).then((e) => {
                event.value = e.data()
                answers.value = event.value?.answers.filter((a: any) => a.email === email)
                studentUid.value = answers.value![0].uid
            })
            const mark = ref<number>();
            const modalOpen = ref(false);

            function redirectBack() {
                modalOpen.value = false;
                router.push({ path: `/main-page/homework/${id}` })
                return;
            }
            function sendMark(){
                if (mark.value){
                    checkMark.value = false
                    const docRef = doc(db, 'events', id)
                    updateDoc(docRef,{
                        [`marks.${studentUid.value}`]: mark.value
                    }).then(()=>{
                        modalOpen.value = true
                    })
                } else {
                   return checkMark.value = true
                }

            }
            return {
                id, email, answers, event, mark, dayjs, studentUid, sendMark, checkMark, modalOpen, redirectBack
            }
        }
    })
</script>

<style scoped>

</style>
