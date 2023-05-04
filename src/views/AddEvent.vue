<template>
    <div class="container bg-white">
        <div class="text-center text-3xl font-bold text-primary mt-12">
            Add a new event
        </div>
        <div class="mt-10">
            <div class="text-lg">
                1. Select date and time from calendar below
            </div>
            <DatePicker expanded v-model="selectedDate" :min-date="new Date()" mode="dateTime" class="mt-4"/>
        </div>
        <div class="mt-8">
            <div class="text-lg">
                2. Add title
            </div>
            <input v-model="title" class="border-lightGray rounded-lg p-2 mt-4 border w-fit  focus:outline-primary"/>
        </div>
        <div class="mt-8">
            <div class="text-lg">
                3. Enter your message
            </div>
            <textarea v-model="message"
                      class="border-lightGray rounded-lg p-2 mt-4 border w-full focus:outline-primary"/>
        </div>
        <div class="mt-8">
            <div class="text-lg mb-4">
                4. Add students
            </div>
            <multiselect :options="students" :multiple="true" track-by="email" v-model="selectedStudents" label="email" />
        </div>
        <div v-if="checkData" class="text-red mt-10">
            All fields must be fulfilled
        </div>
        <div @click="addEventData"
             class="mt-6  cursor-pointer w-fit rounded-xl py-2 px-4 text-white bg-primary hover:bg-cyan ">
            Submit
        </div>
        <router-link to="/main-page"  class="mt-6 mb-12 inline-block cursor-pointer w-fit rounded-xl py-2 px-4 text-white bg-cyan hover:bg-primary ">
            Go back to calendar
        </router-link>

    </div>
</template>
<script setup lang="ts">
    import { DatePicker } from 'v-calendar';
    import { collection, addDoc, query, where, serverTimestamp } from "firebase/firestore";
    import {  ref } from "vue";
    import { db } from "@/firebase"
    import { useCurrentUser, useCollection } from 'vuefire'
    import Multiselect from 'vue-multiselect'

    const selectedDate = ref()
    const message = ref('');
    const title = ref('')
    const checkData = ref(false);
    const user = useCurrentUser();
    const selectedStudents = ref([]);

    async function addEventData() {
        if (!user.value) {
            return;
        }
        if (!selectedDate.value || !title.value || !message.value || selectedStudents.value.length === 0 )  {
            checkData.value = true;
            return;
        }
        checkData.value = false
        const docRef = await addDoc(collection(db, "events"), {
            createdAt: serverTimestamp(),
            date: selectedDate.value,
            title: title.value,
            message: message.value,
            createdBy: {
                email: user.value.email,
                uid: user.value.uid
            },
            students: selectedStudents.value.map((stud:any) => stud.email),
        })
        console.log("Document written with ID: ", docRef.id)
        alert('A new event was created')
    }

    const students = useCollection(query(collection(db, "user-details"), where ("role", "==", "student")))


</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
