<template>
<a v-if="url" :href="url" target="_blank" class="text-primary underline hover:text-cyan">
    {{uid}}
</a>
</template>

<script setup lang="ts">
    import { getStorage, ref as fileRef, getDownloadURL  } from "firebase/storage";
    import { ref } from "vue";

    const storage = getStorage();
    const prop = defineProps({
        uid: {
            type: String,
            required: true
        }
    })
    const reference = fileRef(storage, prop.uid)
    const url = ref<string>()
     getDownloadURL(reference).then(e =>{
         url.value = e
     });
</script>

<style scoped>

</style>
