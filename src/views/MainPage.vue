<template>
    <div class="container bg-white">
        <div v-if="user" class="text-center text-3xl font-bold text-primary mt-12">
            Welcome
            <span class="text-cyan">
            {{ user.email }}
        </span>
            to Super Homework!
        </div>
        <div class="text-lg  mt-12">
            You are registered as a
            <span class="text-primary">
                {{ role }}
            </span>
            <span v-if="role === 'teacher'">, so you can add new events
            </span>
        </div>
        <router-link v-if="role ==='teacher'" to="/main-page/add-event"
                     class="bg-primary inline-block mt-6 rounded-2xl hover:bg-cyan text-white py-3 px-4">
            Add new event
        </router-link>
        <div class="text-center mt-8 mb-10">
            <Calendar expanded :attributes="attributes">
                <template #day-popover="{attributes, dayTitle}">
                    <div class="text-xs text-gray-700 dark:text-gray-300">
                        {{ dayTitle }}
                    </div>
                    <ul>
                        <li
                            v-for="{ key, customData } in attributes"
                            @click="redirectToHomework(customData.id)"
                            :key="key"
                            class="block cursor-pointer  text-gray-700 dark:text-gray-300 bg-red-100"
                        >
                            <div>
                                {{ customData.title }}
                            </div>
                            <div class="text-xs">
                                {{ customData.message }}
                            </div>
                        </li>
                    </ul>
                </template>
            </Calendar>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCurrentUser } from 'vuefire'
    import { collection, doc, where, query, getDoc, getDocs, Query } from "firebase/firestore";
    import { db } from "@/firebase";
    import { watch, ref, computed } from "vue";
    import { Calendar } from 'v-calendar';
    import 'v-calendar/style.css';
    import router from "@/router";

    const user = useCurrentUser();
    const role = ref('');
    const email = ref('')
    const currentEvents = ref([] as any[]);

    watch(user, async (newUser) => {
        if (newUser) {
            const docRef = doc(db, "user-details", newUser.uid);
            const docSnap = await getDoc(docRef);
            const result = docSnap.data();
            if (result) {
                role.value = result.role;
                email.value = result.email;

                let q: Query;
                if (role.value === 'teacher') {
                    q = query(collection(db, 'events'), where('createdBy.uid', "==", newUser.uid))
                } else {
                    q = query(collection(db, 'events'), where('students', 'array-contains', email.value))
                }
                const events = await getDocs(q);
                events.forEach((doc: any) => {
                    const data = doc.data()
                    currentEvents.value.push({
                        id: doc.id,
                        title: data.title,
                        date: data.date.toDate(),
                        message: data.message,
                        createdBy: data.createdBy,
                    });
                })
            }
        }
    }, { immediate: true })


    const attributes = computed(() => {
            return currentEvents.value.map((elem: any) => ({
                    popover: {
                        visibility: 'click',
                    },
                    dot: {
                        color: 'red'
                    },
                    customData: elem,
                    dates: elem.date,
                })
            );
        }
    )

    const redirectToHomework = (eventId: string) => {
        if (role.value === 'student') {
            router.push({ path: `/main-page/event/${eventId}` })
        } else {
            router.push({ path: `/main-page/homework/${eventId}` })
        }
    }

</script>

<style scoped>

</style>
