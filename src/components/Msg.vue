<template>
    <li class="msg receiver">
        <span class="msg__time">{{ time }}</span> <!-- done -->
        <div class="msg__block">
            <div class="msg__text" @load="text"></div>
            <div :class="`msg__${fileType === true ? 'files' : 'preview'}`">
                <img :src="item" alt="" v-for="(item, i) in linkPreview" :key="i">
            </div>
        </div>
        <img src="@/assets/images/status-checked.svg" alt="" class="msg__status">
    </li>
</template>

<script lang="ts">
// :text="text" :files="files"
import { defineComponent } from 'vue';

interface Imsg {
    id: string;
    date: string;
    text: string;
    files: {
        imgs: string[];
        audios: string[];
        attachments: string[];
        links: string[];
    };
}

export default defineComponent({
    name: 'Msg',
    components: {},
    data() {
        return {
            fileType: false, // type: Boolean, required: true, default: false
            text: null, // type: String, required: true 
            files: [], // type: Array, required: true
        }
    },
    props: {
        msg: { type: Object, required: true }
    },
    computed: {
        time() {
            const msgData: Imsg = this.(msg as unknown as Imsg);
            const currentDate = new Date(msgData.date);
            let hours = currentDate.getHours() as number | string;
            hours < 10 ? '0' + hours : hours;
            let minutes = currentDate.getMinutes() as number;
            minutes < 10 ? '0' + minutes : minutes;

            return hours + ":" + minutes;
        },
        linkPreview(): [] {
            // TODO: download all links previews, save it and return it in array (with require())
            type Tprev = {
                imgs: string[];
                audios: string[];
                attachments: string[];
                links: string[];
            };
            const res: [] = [];
            // const prev = this.msg.files as Tprev;
            // console.log(prev);

            /* for (const item in prev) {
                // res.push(...prev[item])
            } */

            console.log(res)
            return res;
        },
        filesPreview() {
            // TODO: return preview images of files (imgs, audios, attachments) in array (with require())
            return []
        }
    },
    methods: {
        text() {
            // прежде чем начинать, объязательно прочитать этот сайт
            // TODO: return text, links with HTML format 
            // правила: принимается только такие теги: <div><br></div>, <b></b>, <i></i>, <sup></sup>, <sub></sub>, <BLOCKQUOTE></BLOCKQUOTE>
            // данные приходят в таком формате
            //  asdjlk https://chat.chatgptdemo.net/
            // данные должны быть в таком формате:
            // 1) прикрепленные файлы к тексту: текст пишется так:  <1>I wish I could be here</1> 
            /* `<span>I wish I could be here</span>
                <a href="https://dribbble.com/shots/16434545-24LIB-cryptocurrency-exchange-trading" class="link"
                    target="_blank">https://dribbble.com/shots/16434545-24LIB-cryptocurrency-exchange-trading</a>` */
            const msgBox = document.querySelector('.msg__text') as HTMLDivElement;
        },
    },
    created() {
    }
});

</script>