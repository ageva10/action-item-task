<template>
  <div class="page" v-if="store.user">
    <div class="card">
      <img :src="store.user.picture.large" class="card-img-top" alt="large image">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ store.user.gender }}</li>
        <li class="list-group-item">
          <div v-if="isEdit">
            <input type="text" class="form-control mb-2" placeholder="Title" v-model="store.user.name.title">
            <input type="text" class="form-control mb-2" placeholder="First" v-model="store.user.name.first">
            <input type="text" class="form-control" placeholder="Last" v-model="store.user.name.last">
            <button type="button" class="btn btn-primary mt-2" @click="saveUser">Save</button>
          </div>
          <div v-else>
            <div class="text-primary">
              <span class="name" @click.prevent="editUser">
                {{ store.user.name.title }}
                {{ store.user.name.first }}
                {{ store.user.name.last }}
              </span>
            </div>
          </div>
        </li>
        <li class="list-group-item">{{ store.user.dob.age }} - {{ dayjs(store.user.dob.date).format('DD/MM/YYYY') }}</li>
        <li class="list-group-item">
          {{ store.user.location.street.number + ' ' + store.user.location.street.name }}<br/>
          {{ store.user.location.city }}<br/>
          {{ store.user.location.state }}
        </li>
        <li class="list-group-item">{{ store.user.email }}</li>
        <li class="list-group-item">{{ store.user.phone }}</li>
      </ul>
    </div>

    <button type="button" class="btn btn-primary mt-5" @click="back">Back</button>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import dayjs from 'dayjs'

let isEdit = ref(false)

const store = useStore()
const router = useRouter()

function editUser() {
  isEdit.value = !isEdit.value
}

function saveUser() {
  const index = store.users.findIndex(user => user.login.uuid === store.user.login.uuid)
  if (index > -1) {
    store.users[index] = store.user
    localStorage.update('user', store.user)
    localStorage.update('users', store.users)
  }
  editUser()
}

function back() {
  router.push({ name: 'ScreenOne' })
}

onMounted(() => {
  if (localStorage.has('user')) {
    store.user = localStorage.get('user')
  }
})
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .card {
    width: 20rem;

    .name {
      cursor: pointer;
    }
  }
}
</style>