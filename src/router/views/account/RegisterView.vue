<template>
  <div class="auth-page">
    <div class="__form-wrapper">
      <h1 class="mb-4">Register</h1>
      <FormulateForm
        ref="formRef"
        v-model="formValues"
        @submit="register"
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
          autocomplete="new-password"
          validation="bail|required|min:6"
          validation-behavior="value"
          error-behavior="value"
        />
        <FormulateInput
          type="password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="re-input your password"
          validation="bail|required|matches:password"
          validation-behavior="value"
          error-behavior="value"
          validation-name="Confirm password"
        />
        <div class="w-100 mt-3 d-flex flex-column gap-3 align-items-center">
          <FormulateInput type="submit">Register</FormulateInput>
          <div>Have an account? <a href="#" @click.prevent="goToLogin">Login</a></div>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
import * as Auth from '@/services/authenticate'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      formValues: {
        email: "",
        password: "",
        confirm_password: "",
      },
    }
  },
  methods: {
    async register() {
      if (this.$refs.formRef.hasErrors) return
      
      const res = await Auth.register({
        email: this.formValues.email,
        password: this.formValues.password
      })

      if (res.error) {
        this.$myToast.error(res.error)
        return
      }

      // success login & save token
      Cookies.set("resource", res.token, { expires: 1 })
      
      this.goToLogin()

      this.$myToast.success("Succesfully Register New User!")
    },
    goToLogin() {
      this.$router.back()
    },
  }
}
</script>
