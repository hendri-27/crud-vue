export default {
  computed: {
    fields() {
        return [
        {
          key: 'id',
        },
        {
          key: 'name'
        },
        {
          key: 'username',
        },
        {
          key: 'email',
        },
        {
          key: 'address.city',
          label: 'City'
        },
        {
          key: 'phone',
        },
        {
          key: 'website',
        },
        {
          key: 'company.name',
          label: 'Company Name'
        },
        {
          key: 'action',
          label: '',
        }
      ]
    },
  }
}