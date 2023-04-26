<template>
    <div class="container bg-white">
        <div class="text-primary text-3xl my-8 font-bold text-center">
            Sign up a new user
        </div>
        <div class="text-center">
            <div class="mt-12 flex flex-col gap-3">
                <div>
                    <div>
                        Enter your email
                    </div>
                    <input
                        type="text"
                        v-model="email"
                        class="border-lightGray p-1 border-2 rounded focus:outline-none focus:border-violet "/>
                    <div v-if="warnEmail" class="text-red">
                        Please, enter your email
                    </div>
                </div>
                <div>
                    <div>
                        Create your password
                    </div>
                    <input
                        type="password"
                        v-model="password"
                        class="border-lightGray p-1 border-2 rounded focus:outline-none focus:border-violet "/>
                    <div v-if="warnPassword" class="text-red">
                        Your password should contain at least 8 characters
                    </div>
                </div>
            </div>
            <button class="bg-primary text-white mt-20 rounded-3xl p-2" @click="signUp">
                Create an account
            </button>
            <div class="mt-4 underline">
                <router-link to="/SignIn" >
                    Go back and Sign In
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

    const email = ref('');
    const password = ref('');
    const warnEmail = ref(false);
    const warnPassword = ref(false);

    const auth = getAuth();

    function checkInput() {
        if (email.value === "" && password.value.length >= 8) {
            warnPassword.value = false
            return warnEmail.value = true
        } else if (password.value.length < 8 && email.value !== "") {
            warnEmail.value = false
            return warnPassword.value = true
        } else if (password.value.length < 8 && email.value === "") {
            warnPassword.value = true
            warnEmail.value = true
            return;
        } else {
            warnEmail.value = false;
            warnPassword.value = false;
            return;
        }
    }

    function signUp() {
        if (email.value === "" || password.value.length < 8) {
            return checkInput()
        } else {
            checkInput()
            createUserWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert('You are registered')
                // ...
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                })
        }
    }

</script>

<style scoped>

</style>
