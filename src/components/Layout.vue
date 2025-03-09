<template>
  <div>
    <Header class="top-bar p-3">
      <b-dropdown class="custom-dropdown m-md-2" variant="link" toggle-class="text-decoration-none" right no-caret>
        <template #button-content>
          <img src="@/assets/icon-user.png" width="30px" />
        </template>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
    </Header>
    <slot />
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  methods: {
    logout() {
      Cookies.remove('resource')
      window.location.reload()
    }
  }
}
</script>
