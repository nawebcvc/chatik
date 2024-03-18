<template>
  <div class="main__left">
    <div class="main__left-filters">
      <div class="filter msgs">
        <div class="msgs__btn bg">
          <button>
            <img src="@/assets/images/message.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="filter list">
        <div class="list__btn bg">
          <button class="btn">
            <img src="@/assets/images/list.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="filter star">
        <div class="star__btn bg">
          <button>
            <img src="@/assets/images/star.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <ul class="main__left-users">
      <li class="users__item" v-for="(user, index) in props.users" :key="index" @click="$emit('userIndex', index)">
        <button :class="'item__left ' + user.wasOnline">
          <img :src="require(user.photos)" alt="" class="item__left-ava" />
        </button>
        <div class="item__center">
          <p :class="`item__center-name ${user.isFavorite ? 'chosen' : ''}`">
            {{ user.name + " " + user.surname }}
          </p>
          <p class="item__center-msg">{{ user.lastMsg[1] }}</p>
        </div>
        <div class="item__right">
          <p class="item__right-time">{{ user.lastMsg[0] }}</p>
          <p class="item__right-count" v-if="user.msgCount > 0">
            {{ user.msgCount > 100 ? "+99" : user.msgCount }}
          </p>
          <button v-else-if="user.pinned">
            <img src="@/assets/images/pin.svg" alt="" />
          </button>
        </div>
      </li>
    </ul>
    <button class="main__left-addbtn">Add New Chat</button>
  </div>
</template>

<script setup lang="ts">
import { require } from '@/utils';
const props = defineProps(['users']);

</script>