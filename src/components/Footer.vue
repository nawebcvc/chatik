<template>
  <footer class="footer">
    <div class="footer__block">
      <div class="footer__block-emotion active">
        <button class="emotion__btn" @click.stop="emojiBlock = !emojiBlock" :class="{ active: emojiBlock }">
          <img src="@/assets/images/emotion.svg" alt="">
        </button>
        <transition>
          <div class="emotion__block" v-show="emojiBlock" @click.stop="">
            <div class="emotion__block-search search">
              <img src="@/assets/images/search.svg" alt="">
              <input type="text" placeholder="Search..." class="emojiSearch" @input="searchEmoji">
            </div>

            <div class="icofonts" v-on:keydown.space.prevent>

              <ul v-for="(icons, category) in icoFontsList" :key="category" :class="`icofonts__${category}`"
                v-on:keydown.space.prevent>
                <!-- v-for="(icons, category) in (Object.keys(icoFontsListFilt).length === 0 ? icoFontsList : icoFontsListFilt)"
                :key="category" :class="`icofonts__${category}`" v-on:keydown.space.prevent> -->
                <li v-for="(icon, name) in  icons " :key="icon[0]" :class="name + ` icofont`" @click="toInputEmoji(icon)"
                  @mouseenter="emojiName(name)" @mouseleave="emojiName('Search...')">
                  {{ icon }}
                </li>
              </ul>

            </div>

            <div class=" size">
              <input type="range" class="size__slider" step="6" @input="sizeEmoji">
            </div>
          </div>
        </transition>
      </div>
      <form class=" footer__block-form">

        <!-- <textarea type="text" class="form-input" autofocus cols="99" rows="1" placeholder="Type Something..."
          v-model="value" @enter="value = ''" @input="autosize"></textarea> -->
        <div type="text" class="form-input contenteditable" autofocus placeholder="Type Something..."
          contenteditable="true" data-placeholder="Type Something..." @input="autosize" @click.stop>
          </div>

        <div class="form-btns short">
          <button class="btn menu" type="button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div class="form-btns_block btns">
            <button class="btn img" type="button">
              <img src="@/assets/images/typeImages.svg" alt="">
            </button>
            <button class="btn voice" type="button">
              <img src="@/assets/images/typeVoices.svg" alt="">
            </button>
            <button class="btn attachment" type="button">
              <img src="@/assets/images/typeAttachments.svg" alt="">
            </button>
            <button class="btn link" type="button">
              <img src="@/assets/images/typeLinks.svg" alt="">
            </button>
          </div>
        </div>
      </form>
      <transition>
        <div class="toDown warning" @click="goDownBtn(true)" >
          <span class="first" id="toDownNum">{{ msgsNumber }}</span>
          <span class="second"></span>
        </div>
      </transition>
    </div>
  </footer>
</template>

