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
                <div>
                    Specify your role
                    <div class="flex items-center justify-center gap-3 mt-1">
                        <div class="flex justify-center gap-1">
                            <input type="radio" id="teacher" value="teacher" v-model="role"/>
                            <label for="teacher">Teacher</label>
                        </div>
                        <div class="flex justify-center gap-1">
                            <input type="radio" id="student" value="student" v-model="role">
                            <label for="student">Student</label>
                        </div>
                    </div>
                </div>
            </div>
            <button class="bg-primary text-white mt-20 rounded-3xl px-4 py-2 hover:bg-cyan" @click="signUp">
                Create an account
            </button>
            <div class="mt-4 underline">
                <router-link to="/sign-in">
                    Go back and Sign In
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { doc, setDoc } from "firebase/firestore";
    import { db } from "@/firebase"

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

    async function signUp() {
        if (email.value === "" || password.value.length < 8) {
            return checkInput()
        } else {
            try {
                checkInput()
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
                const user = userCredential.user;
                await setDoc(doc(db, "user-details", user.uid), {
                    role: role.value,
                    email: email.value,
                })
                alert('You are registered')
            } catch (error:any) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            }
        }
    }

    const role = ref('');

</script>

<style scoped>

</style>
