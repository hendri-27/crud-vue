<template>
  <Layout>
    <div class="home p-4">
      <div class="header mb-3">
        <h1>List User</h1>
        <b-button  v-b-modal.modalAdd class="btn-inline">Tambah</b-button>
      </div>
      <div class="overflow-x-scroll">
        <b-table
          id="my-table"
          class="table table-bordered border-primary"
          :fields="fields"
          :items="items"
          small
        >
          <template #cell(action)="{ item }">
            <div v-if="item?.username" class="action-btn-wrapper">
              <div v-b-modal.modalUser @click="openEditModal(item)" class="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </div>
              <div v-b-modal.modalDelete @click="openDeleteModal(item)" class="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <b-modal id="modalAdd" hide-header-close centered title="Add" @ok="handleAdd">
      <FormulateForm ref="formAddRef" v-model="formValuesAdd">
        <FormulateInput
          type="text"
          label="Name"
          name="name"
          placeholder="input name"
          validation="required"
          validation-behavior="value"
          error-behavior="value"
        />
        <FormulateInput
          type="text"
          label="Email Address"
          name="email"
          placeholder="hello@example.com"
          validation="bail|required|email"
          validation-behavior="value"
          error-behavior="value"
        />
      </FormulateForm>
    </b-modal>
    <b-modal id="modalUser" hide-header-close centered title="Edit" @ok="handleEdit">
      <FormulateForm ref="formRef" v-model="formValues">
        <FormulateInput
          type="text"
          label="Name"
          name="name"
          placeholder="input name"
          validation="required"
          validation-behavior="value"
          error-behavior="value"
        />
        <FormulateInput
          type="text"
          label="Email Address"
          name="email"
          placeholder="hello@example.com"
          validation="bail|required|email"
          validation-behavior="value"
          error-behavior="value"
        />
      </FormulateForm>
    </b-modal>
    <b-modal
      id="modalDelete"
      hide-header-close 
      centered
      @ok="handleDelete"
    >
      <p>Are you sure deleting this item?</p>
    </b-modal>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import * as User from '@/services/user'
import fields from './lib/list-fields'

export default {
  components: {
    Layout
  },
  mixins: [fields],
  data() {
    return {
      items: [],
      formValuesAdd: {
        name: "",
        email: "",
      },
      formValues: {
        name: "",
        email: "",
      },
      selectedId: null
    }
  },
  async mounted() {
    await this.getUser()
  },
  methods: {
    async getUser() {
      const res = await User.get()

      this.items = res
    },

    openDeleteModal(id) {
      this.selectedId = id
    },

    openEditModal(item) {
      this.selectedId = item.id

      this.formValues = {
        name: item.name,
        email: item.email,
      }
    },

    async handleAdd() {
      if (this.$refs.formAddRef.hasError) return

      const res = await User.store(this.formValuesAdd)

      if (res) {
        this.items.push(
          res
        )
      }

      this.$nextTick(() => {
        this.formValuesAdd = { name: '', email: '' }
        this.$bvModal.hide('modalAdd')
      })
    },

    async handleEdit() {
      if (this.$refs.formRef.hasError) return

      const res = await User.update(this.selectedId, this.formValues)

      if (res) {
        const index = this.items.findIndex(item => item.id === this.selectedId)

        if (index !== -1) {
          this.items[index].name = res.name 
          this.items[index].email = res.email 
        }
      }

      // Clear form and close modal after UI is updated
      this.$nextTick(() => {
        this.formValues = { name: '', email: '' }
        this.$bvModal.hide('modalUser')
      })
    },
    async handleDelete() {
      const deleted = await User.singleDelete(this.selectedId)

      if (deleted) {
        this.items = this.items.filter((item) => item.id != this.selectedId)
      }

      this.$bvModal.hide('modalDelete')
    }
  }
}
</script>
