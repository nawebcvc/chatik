<template>
    <header class="header">
        <div class="container">
            <nav class="header__nav">
                <div class="header__nav-search search">
                    <img src="@/assets/images/search.svg" alt="">
                    <input type="text" name="" id="" placeholder="Search...">
                </div>
                <a class="header__nav-logo">
                    <!-- <img src="@/assets/images/logo.svg" alt=""> -->
                    <h1 class="big">Chatik</h1>
                    <h1 class="small">Ch</h1>
                </a>
                <div class="header__nav-btns">
                    <button type="button">
                        <img src="@/assets/images/phone.svg" alt="">
                    </button>
                    <button type="button">
                        <img src="@/assets/images/camera.svg" alt="">
                    </button>
                </div>
                <div class="header__nav-profile">
                    <p>{{ usePersonStore().name + ' ' + usePersonStore().surname }}</p>
                    <button class="ava">
                        <img :src="usePersonStore().photos[0]" alt="">
                    </button>
                    <button class="settings"><img src="@/assets/images/settings.svg" alt=""></button>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import { usePersonStore } from '@/stores/person';


</script>

<style lang="scss"></style>
