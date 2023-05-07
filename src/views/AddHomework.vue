<template>
    <div class="container bg-white">
        <div class="text-center text-3xl font-bold text-primary mt-12" v-if="event">
            Homework for
            <span class="text-cyan"> {{ event.date }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute } from "vue-router";
    import { getDoc, doc } from "firebase/firestore";
    import { db, eventConverter, type CalendarEvent } from "@/firebase";
    import { ref } from "vue";

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
