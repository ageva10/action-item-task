<template>
  <div class="page">

    <div class="row mb-2">
      <div class="col-6">
        <input type="text" class="form-control" v-model="filter" placeholder="Filter by name or country">
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Country</th>
          <th scope="col">Phone number</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in store.users" :key="index" @click="selectUser(user)">
          <th><img :src="user.picture.thumbnail" alt="user thumbnail" /></th>
          <td v-text="user.name.title + ' ' + user.name.first + ' ' + user.name.last"></td>
          <td v-text="user.gender"></td>
          <td v-text="user.location.country"></td>
          <td v-text="user.phone"></td>
          <td v-text="user.email"></td>
        </tr>
        <tr v-if="store.users.length === 0" class="empty">
          <td colspan="6" class="text-center">No data</td>
        </tr>
      </tbody>
    </table>

    <div class="text-center">
      <button type="button" class="btn btn-primary" @click="fetchData" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-else>Fetch</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { axiosInstance } from '../api'
import { useStore } from '../store'

let loading = ref(false)
let filter = ref('')

const store = useStore()
const router = useRouter()

async function fetchData() {
  try {
    loading.value = true
    const { data } = await axiosInstance.get('/?results=10')
    const { results } = data
    Object.assign(store.users, results)
    localStorage.set('users', results)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function selectUser(user) {
  store.user = user
  localStorage.set('user', user)
  router.push({ name: 'ScreenTwo', params: { uuid: user.login.uuid } })
}

watch(filter, (val) => {
  store.users = localStorage.get('users')
  store.users = store.users.filter(user => {
    return (user.name.title.toLowerCase() + ' ' + user.name.first.toLowerCase() + ' ' + user.name.last.toLowerCase())
        .includes(val.toLowerCase()) || user.location.country.toLowerCase().includes(val.toLowerCase())
  })
})

onMounted(() => {
  if (localStorage.has('users')) {
    store.users = localStorage.get('users')
  }
})
</script>

<style lang="scss" scoped>
.page {
  padding: 15px;

  .table {

    thead {

      tr {
        background: rgba(0,0,0,0.2);
      }
    }

    tbody {

      tr {

        &:hover {
          cursor: pointer;
          background: rgba(0,0,0,0.1);
        }

        &.empty {
          cursor: default;
          background: #fff;
        }
      }
    }
  }
}
</style>