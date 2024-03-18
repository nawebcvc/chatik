<template>
  <div class="wrapper">
    <Header />
    <Main :mainCenterSize="mainCenterSize" @msgsNumber="msgsNumber = $event" />
    <Footer @mainCenterSize="mainCenterSize = $event" :msgsNumber="msgsNumber" />
  </div>

  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';
import type { Ref } from 'vue'

const mainCenterSize: Ref<number> = ref(0);
const msgsNumber: Ref<number> = ref(0);

// alert(window.innerWidth + 'px' + ' : ' + window.innerHeight + 'px')
// setInterval(() => { console.clear(); console.log(window.innerWidth + 'px' + '-:-' + window.innerHeight + 'px') }, 1500)

</script>