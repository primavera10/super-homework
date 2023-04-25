<template>
<div class="container bg-white">
    <div class="text-primary text-3xl my-8 font-bold text-center">
        Sign In
    </div>
    <div class="text-center">
        <div class="mt-12 flex flex-col gap-3">
            <div>
                <div >
                    Enter your email
                </div>
                <input
                    type="text"
                    v-model="userEmail"
                    class="border-lightGray p-1 border-2 rounded focus:outline-none focus:border-violet "/>
            </div>
            <div>
                <div>
                    Enter your password
                </div>
                <input
                    type="password"
                    v-model="userPassword"
                    class="border-lightGray p-1 border-2 rounded focus:outline-none focus:border-violet "/>
            </div>
        </div>
        <div v-if="hasError === true" class="text-red mt-2">
            Failed to Sign In. Please check your password and email.
        </div>
        <button class="bg-primary text-white mt-20 rounded-3xl py-2 px-4 hover:bg-cyan" @click="signIn">
            Sign In
        </button>
        <div class="underline mt-2">
            <router-link to="/SignUp">
                Sign Up
            </router-link>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const auth = getAuth();

    const userEmail = ref('');
    const userPassword = ref ('');
    const hasError = ref (false)

    function signIn(){
        signInWithEmailAndPassword(auth, userEmail.value,userPassword.value ) .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            hasError.value = false;
            router.push({path: '/MainPage'})
            // ...
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-email'){
                    hasError.value = true
                }
            });
    }
</script>

<style scoped>

</style>
