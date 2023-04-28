<template>
<div class="container bg-white">
    <div v-if="user" class="text-center text-3xl font-bold text-primary mt-12">
        Welcome
        <span class="text-cyan">
            {{user.email}}
        </span>
         to Super Homework!
    </div>
    <div  class="text-lg text-center mt-6">
        You are registered as {{role}}
    </div>
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
    import { Calendar, DatePicker } from 'v-calendar';
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
