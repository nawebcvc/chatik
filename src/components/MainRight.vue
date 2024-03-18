<template>
    <transition name="opacity">
        <div class="main__right" v-if="$props.biography">
            <div class="main__right-biography biography">
                <div :class="'biography__status ' + props.biography.wasOnline">
                    <img :src="props.biography.photos[0]" alt="">
                </div>
                <p class="biography__nickname">{{ props.biography.name + ' ' + props.biography.surname }}</p>
                <p class="biography__number">{{ props.biography.number }}</p>
                <p class="biography__lastEnter">{{ props.biography.wasOnline }}</p>
                <button v-if="props.biography.pinned" @click="props.biography.pinned = false">
                    <img src="@/assets/images/pin.svg" alt="">
                </button>
            </div>
            <div class="main__right-files files">
                <ul class="files__types">
                    <li class="images type active" @click="changeClass('images')">
                        <img src="@/assets/images/typeImages.svg" alt="">
                        <span>{{ props.biography.allFiles['imgs'].length }}</span>
                    </li>
                    <li class="audios type " @click="changeClass('audios')">
                        <img src="@/assets/images/typeVoices.svg" alt="">
                        <span>{{ props.biography.allFiles['audios'].length }}</span>
                    </li>
                    <li class="attachments type " @click="changeClass('attachments')">
                        <img src="@/assets/images/typeAttachments.svg" alt="">
                        <span>{{ props.biography.allFiles['attachments'].length }}</span>
                    </li>
                    <li class="links type " @click="changeClass('links')">
                        <img src="@/assets/images/typeLinks.svg" alt="">
                        <span>{{ props.biography.allFiles['links'].length }}</span>
                    </li>
                </ul>
                <ul class="files__block" :class="blockType" v-if="blockType === 'images'">
                    <!-- <div class="files__block images/audios/attachments/links"> -->
                    <!-- <img src="@/assets/images/files/fileImgBig(1).png" alt="" class="files__block-item"> -->
                    <li class="files__block-item" v-for="(img, i) in props.biography.allFiles['imgs']" :key="i">
                        <img :src="img" alt="">
                    </li>
                </ul>
                <div class="files__block-none" v-else>
                    <img class="none__img" src="@/assets/images/extraVeryGood@0,5x.png">
                    <p class="none__text">empty :D</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeMount, watch } from 'vue';
const props = defineProps(['biography']);
// console.log(props.biography);

const blockType: Ref<string> = ref("images");


function changeClass(type: string) {
    const typesLI: NodeListOf<HTMLLIElement> = document.querySelectorAll('li.type');
    const clickedLI = document.querySelector('.' + type) as HTMLLIElement;
    typesLI.forEach((liEL: HTMLLIElement) => { liEL === clickedLI ? liEL.classList.add('active') : liEL.classList.remove('active') });
    blockType.value = type;
};

function empty() {
    return (document.querySelector('.files__block') as HTMLUListElement).children.length > 0 ? true : false;
}


</script>

<style scoped lang="scss"></style>