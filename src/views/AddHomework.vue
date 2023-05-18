<template>
    <div v-if="event && user" class="container bg-white">
        <div v-if="modalOpen" @click.self="redirectToMain"
             class="fixed left-0 top-0 h-screen flex items-center justify-center w-screen modal-bg-color">
            <div class="bg-white w-fit text-black rounded-xl p-10">
                Your homework added successfully!
            </div>
        </div>
        <router-link to="/main-page" class="block mt-4 underline cursor-pointer">
            Go back
        </router-link>
        <div class="text-3xl font-bold text-primary mt-10">
            Homework
        </div>
        <div class="text-red mt-3 text-lg">
            Valid until {{ dayjs(event.date).format('DD/MM/YYYY HH:mm') }}
        </div>
        <div class="text-darkGray mt-2 ">
            Created by {{ event.createdBy.email }} at {{ dayjs(event.createdAt).format('DD/MM/YYYY') }}
        </div>
        <div class="mt-16 text-2xl font-bold">
            Name: {{ event.title }}
        </div>
        <div class="mt-4 text-lg">
            Message: {{ event.message }}
        </div>
        <div class="mt-10">
            <div class="text-2xl font-bold">
                Your answer:
            </div>
            <template v-if="files">
                <p>You have selected: <b>{{ files.length }} files</b></p>
                <li v-for="file of files" :key="file.name">
                    {{ file.name }}
                </li>
            </template>
            <div class="flex gap-4   justify-center mt-4">
                <textarea class="border-lightGray rounded-lg p-2  border w-full focus:outline-primary"
                          v-model="answer"/>
                <div class="flex flex-col gap-2 items-center">
                    <button @click="open" ref="fileInput"
                            class="bg-cyan hover:bg-primary w-fit text-white rounded-2xl p-2">
                        Select your files
                    </button>
                    <button type="button" class="underline w-fit cursor-pointer" :disabled="!files" @click="reset()">
                        Reset
                    </button>
                </div>
            </div>
            <div class="mt-6 text-red">
                Please either upload a file or write a message
            </div>
            <div @click="submitAnswer" class="mt-12 w-fit p-3 rounded-2xl bg-primary hover:bg-cyan text-white">
                Submit
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute } from "vue-router";
    import { getDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
    import { db, eventConverter, type CalendarEvent } from "@/firebase";
    import { useCurrentUser } from 'vuefire'
    import { ref, watch } from "vue";
    import * as dayjs from 'dayjs'
    import { getStorage, ref as fileRef, uploadBytes } from "firebase/storage";
    import { v4 as uuidv4 } from 'uuid';
    import { useFileDialog } from "@vueuse/core";
    import router from "@/router";

    const { files, open, reset } = useFileDialog()


    const event = ref<CalendarEvent>();
    const fileInput = ref()
    const user = useCurrentUser();

    const route = useRoute();
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

    getDoc(doc(db, 'events', id).withConverter(eventConverter))
        .then(e => {
            event.value = e.data()
        });

    const answer = ref('');
    const storage = getStorage();
    const errorMessage = ref(false);

    watch(files, () => {
        if (files.value) {
            console.log(files.value)
        }
    })


    async function submitAnswer() {
        if (answer.value && files.value) {
            errorMessage.value = false;
            const idArray = [];
            for (let i = 0; i < files.value?.length; i++) {
                const uid = uuidv4()
                const documentRef = fileRef(storage, uid);
                await uploadBytes(documentRef, files.value[i])
                idArray.push(uid);
            }
            updateDoc(doc(db, "events", id), {
                answers: arrayUnion({
                    addedAt: new Date(),
                    message: answer.value,
                    documentLink: idArray,
                    email: user.value!.email,
                })
            }).then(() => {
                modalOpen.value = true
            })
        } else if (files.value && !answer.value) {
            errorMessage.value = false;
            const idArray = [];
            for (let i = 0; i < files.value?.length; i++) {
                const uid = uuidv4()
                const documentRef = fileRef(storage, uid);
                await uploadBytes(documentRef, files.value[i])
                idArray.push(uid);
            }
            updateDoc(doc(db, "events", id), {
                answers: arrayUnion({
                    addedAt: Date.now(),
                    message: '',
                    documentLink: idArray,
                    email: user.value!.email,
                })
            }).then(() => {
                modalOpen.value = true
            })
        } else if (answer.value && !files.value) {
            errorMessage.value = false;
            updateDoc(doc(db, "events", id), {
                answers: arrayUnion({
                    addedAt: new Date(),
                    message: answer.value,
                    documentLink: [],
                    email: user.value!.email,
                })
            }).then(() => {
                modalOpen.value = true
            })
        } else {
            return errorMessage.value = true
        }
    }

    const modalOpen = ref(false);

    function redirectToMain() {
        modalOpen.value = false;
         router.push({ path: `/main-page` })
        return;
    }


</script>

<style scoped>
    .modal-bg-color {
        background-color: rgba(2, 6, 23, 0.2)
    }

</style>