<script lang="ts">
import { createElementVNode, defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  components: {},
  data() {
    return {
      value: '',
      icoFontsList: { 'abstract': { 'angry-monster': '', 'bathtub': '', 'bird-wings': '', 'bow': '', 'castle': '', 'circuit': '', 'crown-king': '', 'crown-queen': '', 'dart': '', 'disability-race': '', 'diving-goggle': '', 'eye-open': '', 'flora-flower': '', 'flora': '', 'gift-box': '', 'halloween-pumpkin': '', 'hand-power': '', 'hand-thunder': '', 'king-monster': '', 'love': '', 'magician-hat': '', 'native-american': '', 'owl-look': '', 'phoenix': '', 'robot-face': '', 'sand-clock': '', 'shield-alt': '', 'ship-wheel': '', 'skull-danger': '', 'skull-face': '', 'snowmobile': '', 'space-shuttle': '', 'star-shape': '', 'swirl': '', 'tattoo-wing': '', 'throne': '', 'tree-alt': '', 'triangle': '', 'unity-hand': '', 'weed': '', 'woman-bird': '' }, 'animal': { 'bat': '', 'bear-face': '', 'bear-tracks': '', 'bear': '', 'bird-alt': '', 'bird-flying': '', 'bird': '', 'birds': '', 'bone': '', 'bull': '', 'butterfly-alt': '', 'butterfly': '', 'camel-alt': '', 'camel-head': '', 'camel': '', 'cat-alt-1': '', 'cat-alt-2': '', 'cat-alt-3': '', 'cat-dog': '', 'cat-face': '', 'cat': '', 'cow-head': '', 'cow': '', 'crab': '', 'crocodile': '', 'deer-head': '', 'dog-alt': '', 'dog-barking': '', 'dog': '', 'dolphin': '', 'duck-tracks': '', 'eagle-head': '', 'eaten-fish': '', 'elephant-alt': '', 'elephant-head-alt': '', 'elephant-head': '', 'elephant': '', 'elk': '', 'fish-1': '', 'fish-2': '', 'fish-3': '', 'fish-4': '', 'fish-5': '', 'fish': '', 'fox-alt': '', 'fox': '', 'frog-tracks': '', 'frog': '', 'froggy': '', 'giraffe-head-1': '', 'giraffe-head-2': '', 'giraffe-head': '', 'giraffe': '', 'goat-head': '', 'gorilla': '', 'hen-tracks': '', 'horse-head-1': '', 'horse-head-2': '', 'horse-head': '', 'horse-tracks': '', 'jellyfish': '', 'kangaroo': '', 'lemur': '', 'lion-head-1': '', 'lion-head-2': '', 'lion-head': '', 'lion': '', 'monkey-2': '', 'monkey-3': '', 'monkey-face': '', 'monkey': '', 'octopus-alt': '', 'octopus': '', 'owl': '', 'panda-face': '', 'panda': '', 'panther': '', 'parrot-lip': '', 'parrot': '', 'paw': '', 'pelican': '', 'penguin': '', 'pig-face': '', 'pig': '', 'pigeon-1': '', 'pigeon-2': '', 'pigeon': '', 'rabbit': '', 'rat': '', 'rhino-head': '', 'rhino': '', 'rooster': '', 'seahorse': '', 'seal': '', 'shrimp-alt': '', 'shrimp': '', 'snail-1': '', 'snail-2': '', 'snail-3': '', 'snail': '', 'snake': '', 'squid': '', 'squirrel': '', 'tiger-face': '', 'tiger': '', 'turtle': '', 'whale': '', 'woodpecker': '', 'zebra': '' }, 'brand': { 'acer': '', 'adidas': '', 'adobe': '', 'air-new-zealand': '', 'airbnb': '', 'aircell': '', 'airtel': '', 'alcatel': '', 'alibaba': '', 'aliexpress': '', 'alipay': '', 'amazon': '', 'amd': '', 'american-airlines': '', 'android-robot': '', 'android': '', 'aol': '', 'apple': '', 'appstore': '', 'asus': '', 'ati': '', 'att': '', 'audi': '', 'axiata': '', 'bada': '', 'bbc': '', 'bing': '', 'blackberry': '', 'bmw': '', 'box': '', 'burger-king': '', 'business-insider': '', 'buzzfeed': '', 'cannon': '', 'casio': '', 'china-mobile': '', 'china-telecom': '', 'china-unicom': '', 'cisco': '', 'citibank': '', 'cnet': '', 'cnn': '', 'cocal-cola': '', 'compaq': '', 'debian': '', 'delicious': '', 'dell': '', 'designbump': '', 'designfloat': '', 'disney': '', 'dodge': '', 'dove': '', 'drupal': '', 'ebay': '', 'eleven': '', 'emirates': '', 'espn': '', 'etihad-airways': '', 'etisalat': '', 'etsy': '', 'fastrack': '', 'fedex': '', 'ferrari': '', 'fitbit': '', 'flikr': '', 'forbes': '', 'foursquare': '', 'foxconn': '', 'fujitsu': '', 'general-electric': '', 'gillette': '', 'gizmodo': '', 'gnome': '', 'google': '', 'gopro': '', 'gucci': '', 'hallmark': '', 'hi5': '', 'honda': '', 'hp': '', 'hsbc': '', 'htc': '', 'huawei': '', 'hulu': '', 'hyundai': '', 'ibm': '', 'icofont': '', 'icq': '', 'ikea': '', 'imdb': '', 'indiegogo': '', 'intel': '', 'ipair': '', 'jaguar': '', 'java': '', 'joomla': '', 'kickstarter': '', 'kik': '', 'lastfm': '', 'lego': '', 'lenovo': '', 'levis': '', 'lexus': '', 'lg': '', 'life-hacker': '', 'linux-mint': '', 'linux': '', 'lionix': '', 'loreal': '', 'louis-vuitton': '', 'mac-os': '', 'marvel-app': '', 'mashable': '', 'mazda': '', 'mcdonals': '', 'mercedes': '', 'micromax': '', 'microsoft': '', 'mobileme': '', 'mobily': '', 'motorola': '', 'msi': '', 'mts': '', 'myspace': '', 'mytv': '', 'nasa': '', 'natgeo': '', 'nbc': '', 'nescafe': '', 'nestle': '', 'netflix': '', 'nexus': '', 'nike': '', 'nokia': '', 'nvidia': '', 'omega': '', 'opensuse': '', 'oracle': '', 'panasonic': '', 'paypal': '', 'pepsi': '', 'philips': '', 'pizza-hut': '', 'playstation': '', 'puma': '', 'qatar-air': '', 'qvc': '', 'readernaut': '', 'redbull': '', 'reebok': '', 'reuters': '', 'samsung': '', 'sap': '', 'saudia-airlines': '', 'scribd': '', 'shell': '', 'siemens': '', 'sk-telecom': '', 'slideshare': '', 'smashing-magazine': '', 'snapchat': '', 'sony-ericsson': '', 'sony': '', 'soundcloud': '', 'sprint': '', 'squidoo': '', 'starbucks': '', 'stc': '', 'steam': '', 'suzuki': '', 'symbian': '', 't-mobile': '', 'tango': '', 'target': '', 'tata-indicom': '', 'techcrunch': '', 'telenor': '', 'teliasonera': '', 'tesla': '', 'the-verge': '', 'thenextweb': '', 'toshiba': '', 'toyota': '', 'tribenet': '', 'ubuntu': '', 'unilever': '', 'vaio': '', 'verizon': '', 'viber': '', 'vodafone': '', 'volkswagen': '', 'walmart': '', 'warnerbros': '', 'whatsapp': '', 'wikipedia': '', 'windows': '', 'wire': '', 'wordpress': '', 'xiaomi': '', 'yahoobuzz': '', 'yamaha': '', 'youtube': '', 'zain': '', 'figma': '', 'illustrator': '', 'photoshop': '' }, 'business': { 'bank-alt': '', 'bank': '', 'barcode': '', 'bill-alt': '', 'billboard': '', 'briefcase-1': '', 'briefcase-2': '', 'businessman': '', 'businesswoman': '', 'chair': '', 'coins': '', 'company': '', 'contact-add': '', 'files-stack': '', 'handshake-deal': '', 'id-card': '', 'meeting-add': '', 'money-bag': '', 'pie-chart': '', 'presentation-alt': '', 'presentation': '', 'stamp': '', 'stock-mobile': '' }, 'chart': { 'arrows-axis': '', 'bar-graph': '', 'flow-1': '', 'flow-2': '', 'flow': '', 'growth': '', 'histogram-alt': '', 'histogram': '', 'line-alt': '', 'line': '', 'pie-alt': '', 'pie': '', 'radar-graph': '' }, 'construction': { 'architecture-alt': '', 'architecture': '', 'barricade': '', 'bolt': '', 'bricks': '', 'building-alt': '', 'bull-dozer': '', 'calculations': '', 'cement-mix': '', 'cement-mixer': '', 'concrete-mixer': '', 'danger-zone': '', 'drill': '', 'eco-energy': '', 'eco-environmen': '', 'energy-air': '', 'energy-oil': '', 'energy-savings': '', 'energy-solar': '', 'energy-water': '', 'engineer': '', 'fire-extinguisher-alt': '', 'fire-extinguisher': '', 'fix-tools': '', 'fork-lift': '', 'glue-oil': '', 'hammer-alt': '', 'hammer': '', 'help-robot': '', 'industries-1': '', 'industries-2': '', 'industries-3': '', 'industries-4': '', 'industries-5': '', 'industries': '', 'labour': '', 'mining': '', 'paint-brush': '', 'pollution': '', 'power-zone': '', 'radio-active': '', 'recycle-alt': '', 'recycling-man': '', 'safety-hat-light': '', 'safety-hat': '', 'saw': '', 'screw-driver': '', 'tools-1': '', 'tools-bag': '', 'tow-truck': '', 'trolley': '', 'trowel': '', 'under-construction-alt': '', 'under-construction': '', 'vehicle-cement': '', 'vehicle-crane': '', 'vehicle-delivery-van': '', 'vehicle-dozer': '', 'vehicle-excavator': '', 'vehicle-trucktor': '', 'vehicle-wrecking': '', 'worker': '', 'workers-group': '', 'wrench': '' }, 'currency': { 'afghani-false': '', 'afghani-minus': '', 'afghani-plus': '', 'afghani-true': '', 'afghani': '', 'baht-false': '', 'baht-minus': '', 'baht-plus': '', 'baht-true': '', 'baht': '', 'bitcoin-false': '', 'bitcoin-minus': '', 'bitcoin-plus': '', 'bitcoin-true': '', 'bitcoin': '', 'dollar-flase': '', 'dollar-minus': '', 'dollar-plus': '', 'dollar-true': '', 'dollar': '', 'dong-false': '', 'dong-minus': '', 'dong-plus': '', 'dong-true': '', 'dong': '', 'euro-false': '', 'euro-minus': '', 'euro-plus': '', 'euro-true': '', 'euro': '', 'frank-false': '', 'frank-minus': '', 'frank-plus': '', 'frank-true': '', 'frank': '', 'hryvnia-false': '', 'hryvnia-minus': '', 'hryvnia-plus': '', 'hryvnia-true': '', 'hryvnia': '', 'lira-false': '', 'lira-minus': '', 'lira-plus': '', 'lira-true': '', 'lira': '', 'peseta-false': '', 'peseta-minus': '', 'peseta-plus': '', 'peseta-true': '', 'peseta': '', 'peso-false': '', 'peso-minus': '', 'peso-plus': '', 'peso-true': '', 'peso': '', 'pound-false': '', 'pound-minus': '', 'pound-plus': '', 'pound-true': '', 'pound': '', 'renminbi-false': '', 'renminbi-minus': '', 'renminbi-plus': '', 'renminbi-true': '', 'renminbi': '', 'riyal-false': '', 'riyal-minus': '', 'riyal-plus': '', 'riyal-true': '', 'riyal': '', 'rouble-false': '', 'rouble-minus': '', 'rouble-plus': '', 'rouble-true': '', 'rouble': '', 'rupee-false': '', 'rupee-minus': '', 'rupee-plus': '', 'rupee-true': '', 'rupee': '', 'taka-false': '', 'taka-minus': '', 'taka-plus': '', 'taka-true': '', 'taka': '', 'turkish-lira-false': '', 'turkish-lira-minus': '', 'turkish-lira-plus': '', 'turkish-lira-true': '', 'turkish-lira': '', 'won-false': '', 'won-minus': '', 'won-plus': '', 'won-true': '', 'won': '', 'yen-false': '', 'yen-minus': '', 'yen-plus': '', 'yen-true': '', 'yen': '' }, 'device': { 'android-nexus': '', 'android-tablet': '', 'apple-watch': '', 'drawing-tablet': '', 'earphone': '', 'flash-drive': '', 'game-console': '', 'game-controller': '', 'game-pad': '', 'game': '', 'headphone-alt-1': '', 'headphone-alt-2': '', 'headphone-alt-3': '', 'headphone-alt': '', 'headphone': '', 'htc-one': '', 'imac': '', 'ipad': '', 'iphone': '', 'ipod-nano': '', 'ipod-touch': '', 'keyboard-alt': '', 'keyboard-wireless': '', 'keyboard': '', 'laptop-alt': '', 'laptop': '', 'macbook': '', 'magic-mouse': '', 'micro-chip': '', 'microphone-alt': '', 'microphone': '', 'monitor': '', 'mouse': '', 'mp3-player': '', 'nintendo': '', 'playstation-alt': '', 'psvita': '', 'radio-mic': '', 'radio': '', 'refrigerator': '', 'samsung-galaxy': '', 'surface-tablet': '', 'ui-head-phone': '', 'ui-keyboard': '', 'washing-machine': '', 'wifi-router': '', 'wii-u': '', 'windows-lumia': '', 'wireless-mouse': '', 'xbox-360': '' }, 'direction': { 'arrow-down': '', 'arrow-left': '', 'arrow-right': '', 'arrow-up': '', 'block-down': '', 'block-left': '', 'block-right': '', 'block-up': '', 'bubble-down': '', 'bubble-left': '', 'bubble-right': '', 'bubble-up': '', 'caret-down': '', 'caret-left': '', 'caret-right': '', 'caret-up': '', 'circled-down': '', 'circled-left': '', 'circled-right': '', 'circled-up': '', 'collapse': '', 'cursor-drag': '', 'curved-double-left': '', 'curved-double-right': '', 'curved-down': '', 'curved-left': '', 'curved-right': '', 'curved-up': '', 'dotted-down': '', 'dotted-left': '', 'dotted-right': '', 'dotted-up': '', 'double-left': '', 'double-right': '', 'expand-alt': '', 'hand-down': '', 'hand-drag': '', 'hand-drag1': '', 'hand-drag2': '', 'hand-drawn-alt-down': '', 'hand-drawn-alt-left': '', 'hand-drawn-alt-right': '', 'hand-drawn-alt-up': '', 'hand-drawn-down': '', 'hand-drawn-left': '', 'hand-drawn-right': '', 'hand-drawn-up': '', 'hand-grippers': '', 'hand-left': '', 'hand-right': '', 'hand-up': '', 'line-block-down': '', 'line-block-left': '', 'line-block-right': '', 'line-block-up': '', 'long-arrow-down': '', 'long-arrow-left': '', 'long-arrow-right': '', 'long-arrow-up': '', 'rounded-collapse': '', 'rounded-double-left': '', 'rounded-double-right': '', 'rounded-down': '', 'rounded-expand': '', 'rounded-left-down': '', 'rounded-left-up': '', 'rounded-left': '', 'rounded-right-down': '', 'rounded-right-up': '', 'rounded-right': '', 'rounded-up': '', 'scroll-bubble-down': '', 'scroll-bubble-left': '', 'scroll-bubble-right': '', 'scroll-bubble-up': '', 'scroll-double-down': '', 'scroll-double-left': '', 'scroll-double-right': '', 'scroll-double-up': '', 'scroll-down': '', 'scroll-left': '', 'scroll-long-down': '', 'scroll-long-left': '', 'scroll-long-right': '', 'scroll-long-up': '', 'scroll-right': '', 'scroll-up': '', 'simple-down': '', 'simple-left-down': '', 'simple-left-up': '', 'simple-left': '', 'simple-right-down': '', 'simple-right-up': '', 'simple-right': '', 'simple-up': '', 'square-down': '', 'square-left': '', 'square-right': '', 'square-up': '', 'stylish-down': '', 'stylish-left': '', 'stylish-right': '', 'stylish-up': '', 'swoosh-down': '', 'swoosh-left': '', 'swoosh-right': '', 'swoosh-up': '', 'thin-double-left': '', 'thin-double-right': '', 'thin-down': '', 'thin-left': '', 'thin-right': '', 'thin-up': '' }, 'education': { 'abc': '', 'atom': '', 'award': '', 'bell-alt': '', 'black-board': '', 'book-alt': '', 'book': '', 'brainstorming': '', 'certificate-alt-1': '', 'certificate-alt-2': '', 'certificate': '', 'study': '', 'electron': '', 'fountain-pen': '', 'globe-alt': '', 'graduate-alt': '', 'graduate': '', 'group-students': '', 'hat-alt': '', 'hat': '', 'instrument': '', 'lamp-light': '', 'medal': '', 'microscope-alt': '', 'microscope': '', 'paper': '', 'pen-alt-4': '', 'pen-nib': '', 'pencil-alt-5': '', 'quill-pen': '', 'read-book-alt': '', 'read-book': '', 'school-bag': '', 'school-bus': '', 'student-alt': '', 'student': '', 'teacher': '', 'test-bulb': '', 'test-tube-alt': '', 'university': '' }, 'emoticon': { 'angry': '', 'astonished': '', 'confounded': '', 'confused': '', 'crying': '', 'dizzy': '', 'expressionless': '', 'heart-eyes': '', 'laughing': '', 'nerd-smile': '', 'open-mouth': '', 'rage': '', 'rolling-eyes': '', 'sad': '', 'simple-smile': '', 'slightly-smile': '', 'smirk': '', 'stuck-out-tongue': '', 'wink-smile': '', 'worried': '' }, 'filetype': { 'alt': '', 'audio': '', 'avi-mp4': '', 'bmp': '', 'code': '', 'css': '', 'document': '', 'eps': '', 'excel': '', 'exe': '', 'file': '', 'flv': '', 'gif': '', 'html5': '', 'image': '', 'iso': '', 'java': '', 'javascript': '', 'jpg': '', 'midi': '', 'mov': '', 'mp3': '', 'pdf': '', 'php': '', 'png': '', 'powerpoint': '', 'presentation': '', 'psb': '', 'psd': '', 'python': '', 'ruby': '', 'spreadsheet': '', 'sql': '', 'svg': '', 'text': '', 'tiff': '', 'video': '', 'wave': '', 'wmv': '', 'word': '', 'zip': '' }, 'fitness': { 'cycling-alt': '', 'cycling': '', 'dumbbell': '', 'dumbbells': '', 'gym-alt-1': '', 'gym-alt-2': '', 'gym-alt-3': '', 'gym': '', 'muscle-weight': '', 'muscle': '' }, 'food': { 'apple': '', 'arabian-coffee': '', 'artichoke': '', 'asparagus': '', 'avocado': '', 'baby-food': '', 'banana': '', 'bbq': '', 'beans': '', 'beer': '', 'bell-pepper-capsicum': '', 'birthday-cake': '', 'bread': '', 'broccoli': '', 'burger': '', 'cabbage': '', 'carrot': '', 'cauli-flower': '', 'cheese': '', 'chef': '', 'cherry': '', 'chicken-fry': '', 'chicken': '', 'cocktail': '', 'coconut-water': '', 'coconut': '', 'coffee-alt': '', 'coffee-cup': '', 'coffee-mug': '', 'coffee-pot': '', 'cola': '', 'corn': '', 'croissant': '', 'crop-plant': '', 'cucumber': '', 'culinary': '', 'cup-cake': '', 'dining-table': '', 'donut': '', 'egg-plant': '', 'egg-poached': '', 'farmer-alt': '', 'farmer': '', 'fast-food': '', 'food-basket': '', 'food-cart': '', 'fork-and-knife': '', 'french-fries': '', 'fruits': '', 'grapes': '', 'honey': '', 'hot-dog': '', 'ice-cream-alt': '', 'ice-cream': '', 'juice': '', 'ketchup': '', 'kiwi': '', 'layered-cake': '', 'lemon-alt': '', 'lemon': '', 'lobster': '', 'mango': '', 'milk': '', 'mushroom': '', 'noodles': '', 'onion': '', 'orange': '', 'pear': '', 'peas': '', 'pepper': '', 'pie-alt': '', 'pie': '', 'pineapple': '', 'pizza-slice': '', 'pizza': '', 'plant': '', 'popcorn': '', 'potato': '', 'pumpkin': '', 'raddish': '', 'restaurant-menu': '', 'restaurant': '', 'salt-and-pepper': '', 'sandwich': '', 'sausage': '', 'soft-drinks': '', 'soup-bowl': '', 'spoon-and-fork': '', 'steak': '', 'strawberry': '', 'sub-sandwich': '', 'sushi': '', 'taco': '', 'tea-pot': '', 'tea': '', 'tomato': '', 'watermelon': '', 'wheat': '' }, 'kids': { 'baby-backpack': '', 'baby-cloth': '', 'baby-milk-bottle': '', 'baby-trolley': '', 'baby': '', 'candy': '', 'holding-hands': '', 'infant-nipple': '', 'scooter': '', 'safety-pin': '', 'teddy-bear': '', 'toy-ball': '', 'toy-cat': '', 'toy-duck': '', 'toy-elephant': '', 'toy-hand': '', 'toy-horse': '', 'toy-lattu': '', 'toy-train': '' }, 'law': { 'burglar': '', 'cannon-firing': '', 'cc-camera': '', 'cop-badge': '', 'cop': '', 'court-hammer': '', 'court': '', 'finger-print': '', 'gavel': '', 'handcuff-alt': '', 'handcuff': '', 'investigation': '', 'investigator': '', 'jail': '', 'judge': '', 'alt-1': '', 'alt-2': '', 'alt-3': '', 'book': '', 'document': '', 'order': '', 'protect': '', 'scales': '', 'law': '', 'lawyer-alt-1': '', 'lawyer-alt-2': '', 'lawyer': '', 'legal': '', 'pistol': '', 'police-badge': '', 'police-cap': '', 'police-car-alt-1': '', 'police-car-alt-2': '', 'police-car': '', 'police-hat': '', 'police-van': '', 'police': '', 'thief-alt': '', 'thief': '' }, 'mathematics': { 'abacus-alt': '', 'abacus': '', 'angle-180': '', 'angle-45': '', 'angle-90': '', 'angle': '', 'calculator-alt-1': '', 'calculator-alt-2': '', 'calculator': '', 'circle-ruler-alt': '', 'circle-ruler': '', 'compass-alt-1': '', 'compass-alt-2': '', 'compass-alt-3': '', 'compass-alt-4': '', 'golden-ratio': '', 'marker-alt-1': '', 'marker-alt-2': '', 'marker-alt-3': '', 'marker': '', 'math': '', 'mathematical-alt-1': '', 'mathematical-alt-2': '', 'mathematical': '', 'pen-alt-1': '', 'pen-alt-2': '', 'pen-alt-3': '', 'pen-holder-alt-1': '', 'pen-holder': '', 'pen': '', 'pencil-alt-1': '', 'pencil-alt-2': '', 'pencil-alt-3': '', 'pencil-alt-4': '', 'pencil': '', 'ruler-alt-1': '', 'ruler-alt-2': '', 'ruler-compass-alt': '', 'ruler-compass': '', 'ruler-pencil-alt-1': '', 'ruler-pencil-alt-2': '', 'ruler-pencil': '', 'ruler': '', 'rulers-alt': '', 'rulers': '', 'square-root': '', 'ui-calculator': '' }, 'medical': { 'aids': '', 'ambulance-crescent': '', 'ambulance-cross': '', 'ambulance': '', 'autism': '', 'bandage': '', 'blind': '', 'blood-drop': '', 'blood-test': '', 'blood': '', 'brain-alt': '', 'brain': '', 'capsule': '', 'crutch': '', 'disabled': '', 'dna-alt-1': '', 'dna-alt-2': '', 'dna': '', 'doctor-alt': '', 'doctor': '', 'drug-pack': '', 'drug': '', 'first-aid-alt': '', 'first-aid': '', 'heart-beat-alt': '', 'heart-beat': '', 'heartbeat': '', 'herbal': '', 'hospital': '', 'icu': '', 'injection-syringe': '', 'laboratory': '', 'sign-alt': '', 'sign': '', 'nurse-alt': '', 'nurse': '', 'nursing-home': '', 'operation-theater': '', 'paralysis-disability': '', 'patient-bed': '', 'patient-file': '', 'pills': '', 'prescription': '', 'pulse': '', 'stethoscope-alt': '', 'stethoscope': '', 'stretcher': '', 'surgeon-alt': '', 'surgeon': '', 'tablets': '', 'test-bottle': '', 'test-tube': '', 'thermometer-alt': '', 'thermometer': '', 'tooth': '', 'xray': '' }, 'mobileUI': { 'ui-add': '', 'ui-alarm': '', 'ui-battery': '', 'ui-block': '', 'ui-bluetooth': '', 'ui-brightness': '', 'ui-browser': '', 'ui-calendar': '', 'ui-call': '', 'ui-camera': '', 'ui-cart': '', 'ui-cell-phone': '', 'ui-chat': '', 'ui-check': '', 'ui-clip-board': '', 'ui-clip': '', 'ui-clock': '', 'ui-close': '', 'ui-contact-list': '', 'ui-copy': '', 'ui-cut': '', 'ui-delete': '', 'ui-dial-phone': '', 'ui-edit': '', 'ui-email': '', 'ui-file': '', 'ui-fire-wall': '', 'ui-flash-light': '', 'ui-flight': '', 'ui-folder': '', 'ui-game': '', 'ui-handicapped': '', 'ui-home': '', 'ui-image': '', 'ui-laoding': '', 'ui-lock': '', 'ui-love-add': '', 'ui-love-broken': '', 'ui-love-remove': '', 'ui-love': '', 'ui-map': '', 'ui-message': '', 'ui-messaging': '', 'ui-movie': '', 'ui-music-player': '', 'ui-music': '', 'ui-mute': '', 'ui-network': '', 'ui-next': '', 'ui-note': '', 'ui-office': '', 'ui-password': '', 'ui-pause': '', 'ui-play-stop': '', 'ui-play': '', 'ui-pointer': '', 'ui-power': '', 'ui-press': '', 'ui-previous': '', 'ui-rate-add': '', 'ui-rate-blank': '', 'ui-rate-remove': '', 'ui-rating': '', 'ui-record': '', 'ui-remove': '', 'ui-reply': '', 'ui-rotation': '', 'ui-rss': '', 'ui-search': '', 'ui-settings': '', 'ui-social-link': '', 'ui-tag': '', 'ui-text-chat': '', 'ui-text-loading': '', 'ui-theme': '', 'ui-timer': '', 'ui-touch-phone': '', 'ui-travel': '', 'ui-unlock': '', 'ui-user-group': '', 'ui-user': '', 'ui-v-card': '', 'ui-video-chat': '', 'ui-video-message': '', 'ui-video-play': '', 'ui-video': '', 'ui-volume': '', 'ui-weather': '', 'ui-wifi': '', 'ui-zoom-in': '', 'ui-zoom-out': '' }, 'multimedia': { 'cassette-player': '', 'cassette': '', 'forward': '', 'guiter': '', 'movie': '', 'media': '', 'music-alt': '', 'music-disk': '', 'music-note': '', 'music-notes': '', 'music': '', 'mute-volume': '', 'pause': '', 'play-alt-1': '', 'play-alt-2': '', 'play-alt-3': '', 'play-pause': '', 'play': '', 'record': '', 'retro-music-disk': '', 'rewind': '', 'song-notes': '', 'sound-wave-alt': '', 'sound-wave': '', 'stop': '', 'video-alt': '', 'video-cam': '', 'video-clapper': '', 'video': '', 'volume-bar': '', 'volume-down': '', 'volume-mute': '', 'volume-off': '', 'volume-up': '', 'youtube-play': '' }, 'payment': { '2checkout-alt': '', '2checkout': '', 'amazon-alt': '', 'amazon': '', 'american-express-alt': '', 'american-express': '', 'apple-pay-alt': '', 'apple-pay': '', 'bank-transfer-alt': '', 'bank-transfer': '', 'braintree-alt': '', 'braintree': '', 'cash-on-delivery-alt': '', 'cash-on-delivery': '', 'diners-club-alt-1': '', 'diners-club-alt-2': '', 'diners-club-alt-3': '', 'diners-club': '', 'discover-alt': '', 'discover': '', 'eway-alt': '', 'eway': '', 'google-wallet-alt-1': '', 'google-wallet-alt-2': '', 'google-wallet-alt-3': '', 'google-wallet': '', 'jcb-alt': '', 'jcb': '', 'maestro-alt': '', 'maestro': '', 'mastercard-alt': '', 'mastercard': '', 'payoneer-alt': '', 'payoneer': '', 'paypal-alt': '', 'paypal': '', 'sage-alt': '', 'sage': '', 'skrill-alt': '', 'skrill': '', 'stripe-alt': '', 'stripe': '', 'visa-alt': '', 'visa-electron': '', 'visa': '', 'western-union-alt': '', 'western-union': '' }, 'person': { 'boy': '', 'business-man-alt-1': '', 'business-man-alt-2': '', 'business-man-alt-3': '', 'business-man': '', 'female': '', 'funky-man': '', 'girl-alt': '', 'girl': '', 'group': '', 'hotel-boy-alt': '', 'hotel-boy': '', 'kid': '', 'man-in-glasses': '', 'people': '', 'support': '', 'user-alt-1': '', 'user-alt-2': '', 'user-alt-3': '', 'user-alt-4': '', 'user-alt-5': '', 'user-alt-6': '', 'user-alt-7': '', 'user-female': '', 'user-male': '', 'user-suited': '', 'user': '', 'users-alt-1': '', 'users-alt-2': '', 'users-alt-3': '', 'users-alt-4': '', 'users-alt-5': '', 'users-alt-6': '', 'users-social': '', 'users': '', 'waiter-alt': '', 'waiter': '', 'woman-in-glasses': '' }, 'search': { '1': '', '2': '', 'document': '', 'folder': '', 'job': '', 'map': '', 'property': '', 'restaurant': '', 'stock': '', 'user': '', 'search': '' }, 'social': { '500px': '', 'aim': '', 'badoo': '', 'baidu-tieba': '', 'bbm-messenger': '', 'bebo': '', 'behance': '', 'blogger': '', 'bootstrap': '', 'brightkite': '', 'cloudapp': '', 'concrete5': '', 'delicious': '', 'designbump': '', 'designfloat': '', 'deviantart': '', 'digg': '', 'discord': '', 'dotcms': '', 'dribbble': '', 'dribble': '', 'dropbox': '', 'ebuddy': '', 'ello': '', 'ember': '', 'envato': '', 'evernote': '', 'facebook-messenger': '', 'facebook': '', 'feedburner': '', 'flikr': '', 'folkd': '', 'foursquare': '', 'friendfeed': '', 'ghost': '', 'github': '', 'gnome': '', 'google-buzz': '', 'google-hangouts': '', 'google-map': '', 'google-plus': '', 'google-talk': '', 'hype-machine': '', 'instagram': '', 'kakaotalk': '', 'kickstarter': '', 'kik': '', 'kiwibox': '', 'line-messenger': '', 'line': '', 'linkedin': '', 'linux-mint': '', 'live-messenger': '', 'livejournal': '', 'magento': '', 'meetme': '', 'meetup': '', 'mixx': '', 'newsvine': '', 'nimbuss': '', 'odnoklassniki': '', 'opencart': '', 'oscommerce': '', 'pandora': '', 'photobucket': '', 'picasa': '', 'pinterest': '', 'prestashop': '', 'qik': '', 'qq': '', 'readernaut': '', 'reddit': '', 'renren': '', 'rss': '', 'shopify': '', 'silverstripe': '', 'skype': '', 'slack': '', 'slashdot': '', 'slidshare': '', 'smugmug': '', 'snapchat': '', 'soundcloud': '', 'spotify': '', 'stack-exchange': '', 'stack-overflow': '', 'steam': '', 'stumbleupon': '', 'tagged': '', 'technorati': '', 'telegram': '', 'tiktok': '', 'tinder': '', 'trello': '', 'tumblr': '', 'twitch': '', 'twitter': '', 'typo3': '', 'ubercart': '', 'viber': '', 'viddler': '', 'vimeo': '', 'vine': '', 'virb': '', 'virtuemart': '', 'vk': '', 'wechat': '', 'weibo': '', 'whatsapp': '', 'xing': '', 'yahoo': '', 'yelp': '', 'youku': '', 'youtube': '', 'zencart': '' }, 'sport': { 'badminton-birdie': '', 'baseball': '', 'baseballer': '', 'basketball-hoop': '', 'basketball': '', 'billiard-ball': '', 'boot-alt-1': '', 'boot-alt-2': '', 'boot': '', 'bowling-alt': '', 'bowling': '', 'canoe': '', 'cheer-leader': '', 'climbing': '', 'corner': '', 'field-alt': '', 'field': '', 'football-alt': '', 'football-american': '', 'football': '', 'foul': '', 'goal-keeper': '', 'goal': '', 'golf-alt': '', 'golf-bag': '', 'golf-cart': '', 'golf-field': '', 'golf': '', 'golfer': '', 'helmet': '', 'hockey-alt': '', 'hockey': '', 'ice-skate': '', 'jersey-alt': '', 'jersey': '', 'jumping': '', 'kick': '', 'leg': '', 'match-review': '', 'medal-sport': '', 'offside': '', 'olympic-logo': '', 'olympic': '', 'padding': '', 'penalty-card': '', 'racer': '', 'racing-car': '', 'racing-flag-alt': '', 'racing-flag': '', 'racings-wheel': '', 'referee': '', 'refree-jersey': '', 'result-sport': '', 'rugby-ball': '', 'rugby-player': '', 'rugby': '', 'runner-alt-1': '', 'runner-alt-2': '', 'runner': '', 'score-board': '', 'skiing-man': '', 'skydiving-goggles': '', 'snow-mobile': '', 'steering': '', 'stopwatch': '', 'substitute': '', 'swimmer': '', 'table-tennis': '', 'team-alt': '', 'team': '', 'tennis-player': '', 'tennis': '', 'tracking': '', 'trophy-alt': '', 'trophy': '', 'volleyball-alt': '', 'volleyball-fire': '', 'volleyball': '', 'water-bottle': '', 'whistle-alt': '', 'whistle': '', 'win-trophy': '' }, 'texteditor': { 'align-center': '', 'align-left': '', 'align-right': '', 'all-caps': '', 'bold': '', 'brush': '', 'clip-board': '', 'code-alt': '', 'color-bucket': '', 'color-picker': '', 'copy-invert': '', 'copy': '', 'cut': '', 'delete-alt': '', 'edit-alt': '', 'eraser-alt': '', 'font': '', 'heading': '', 'indent': '', 'italic-alt': '', 'italic': '', 'justify-all': '', 'justify-center': '', 'justify-left': '', 'justify-right': '', 'link-broken': '', 'outdent': '', 'paper-clip': '', 'paragraph': '', 'pin': '', 'printer': '', 'redo': '', 'rotation': '', 'save': '', 'small-cap': '', 'strike-through': '', 'sub-listing': '', 'subscript': '', 'superscript': '', 'table': '', 'height': '', 'width': '', 'trash': '', 'underline': '', 'undo': '' }, 'transport': { 'air-balloon': '', 'airplane-alt': '', 'airplane': '', 'articulated-truck': '', 'auto-mobile': '', 'auto-rickshaw': '', 'bicycle-alt-1': '', 'bicycle-alt-2': '', 'bicycle': '', 'bus-alt-1': '', 'bus-alt-2': '', 'bus-alt-3': '', 'bus': '', 'cab': '', 'cable-car': '', 'car-alt-1': '', 'car-alt-2': '', 'car-alt-3': '', 'car-alt-4': '', 'car': '', 'delivery-time': '', 'fast-delivery': '', 'fire-truck-alt': '', 'fire-truck': '', 'free-delivery': '', 'helicopter': '', 'motor-bike-alt': '', 'motor-bike': '', 'motor-biker': '', 'oil-truck': '', 'rickshaw': '', 'rocket-alt-1': '', 'rocket-alt-2': '', 'rocket': '', 'sail-boat-alt-1': '', 'sail-boat-alt-2': '', 'sail-boat': '', 'scooter': '', 'sea-plane': '', 'ship-alt': '', 'ship': '', 'speed-boat': '', 'taxi': '', 'tractor': '', 'train-line': '', 'train-steam': '', 'tram': '', 'truck-alt': '', 'truck-loaded': '', 'truck': '', 'van-alt': '', 'van': '', 'yacht': '' }, 'travel': { '5-star-hotel': '', 'air-ticket': '', 'beach-bed': '', 'beach': '', 'camping-vest': '', 'direction-sign': '', 'hill-side': '', 'hill': '', 'hotel': '', 'island-alt': '', 'island': '', 'sandals-female': '', 'sandals-male': '', 'travelling': '' }, 'weather': { 'breakdown': '', 'celsius': '', 'clouds': '', 'cloudy': '', 'dust': '', 'eclipse': '', 'fahrenheit': '', 'forest-fire': '', 'full-night': '', 'full-sunny': '', 'hail-night': '', 'hail-rainy-night': '', 'hail-rainy-sunny': '', 'hail-rainy': '', 'hail-sunny': '', 'hail-thunder-night': '', 'hail-thunder-sunny': '', 'hail-thunder': '', 'hail': '', 'hill-night': '', 'hill-sunny': '', 'hurricane': '', 'meteor': '', 'night': '', 'rainy-night': '', 'rainy-sunny': '', 'rainy-thunder': '', 'rainy': '', 'snow-alt': '', 'snow-flake': '', 'snow-temp': '', 'snow': '', 'snowy-hail': '', 'snowy-night-hail': '', 'snowy-night-rainy': '', 'snowy-night': '', 'snowy-rainy': '', 'snowy-sunny-hail': '', 'snowy-sunny-rainy': '', 'snowy-sunny': '', 'snowy-thunder-night': '', 'snowy-thunder-sunny': '', 'snowy-thunder': '', 'snowy-windy-night': '', 'snowy-windy-sunny': '', 'snowy-windy': '', 'snowy': '', 'sun-alt': '', 'sun-rise': '', 'sun-set': '', 'sun': '', 'sunny-day-temp': '', 'sunny': '', 'thunder-light': '', 'tornado': '', 'umbrella-alt': '', 'umbrella': '', 'volcano': '', 'wave': '', 'wind-scale-0': '', 'wind-scale-1': '', 'wind-scale-10': '', 'wind-scale-11': '', 'wind-scale-12': '', 'wind-scale-2': '', 'wind-scale-3': '', 'wind-scale-4': '', 'wind-scale-5': '', 'wind-scale-6': '', 'wind-scale-7': '', 'wind-scale-8': '', 'wind-scale-9': '', 'wind-waves': '', 'wind': '', 'windy-hail': '', 'windy-night': '', 'windy-raining': '', 'windy-sunny': '', 'windy-thunder-raining': '', 'windy-thunder': '', 'windy': '' }, 'web': { 'addons': '', 'address-book': '', 'adjust': '', 'alarm': '', 'anchor': '', 'archive': '', 'at': '', 'attachment': '', 'audio': '', 'automation': '', 'badge': '', 'bag-alt': '', 'bag': '', 'ban': '', 'bar-code': '', 'bars': '', 'basket': '', 'battery-empty': '', 'battery-full': '', 'battery-half': '', 'battery-low': '', 'beaker': '', 'beard': '', 'bed': '', 'bell': '', 'beverage': '', 'bill': '', 'bin': '', 'binary': '', 'binoculars': '', 'bluetooth': '', 'bomb': '', 'book-mark': '', 'box': '', 'briefcase': '', 'broken': '', 'bucket': '', 'bucket1': '', 'bucket2': '', 'bug': '', 'building': '', 'bulb-alt': '', 'bullet': '', 'bullhorn': '', 'bullseye': '', 'calendar': '', 'camera-alt': '', 'camera': '', 'card': '', 'cart-alt': '', 'cart': '', 'cc': '', 'charging': '', 'chat': '', 'check-alt': '', 'check-circled': '', 'check': '', 'checked': '', 'children-care': '', 'clip': '', 'clock-time': '', 'close-circled': '', 'close-line-circled': '', 'close-line-squared-alt': '', 'close-line-squared': '', 'close-line': '', 'close-squared-alt': '', 'close-squared': '', 'close': '', 'cloud-download': '', 'cloud-refresh': '', 'cloud-upload': '', 'cloud': '', 'code-not-allowed': '', 'code': '', 'comment': '', 'compass-alt': '', 'compass': '', 'computer': '', 'connection': '', 'console': '', 'contacts': '', 'contrast': '', 'copyright': '', 'credit-card': '', 'crop': '', 'crown': '', 'cube': '', 'cubes': '', 'dashboard-web': '', 'dashboard': '', 'data': '', 'database-add': '', 'database-locked': '', 'database-remove': '', 'database': '', 'delete': '', 'diamond': '', 'dice-multiple': '', 'dice': '', 'disc': '', 'diskette': '', 'document-folder': '', 'download-alt': '', 'download': '', 'downloaded': '', 'drag': '', 'drag1': '', 'drag2': '', 'drag3': '', 'earth': '', 'ebook': '', 'edit': '', 'eject': '', 'email': '', 'envelope-open': '', 'envelope': '', 'eraser': '', 'error': '', 'excavator': '', 'exchange': '', 'exclamation-circle': '', 'exclamation-square': '', 'exclamation-tringle': '', 'exclamation': '', 'exit': '', 'expand': '', 'external-link': '', 'external': '', 'eye-alt': '', 'eye-blocked': '', 'eye-dropper': '', 'eye': '', 'favourite': '', 'fax': '', 'fill': '', 'film': '', 'filter': '', 'fire-alt': '', 'fire-burn': '', 'fire': '', 'flag-alt-1': '', 'flag-alt-2': '', 'flag': '', 'flame-torch': '', 'flash-light': '', 'flash': '', 'flask': '', 'focus': '', 'folder-open': '', 'folder': '', 'foot-print': '', 'garbage': '', 'gear-alt': '', 'gear': '', 'gears': '', 'gift': '', 'glass': '', 'globe': '', 'graffiti': '', 'grocery': '', 'hand': '', 'hanger': '', 'hard-disk': '', 'heart-alt': '', 'heart': '', 'history': '', 'home': '', 'horn': '', 'hour-glass': '', 'id': '', 'image': '', 'inbox': '', 'infinite': '', 'info-circle': '', 'info-square': '', 'info': '', 'institution': '', 'interface': '', 'invisible': '', 'jacket': '', 'jar': '', 'jewlery': '', 'karate': '', 'key-hole': '', 'key': '', 'label': '', 'lamp': '', 'layers': '', 'layout': '', 'leaf': '', 'leaflet': '', 'learn': '', 'lego': '', 'lens': '', 'letter': '', 'letterbox': '', 'library': '', 'license': '', 'life-bouy': '', 'life-buoy': '', 'life-jacket': '', 'life-ring': '', 'light-bulb': '', 'lighter': '', 'lightning-ray': '', 'like': '', 'line-height': '', 'link-alt': '', 'link': '', 'list': '', 'listening': '', 'listine-dots': '', 'listing-box': '', 'listing-number': '', 'live-support': '', 'location-arrow': '', 'location-pin': '', 'lock': '', 'login': '', 'logout': '', 'lollipop': '', 'long-drive': '', 'look': '', 'loop': '', 'luggage': '', 'lunch': '', 'lungs': '', 'magic-alt': '', 'magic': '', 'magnet': '', 'mail-box': '', 'mail': '', 'male': '', 'map-pins': '', 'map': '', 'maximize': '', 'measure': '', 'medicine': '', 'mega-phone': '', 'megaphone-alt': '', 'megaphone': '', 'memorial': '', 'memory-card': '', 'mic-mute': '', 'mic': '', 'military': '', 'mill': '', 'minus-circle': '', 'minus-square': '', 'minus': '', 'mobile-phone': '', 'molecule': '', 'money': '', 'moon': '', 'mop': '', 'muffin': '', 'mustache': '', 'navigation-menu': '', 'navigation': '', 'network-tower': '', 'network': '', 'news': '', 'newspaper': '', 'no-smoking': '', 'not-allowed': '', 'notebook': '', 'notepad': '', 'notification': '', 'numbered': '', 'opposite': '', 'optic': '', 'options': '', 'package': '', 'page': '', 'paint': '', 'paper-plane': '', 'paperclip': '', 'papers': '', 'pay': '', 'penguin-linux': '', 'pestle': '', 'phone-circle': '', 'phone': '', 'picture': '', 'pine': '', 'pixels': '', 'plugin': '', 'plus-circle': '', 'plus-square': '', 'plus': '', 'polygonal': '', 'power': '', 'price': '', 'print': '', 'puzzle': '', 'qr-code': '', 'queen': '', 'question-circle': '', 'question-square': '', 'question': '', 'quote-left': '', 'quote-right': '', 'random': '', 'recycle': '', 'refresh': '', 'repair': '', 'reply-all': '', 'reply': '', 'resize': '', 'responsive': '', 'retweet': '', 'road': '', 'robot': '', 'royal': '', 'rss-feed': '', 'safety': '', 'sale-discount': '', 'sass': '', 'satellite': '', 'send-mail': '', 'server': '', 'settings-alt': '', 'settings': '', 'share-alt': '', 'share-boxed': '', 'share': '', 'shield': '', 'shopping-cart': '', 'sign-in': '', 'sign-out': '', 'signal': '', 'site-map': '', 'smart-phone': '', 'soccer': '', 'sort-alt': '', 'sort': '', 'space': '', 'spanner': '', 'speech-comments': '', 'speed-meter': '', 'spinner-alt-1': '', 'spinner-alt-2': '', 'spinner-alt-3': '', 'spinner-alt-4': '', 'spinner-alt-5': '', 'spinner-alt-6': '', 'spinner': '', 'spreadsheet': '', 'square': '', 'ssl-security': '', 'star-alt-1': '', 'star-alt-2': '', 'star': '', 'street-view': '', 'support-faq': '', 'tack-pin': '', 'tag': '', 'tags': '', 'tasks-alt': '', 'tasks': '', 'telephone': '', 'telescope': '', 'terminal': '', 'thumbs-down': '', 'thumbs-up': '', 'tick-boxed': '', 'tick-mark': '', 'ticket': '', 'tie': '', 'toggle-off': '', 'toggle-on': '', 'tools-alt-2': '', 'tools': '', 'touch': '', 'traffic-light': '', 'transparent': '', 'tree': '', 'unique-idea': '', 'unlock': '', 'unlocked': '', 'upload-alt': '', 'upload': '', 'usb-drive': '', 'usb': '', 'vector-path': '', 'verification-check': '', 'visual-studio': '', 'vscode': '', 'vuejs': '', 'wall-clock': '', 'wall': '', 'wallet': '', 'warning-alt': '', 'warning': '', 'water-drop': '', 'web': '', 'wheelchair': '', 'wifi-alt': '', 'wifi': '', 'world': '', 'zigzag': '', 'zipped': '' } },
      icoFontsListFilt: {},
      emojiBlock: false,
    }
  },
  props: {
    msgsNumber: {
      type: Number,
      // default: 0
    }
  },
  methods: {
    toInputEmoji(text: string) {
      const formInput = document.querySelector('.form-input') as HTMLDivElement;
      formInput.innerText += text;
      this.autosize();
    },
    emojiName(name: string) {
      const searchEmoji = document.querySelector('.emojiSearch') as HTMLInputElement;
      searchEmoji.placeholder = name + '';
    },
    autosize() {
      const textArea = document.querySelector('.form-input') as HTMLTextAreaElement;
      const formBtnBlock = document.querySelector('.form-btns_block') as HTMLElement;

      if (textArea.innerText.length < 110) {
        formBtnBlock.style.width = 'max-content';
        formBtnBlock.style.flexWrap = 'unset'
        textArea.style.cssText = 'height: auto'
      }

      textArea.scrollHeight < 400 ? textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px' : textArea.style.cssText = 'height: 400px'; // а это свойство будет увеличивать высоту в зависимости от высоту текста

      if (window.innerWidth > 992) {
        formBtnBlock.style.width = (+textArea.scrollHeight > 80 && +textArea.scrollHeight < 170) ? '100px' :
          (+textArea.scrollHeight > 170) ? '55px' : 'max-content';
        formBtnBlock.style.flexWrap = (+textArea.scrollHeight > 80) ? 'wrap' : 'nowrap';
      }

      const mainCenterSize: number = (window.innerHeight > 1080 ? 235 : 110) + (textArea.offsetHeight - 25); // 25 высота scroll при одной линии строки, а 127 высота main__center на макете
      this.$emit('mainCenterSize', mainCenterSize);

      // TODO: сделать адаптив для меню кнопок отправки типов файлов который появляется при max-width: 992px

      // console.log(textArea.innerText);
      console.log(textArea.scrollHeight);
    },
    searchEmoji() {
      const emojiSearch = document.querySelector('.emojiSearch') as HTMLInputElement;
      const keyToFilter: string = emojiSearch.value.toLowerCase().trim();
      const listItems = document.querySelectorAll('.icofont') as NodeListOf<HTMLLIElement>;

      if (keyToFilter) {
        listItems.forEach((item: HTMLLIElement) => {
          item.classList[0].includes(keyToFilter) ? item.style.display = 'block' : item.style.display = 'none';
        });
      } else {
        listItems.forEach((item: HTMLLIElement) => {
          item.style.display = 'block';
        });
      }

      /* const emojiSearch = document.querySelector('.emojiSearch') as HTMLInputElement;
      const keyToFilter: string = emojiSearch.value.toLowerCase().trim();
      let result: object = {};
      const icoFontsList: object = this.icoFontsList;

      if (keyToFilter.length > 0) {
         Object.entries(icoFontsList).flatMap(function (key, value) {
          if (key[0].includes(keyToFilter)) {
            result = Object.assign(result, {[key[0]]: {...key[1]}}) ;
          } else {
            for (const i in key[1]) {
              if (i[0].includes(keyToFilter)) {
                console.log(i[0]);
                return i
              }
            }
          }
        });
        this.icoFontsListFilt = result;

      } else {
        this.icoFontsListFilt = icoFontsList;
      }

      console.log(result); */



    },
    sizeEmoji(event: any) {
      const icofont: NodeListOf<HTMLLIElement> = document.querySelectorAll('.icofont');
      const size: number = isNaN(event) ? event.target.value : event;
      const emojiSizer = document.querySelector('.size__slider') as HTMLInputElement;
      emojiSizer.value = size + '';

      icofont.forEach(function (element: HTMLLIElement) {
        element.style.fontSize = size + 'px';
      });
      localStorage.emojiSize = size;
    },
    goDownBtn(goDown?: boolean) {
      const msgsList = document.querySelector('.main__center-msgs') as HTMLUListElement;
      const spanList = document.getElementById('toDownNum') as HTMLSpanElement;
      const divBtn = document.querySelector('.toDown') as HTMLDivElement;
      divBtn.classList.remove('warning');
      spanList.innerText = '0';
      spanList.style.color = 'inherit';

      goDown ? msgsList.scrollTop = msgsList.scrollHeight : 'undefined or false';

      // const lastLiElement = msgsList.lastElementChild as HTMLLIElement;
      // lastLiElement.scrollIntoView({ behavior: 'smooth' });
    }
  },
  watch: {
    value() {
      this.autosize();
    }
  },
  mounted() {
    // this.autosize();
    const icoFonts = document.querySelector('.icofonts') as HTMLElement;
    const emojiCategory = icoFonts.querySelectorAll('ul');
    emojiCategory.forEach(function (item: Element) {
      const result: string = item.classList[0].replace('icofonts__', '') ?? '';
      // const result: string = item.classList.item(0)?.replace('icofonts__', '') ?? ''; -- или можно так
      // const result: string = item.classList.toString().split(' ')[0].split('__')[1]; -- или можно так
      item.setAttribute('style', `--cnt: "${result}"`);
      // item.style.setProperty('--cnt', `"${result}"`) // - или и так можно
    });

    localStorage.emojiSize ? this.sizeEmoji(localStorage.emojiSize) : this.sizeEmoji(36);

    document.addEventListener("click", () => { this.emojiBlock = false });
    this.searchEmoji();

    /* использовался для сортировки - удалить до релиза
    const iconOldFontsList: any = this.icoFontsList
  
    const iconNewFontsList: any = {}
  
    for (const category in iconOldFontsList) {
      iconNewFontsList[category] = {}
  
      for (const icon of iconOldFontsList[category]) {
        const icofontsTagsAll = document.querySelectorAll('.icofont');
        icofontsTagsAll.forEach(function (tag) {
          if (tag.classList[0].replace('icofont-', '') == icon) {
            const pseudoElement = window.getComputedStyle(tag, ':before');
            const contentValue = pseudoElement.content
            const entityValue = contentValue.replace(/"/g, '')
  
            // Добавляем иконку и соответствующее значение HTML Entity в объект "B"
            iconNewFontsList[category][icon] = entityValue
          }
  
  
        });
  
      }
    } */
  }
})
</script>

<style lang="scss"></style>
