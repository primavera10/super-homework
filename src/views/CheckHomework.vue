<template>
    <div v-if="event && user && groupedUsers" class="container">
        <router-link to="/main-page" class="block mt-4 underline cursor-pointer">
            Go back
        </router-link>
        <div class="text-3xl font-bold text-primary mt-10">
            Check students' homework for {{ dayjs(event.date).format('DD/MM/YYYY HH:mm') }}
        </div>
        <table class="w-full text-center mt-10 border p-3 border-collapse">
            <thead>
            <tr>
                <th class="border">
                    Student
                </th>
                <th class="border">
                    Sent
                </th>
                <th class="border">
                    Marked
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="student in event.students" :key="student">
                <td class="border">
                    {{ student }}
                </td>
                <td class="border">
                    {{ hasHomework(student) }}
                    <span v-if="hasHomework(student)" class="underline cursor-pointer" @click="seeHomework(student)">
                        Check
                    </span>
                </td>
                <td class="border">
                    {{hasMark(student)}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";
    import { useCurrentUser } from 'vuefire'
    import { getDoc, doc } from "firebase/firestore";
    import { db, eventConverter, type CalendarEvent } from "@/firebase";
    import { ref } from 'vue';
    import { groupBy } from "lodash";

    const user = useCurrentUser();
    const route = useRoute();
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    const event = ref<CalendarEvent>();
    const groupedUsers = ref<any>()
    import * as dayjs from 'dayjs'
    import router from "@/router";

    getDoc(doc(db, 'events', id).withConverter(eventConverter))
        .then(e => {
            event.value = e.data()
            if (event.value) {
                groupedUsers.value = groupBy((event.value.answers), 'email')
            }
        });

    function hasHomework(student: string) {
        let a = 0;
        for (let i in groupedUsers.value) {
            if (i === student) {
                a += 1;
            }
        }
        return a > 0;
    }

    function hasMark(student: string) {
        if (hasHomework(student)){
            return groupedUsers.value[student].mark ? groupedUsers.value[student].mark : '-';
        } else return '-';
    }

    function seeHomework(student:string){
        if (hasHomework(student)){
            return router.push({path:`/main-page/homework/${id}/${encodeURIComponent(student)}`})
        }
    }

</script>

<style scoped>

</style>
