<template>
<div  class="container bg-white">
    <div>
        {{route.params.id}}
    </div>
</div>
</template>

<script setup lang="ts">

    import {useRoute} from "vue-router";
    import {getDoc, doc} from "firebase/firestore";
    import { db } from "@/firebase";
    import { ref } from "vue";

    const event = ref();
    const route = useRoute();
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

     getDoc(doc(db,'events', id)).then(e => {
         event.value = e.data()
     })





</script>

<style scoped>

</style>
