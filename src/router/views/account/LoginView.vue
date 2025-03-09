<template>
  <div class="auth-page">
    <div class="__form-wrapper">
      <h1 class="mb-4">Login</h1>
      <FormulateForm
        ref="formRef"
        v-model="formValues"
        :errors="formErrors"
        @submit="login"
      >
        <FormulateInput
          type="text"
          label="Email Address"
          name="email"
          placeholder="hello@example.com"
          validation="bail|required|email"
          validation-behavior="value"
          error-behavior="value"
        />
        <FormulateInput
          type="password"
          label="Password"
          name="password"
          placeholder="input your password"
          validation="bail|required|min:5"
          validation-behavior="value"
          error-behavior="value"
        />
        <div class="w-100 mt-3 d-flex flex-column gap-3 align-items-center">
          <FormulateInput type="submit">Login</FormulateInput>
          <div>Don't have an account? <a href="#" @click.prevent="goToRegister">Register</a></div>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
import * as Auth from '@/services/authenticate'
import Cookies from 'js-cookie'

export default {
  page: {
    title: "Login Page",
  },
  data() {
    return {
      formValues: {},
      formErrors: {},
    }
  },
  methods: {
    async login() {
      if (this.$refs.formRef.hasError) return

      const res = await Auth.login(this.formValues)

      if (res.error) {
        this.$myToast.error(res.error)
        return
      }

      // success login & save token
      Cookies.set("resource", res.token, { expires: 1 })
      this.$myToast.success("Succesfully Login!")

      this.$router.push({
        name: 'Home Page'
      })
    },
    goToRegister() {
      this.$router.push({ name: 'Register Page' })
    }
  }
}
</script>
