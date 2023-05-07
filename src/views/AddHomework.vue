<template>
    <div class="container bg-white">
        <div class="text-3xl font-bold text-primary mt-12">
            Homework
        </div>
        <div class="text-darkGray mt-3 text-lg" v-if="event">
            Valid until {{ dayjs(event.date).format('DD/MM/YYYY HH:mm') }}
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute } from "vue-router";
    import { getDoc, doc } from "firebase/firestore";
    import { db, eventConverter, type CalendarEvent } from "@/firebase";
    import { ref } from "vue";
    import * as dayjs from 'dayjs'

    const event = ref<CalendarEvent>();

    const route = useRoute();
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

    getDoc(doc(db, 'events', id).withConverter(eventConverter))
        .then(e => {
            event.value = e.data()
        });


</script>

<style scoped>

</style>
