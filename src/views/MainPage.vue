<template>
    <div class="container bg-white">
        <div v-if="user" class="text-center text-3xl font-bold text-primary mt-12">
            Welcome
            <span class="text-cyan">
            {{ user.email }}
        </span>
            to Super Homework!
        </div>
        <div v-if="role==='teacher'" class="text-lg  mt-12">
            You are registered as a {{ role }}, so you can add new events
        </div>
        <router-link to="/main-page/add-event"
                     class="bg-primary inline-block mt-6 rounded-2xl hover:bg-cyan text-white py-3 px-4">
            Add new event
        </router-link>
        <div class="text-center mt-8 mb-10">
            <Calendar expanded :attributes="attributes"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCurrentUser } from 'vuefire'
    import { collection, doc, getDoc, getDocs } from "firebase/firestore";
    import { db } from "@/firebase";
    import { watch, ref, onMounted, computed } from "vue";
    import { Calendar } from 'v-calendar';
    import 'v-calendar/style.css';

    const user = useCurrentUser();
    const role = ref('');
    const currentEvents = ref([] as any[]);

    watch(user, async (newUser) => {
        if (newUser) {
            const docRef = doc(db, "user-details", newUser.uid);
            const docSnap = await getDoc(docRef);
            role.value = docSnap.data().role;
        }
    }, { immediate: true })

    onMounted(async () => {
        const events = await getDocs(collection(db, 'events'))
        events.forEach((doc: any) => {
            const data = doc.data()
            console.log(data.date)
            currentEvents.value.push({
                description: data.title,
                date: data.date.toDate(),
            });
        })
    })

    const attributes = computed(() => {
        if (currentEvents.value){
            const arr =  [] as any [];
            currentEvents.value.forEach((elem :any)=>{
                arr.push({
                    popover:{
                        label: elem.description
                    },
                    dot: {
                        color: 'red'
                    },
                    dates: elem.date
                })
            })
            return arr;
        }
        }
    )

</script>

<style scoped>

</style>
