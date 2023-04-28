<template>
<div class="container bg-white">
    <div v-if="user" class="text-center text-3xl font-bold text-primary mt-12">
        Welcome
        <span class="text-cyan">
            {{user.email}}
        </span>
         to Super Homework!
    </div>
    <div v-if="role==='teacher'" class="text-lg  mt-12">
        You are registered as a {{role}}, so you can add new events
    </div>
        <router-link to="/main-page/add-event" class="bg-primary inline-block mt-6 rounded-2xl hover:bg-cyan text-white py-3 px-4">
            Add new event
        </router-link>
    <div class="text-center mt-8 mb-10">
        <Calendar expanded />
    </div>
</div>
</template>

<script setup lang="ts">
    import { useCurrentUser } from 'vuefire'
    import { doc, getDoc } from "firebase/firestore";
    import { db } from "@/firebase";
    import { watch, ref } from "vue";
    import { Calendar } from 'v-calendar';
    import 'v-calendar/style.css';

    const user =  useCurrentUser();
    const role = ref('');
    const selectedDate = ref (new Date())

    console.log(user.value)
    watch(user, async (newUser)=>{
        console.log('туту')
        if (newUser){
            const docRef = doc(db,"user-details", newUser.uid);
            const docSnap = await getDoc(docRef);
            role.value = docSnap.data().role;
        }
    }, {immediate: true})
</script>

<style scoped>

</style>
