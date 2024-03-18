<template>
  <main class="main">
    <div class="container">
      <MainLeft :users="users" @userIndex="currentUser = $event" />
      <div class="main__center">
        <ul class="main__center-msgs" @scroll="msgsScroll">
          <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
          <Msg v-if="getMsg" v-for="(msg, i) in getMsg" :msg="msg" :key="i" />
          <MsgEmpty v-else />
          <!-- :fileType="fileType" :time="time" :text="text" :files="files" -->
          <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
        </ul>
      </div>
      <transition>
        <div class="context__menu" v-show="isMenuVisible" @click.stop @mouseleave="closeMenu">
          <ul class="menu__list">
          </ul>
        </div>
      </transition>
      <MainRight :biography="users[currentUser]" />
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
// import { v4 as uuidv4 } from 'uuid';
import MainRight from './MainRight.vue';
import MainLeft from './MainLeft.vue';
// import Msg from './Msg.vue';
import MsgEmpty from './MsgEmpty.vue';

import { useMsgStore } from '@/stores/msgs';
import { useUsersStore } from '@/stores/users';

export default defineComponent({
  name: 'Main',
  components: { MainRight, MainLeft, /* Msg , */ MsgEmpty },
  data() {
    return {
      isMenuVisible: false,
      allBtnsList: [['reply', ''], ['edit', ''], ['copy', ''], ['pin', ''], ['favorite', ''], ['forward', ''], ['select', ''], ['delete', ''], ['copy selected', ''], ['forward selected', ''], ['download selected', ''], ['clear selection', ''], ['delete selected', ''], 'to favorite selected', ['download', ''], ['not favorite', ''], ['mark as read', ''], ['mark as unread', ''], ['unpin', ''], ['mute', ''], ['unmute', ''], ['archive', ''], ['delete chat', '']] as string[][],
      btnsListEm: {
        receiverList: [['reply', ''], ['edit', ''], ['copy', ''], ['pin', ''], ['unpin', ''], ['favorite', ''], ['not favorite', ''], ['forward', ''], ['select', ''], ['delete', '']],
        senderList: [['reply', ''], ['copy', ''], ['pin', ''], ['unpin', ''], ['favorite', ''], ['not favorite', ''], ['forward', ''], ['select', ''], ['delete', '']],
        fileList: [['reply', ''], ['edit', ''], ['copy', ''], ['pin', ''], ['unpin', ''], ['download', ''], ['favorite', ''], ['forward', ''], ['select', ''], ['delete', '']],
        selecetedList: [['copy selected', ''], ['forward selected', ''], ['download selected', ''], ['clear selection', ''], ['delete selected', ''], ['to favorite selected', '']],
        chatList: [['favorite', ''], ['not favorite', ''], ['mark as read', ''], ['mark as unread', ''], ['pin', ''], ['unpin', ''], ['mute', ''], ['unmute', ''], ['archive', ''], ['select', ''], ['delete chat', '']]
      },
      mouseMove: null as ((ev: MouseEvent) => void) | null,
      newMsgs: 0 as number,
      toDownBtnVis: false,
      users: {} as any,
      currentUser: '' as string,
    }
  },
  props: {
    mainCenterSize: {
      type: Number,
      default: 127
    }
  },
  methods: {
    showMenu(event: MouseEvent, targeted: string): void {
      try {
        document.removeEventListener('mousemove', this.mouseMove as any);
        this.isMenuVisible = false;

        const contextMenu = document.querySelector('.context__menu') as HTMLDivElement;
        const menuList = document.querySelector('.menu__list') as HTMLUListElement;
        menuList.innerHTML = '';
        const x = event.clientX;
        const y = event.clientY;

        // const allBtnsList: string[][] = [['reply', ''], ['edit', ''], ['copy', ''], ['pin', ''], ['favorite', ''], ['forward', ''], ['select', ''], ['delete', ''], ['copy selected', ''], ['forward selected', ''], ['download selected', ''], ['clear selection', ''], ['delete selected', ''], 'to favorite selected', ['download', ''], ['not favorite', ''], ['mark as read', ''], ['mark as unread', ''], ['unpin', ''], ['mute', ''], ['unmute', ''], ['archive', ''], ['delete chat', '']],

        // const receiverList = reply, edit (msg), copy (msg, img, text), pin, favorite, forward, select, delete
        // const senderList = reply, copy (msg, img, text), pin, favorite, forward, select, delete
        // const fileList = reply, edit (msg/ img), copy, pin, download (img, text), favorite, forward, select, delete
        // const selecetedList = copy selected, forward selected, download selected (img, text), clear selection, delete selected, to favorite selected
        // const chatList = favorite, mark as read/unread, pin, mute/unmute , archive, select, delete chat
        // 

        console.log(targeted)

        /* <li v-for="(btn, i) in  allBtnsList " :key="i" :class="btn.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
              }).replace(/\s+/g, '')" @click="console.log(btn)">{{ btn }}</li> */

        function newLiElem(btn: string | string[]) {
          const btnText = typeof btn == 'string' ? btn : btn[0];
          const inClass: string = btnText.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          }).replace(/\s+/g, '');

          const newLiElement: HTMLLIElement = document.createElement('li');
          const newSpanElement: HTMLSpanElement = document.createElement('span');
          newLiElement.classList.add(inClass);
          newSpanElement.innerText = btnText;
          newLiElement.innerText += typeof (btn) == 'string' ? '' : btn[1];
          newLiElement.appendChild(newSpanElement);
          menuList.appendChild(newLiElement);
          newLiElement.addEventListener('click', (event) => { console.log('клик по ' + newLiElement.classList[0]) });
        }

        targeted === 'receiver' ? this.btnsListEm['receiverList'].forEach(function (btn): void { newLiElem(btn) }) : targeted === 'sender' ? this.btnsListEm['senderList'].forEach(function (btn): void { newLiElem(btn) }) : targeted === 'userLi' ? this.btnsListEm['chatList'].forEach(function (btn): void { newLiElem(btn) }) : console.log('Ошибка');

        console.log(`x: ${x}`, `y: ${y}`);

        const windowHeight = window.innerHeight; // высота окна браузера
        const menuHeight = contextMenu.offsetHeight; // высота элемента contextMenu
        let topPosition = y - (window.innerHeight > 1080 ? 144 : 36); // начальная вертикальная позиция
        // Проверяем, если contextMenu выходит за нижнюю границу экрана
        if (topPosition + menuHeight > windowHeight) {
          topPosition = (windowHeight - menuHeight - 37); // устанавливаем вертикальную позицию так, чтобы contextMenu был видимым
        }
        contextMenu.style.top = `${topPosition}px`; // устанавливаем вертикальную позицию элемента contextMenu

        const windowWidth = window.innerWidth; // ширина окна браузера
        const menuWidth = contextMenu.offsetWidth; // ширина элемента contextMenu
        let leftPosition = x - 10; // начальная горизонтальная позиция
        // Проверяем, если contextMenu выходит за правую границу экрана
        if (leftPosition + menuWidth > windowWidth) {
          leftPosition = windowWidth - menuWidth - 8; // устанавливаем горизонтальную позицию так, чтобы contextMenu был видимым
        }
        contextMenu.style.left = `${leftPosition}px`; // устанавливаем горизонтальную позицию элемента contextMenu

        this.isMenuVisible = true;
      } catch (error) {
        console.log(error);
      }
    },
    closeMenu(event: MouseEvent) {
      const menuElement = document.querySelector('.context__menu') as HTMLDivElement;
      const distance: number = 60; // расстояние от края элемента, при котором меняется значение isMenuVisible
      const menuWidth: number = menuElement.offsetWidth; // ширина элемента
      const menuHeight: number = menuElement.offsetHeight; // высота элемента
      const mouseX: number = event.clientX;
      const mouseY: number = event.clientY;

      const a = mouseY - distance;
      const b = mouseY + menuHeight + distance;
      const c = mouseX - distance;
      const d = mouseX + menuWidth + distance;

      const self = this;
      /* document.addEventListener('mousemove', function hello(ev: MouseEvent) {
        if ((a > ev.clientY || ev.clientY > b || c > ev.clientX || ev.clientX > d) && self.isMenuVisible) {
          self.isMenuVisible = false;
          this.removeEventListener('mousemove', hello);
        }
      }); */

      this.mouseMove = (ev: MouseEvent) => {
        console.log('0');
        if ((a > ev.clientY || ev.clientY > b || c > ev.clientX || ev.clientX > d) && self.isMenuVisible) {
          self.isMenuVisible = false;
          document.removeEventListener('mousemove', this.mouseMove!); // Используем this.hello для удаления обработчика
        }
      };
      document.addEventListener('mousemove', this.mouseMove!);

    },
    msgsScroll() {
      const ulElement = document.querySelector('.main__center-msgs') as HTMLUListElement;
      const liElements: NodeListOf<HTMLLIElement> = ulElement.querySelectorAll('li');
      const lastLiElement = ulElement.lastChild as HTMLLIElement;
      const toDownBtn = document.querySelector('.toDown ') as HTMLDivElement;

      function toDownBtnUnvis(isVisible: boolean) {
        if (isVisible) {
          toDownBtn.style.bottom = '95px';
          toDownBtn.style.opacity = '1';
          toDownBtn.style.zIndex = '1';
        } else {
          toDownBtn.style.bottom = '0';
          toDownBtn.style.opacity = '0';
          toDownBtn.style.zIndex = '0';
        }
      };

      liElements.forEach((liElement: HTMLLIElement) => {
        const rect = liElement.getBoundingClientRect();
        toDownBtnUnvis(true);
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          // console.log(liElement === lastLiElement ? 'hello, it`s me Mario' : false);
          toDownBtn.classList.remove('warning');
          toDownBtnUnvis(false);
          // this.toDownBtnVis = false;
        }
      });
    },
  },
  computed: {
    getMsg() { // для возвращения списка с смсками
      console.log(useMsgStore()[this.currentUser]);
      return useMsgStore()[this.currentUser];
    }
  },
  watch: {
    mainCenterSize(size) {
      console.log(size);
      const mainCenter = document.querySelector('.main__center-msgs') as HTMLDivElement;
      //     max-height: calc(100vh - 127px);
      mainCenter.style.maxHeight = `calc(100vh - ${size || 127}px)`;
    },
    isMenuVisible(bool) {
      bool === false ? document.removeEventListener('mousemove', this.mouseMove as any) : true;
    },
    newMsgs(num: number) {
      this.$emit('msgsNumber', num);
    }
  },
  created() {
    this.users = useUsersStore().$state;
  },
  mounted() {
    document.addEventListener('click', () => { this.isMenuVisible = false; document.removeEventListener('mousemove', this.mouseMove as any) });
    const msgsList = document.querySelector('.main__center') as HTMLUListElement;
    msgsList.addEventListener('scroll', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const scrollPosition = (e.target as HTMLUListElement).scrollTop;
      console.log(scrollPosition);
    })

    const liElems: NodeListOf<Element> = document.querySelectorAll('.msg, .users__item');
    liElems.forEach((liElem) => {

      const classList: string = liElem.classList[1] || liElem.classList[0];
      // console.log(classList);
      classList === 'receiver' ? liElem.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.showMenu((event as MouseEvent), 'receiver')
      }) : classList === 'sender' ? liElem.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.isMenuVisible = false;
        this.showMenu((event as MouseEvent), 'sender')
      }) : classList === 'users__item' ? liElem.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.isMenuVisible = false;
        this.showMenu((event as MouseEvent), 'userLi');
      }) : console.log('Ошибка');
    });

    this.$emit('msgsNumber', this.newMsgs);
    this.msgsScroll();
  },
});
</script>

<style lang="scss"></style>
