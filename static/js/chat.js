(()=>{"use strict";class e{constructor(){this.listeners={}}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}off(e,t){if(!this.listeners[e])throw new Error("Нет события: "+e);this.listeners[e]=this.listeners[e].filter((e=>e!==t))}emit(e,...t){if(!this.listeners[e])throw new Error("Нет события: "+e);this.listeners[e].forEach((function(e){e(...t)}))}}class t{constructor(n){this._element=null,this._mounted=!1,this.setProps=e=>{e&&Object.assign(this.props,e)};const s=new e;this.props=this._makePropsProxy(n),this.eventBus=()=>s,this._registerEvents(s),s.emit(t.EVENTS.INIT)}_registerEvents(e){e.on(t.EVENTS.INIT,this.init.bind(this)),e.on(t.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),e.on(t.EVENTS.FLOW_RENDER,this._render.bind(this)),e.on(t.EVENTS.FLOW_SCDU,this._shouldComponentDidUpdate.bind(this)),e.on(t.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this))}init(){this._prerender(),this._render()}_componentDidMount(){this.componentDidMount()}componentDidMount(){}_shouldComponentDidUpdate(e,n){this.shouldComponentUpdate(e,n)&&this.eventBus().emit(t.EVENTS.FLOW_RENDER)}shouldComponentUpdate(e,t){return e!==t}_componentDidUpdate(){this.componentDidUpdate()}componentDidUpdate(){}_render(){const e=this.render();this._mounted&&null!==this._element&&null!==e?this._element instanceof HTMLElement&&(this._element.replaceWith(e),this._element=e):this._element=e,this._mounted?this.eventBus().emit(t.EVENTS.FLOW_CDU):(this.eventBus().emit(t.EVENTS.FLOW_CDM),this._mounted=!0)}render(){return null}get element(){return this._element}getContent(){return this.element}_makePropsProxy(e){return new Proxy(e,{set:(e,n,s)=>(e[n]=s,this.eventBus().emit(t.EVENTS.FLOW_SCDU),!0)})}show(e="block"){this._element instanceof HTMLElement&&"none"===this._element.style.display&&(this._element.style.display=e,this.eventBus().emit(t.EVENTS.FLOW_CDU))}hide(){this._element instanceof HTMLElement&&"none"!==this._element.style.display&&(this._element.style.display="none",this.eventBus().emit(t.EVENTS.FLOW_CDU))}visibilityToggle(e="block"){this._element instanceof HTMLElement&&("none"===this._element.style.display?this.show(e):this.hide())}forceUpdate(){this.eventBus().emit(t.EVENTS.FLOW_RENDER)}_prerender(){this.prerender()}prerender(){}}t.EVENTS={INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_SCDU:"flow:should-component-did-update",FLOW_CDU:"flow:component-did-update"};const n=new class extends class{constructor(){this._allowed=null,this.EVENTS={onBlur:"blur",onChange:"input",onClick:"click",onSubmit:"submit"},this.SVG_TAGS=["svg","circle","path","stroke","rect","line"]}_createNode(e,t){if("string"==typeof e){let n=e;const s=(e.match(/{{ (\w+) }}/g)||[]).reduce(((e,t)=>e.includes(t)?e:[...e,t.replace(/({)|(})|( )/g,"")]),[]),a=document.createDocumentFragment();for(const e of s){const s=new RegExp(`{{ ${e} }}`,"g");if(null!==this._allowed){if(t[e]instanceof this._allowed){const n=t[e].getContent();null!==n&&a.appendChild(n)}Array.isArray(t[e])&&t[e].forEach((e=>{const t=e.getContent();null!==t&&a.appendChild(t)}))}n=n.replace(s,t[e]||"")}return Array.from(a.children).length>0?a:document.createTextNode(n)}const{children:n,fullTag:s,tag:a}=e;if("<>"===a){const e=document.createDocumentFragment();return n.forEach((n=>{e.appendChild(this._createNode(n,t))})),e}const o=this.SVG_TAGS.includes(a)?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a),r=s.match(/([a-zA-Z0-9-]+)="(.*?)"/g);if(null!==r){const e=/(?<prop>[a-zA-Z0-9-]+)(="(?<value>.*?)")?/;r.forEach((n=>{var s;const{prop:a,value:r=""}=null===(s=n.match(e))||void 0===s?void 0:s.groups;let i=r;const l=null==r?void 0:r.match(/{{ (\w+) }}/);if(null!=l&&void 0!==l[1])if("function"==typeof t[l[1]])i=t[l[1]];else{const e=new RegExp(`{{ ${l[1]} }}`);i=null==i?void 0:i.replace(e,t[l[1]]||"")}"function"==typeof i&&a in this.EVENTS?o.addEventListener(this.EVENTS[a],i):"class"===a&&void 0!==i&&o instanceof HTMLElement?o.className=String(i):void 0===r?o.setAttribute(a,"true"):o.setAttribute(a,String(i))}))}return n.forEach((e=>{o.appendChild(this._createNode(e,t))})),o}_createTree(e){const t=e.shift();if(/<([a-zA-Z]+.*?)|(\/[a-zA-Z]+)>/gi.test(t)){const n=t.replace(/(<)|(( .*?)?\/?>)/g,""),s=[],a=`</${n}>`;if(!(e=>/<[a-zA-Z]+.*?\/>/gi.test(e))(t)){for(;0!==e.length&&e[0]!==a;)s.push(this._createTree(e));e.shift()}return{tag:n,fullTag:t,children:s}}if("<>"===t){const n=[];for(;"</>"!==e[0];)n.push(this._createTree(e));return{tag:t,fullTag:t,children:n}}return t}_parseTemplate(e){return e.replace(/([\r\n]+)/g,"").replace(/ {2,}/g,"").match(/(<.*?>)|([^<]+)/gi).filter((e=>""!==e))}compile(e,t={}){const n=this._parseTemplate(e),s=this._createTree(n);return this._createNode(s,t)}}{constructor(){super(...arguments),this._allowed=t}};class s extends t{constructor(e){super(e)}render(){return n.compile('\n    <button class="{{ className }}" type="button" title="{{ title }}" onClick="{{ onClick }}">\n        {{ icon }}\n    </button>\n',Object.assign({},this.props))}}class a extends t{constructor(e){super(e)}render(){return n.compile('\n    <div class="chat-actions">\n        {{ buttons }}\n    </div>\n',Object.assign({},this.props))}}class o extends t{constructor(e){super(e)}render(){return n.compile('\n    <button class="chat-actions__item" type="button" onClick="{{ onClick }}">\n        {{ icon }}\n        <span class="chat-actions__item-label">{{ label }}</span>\n    </button>\n',Object.assign({},this.props))}}class r extends t{constructor(e){super(e),this.closeModal=()=>{this.hide()}}render(){const{content:e,x:t,y:s}=this.props;return n.compile('\n    <div class="chat-modal {{ className }}">\n        {{ content }}\n    </div>\n',{content:e,className:`${"left"===t?"chat-modal_left":"chat-modal_right"} ${"top"===s?"chat-modal_top":"chat-modal_bottom"}`})}componentDidMount(){this.hide()}componentDidUpdate(){const e=this.getContent();e instanceof HTMLElement&&setTimeout((()=>{"none"===e.style.display?document.removeEventListener("click",this.closeModal):document.addEventListener("click",this.closeModal)}),0)}}class i extends t{constructor(e){super(e)}render(){return n.compile('\n    <li class="chat-item-wrapper">\n        <div class="chat-item">\n            <img class="chat-item__avatar" src="{{ avatarSrc }}" alt="{{ avatarAlt }}" width="47" height="47" />\n            <h3 class="chat-item__title">\n                <a href="{{ chatUrl }}" class="chat-item__link">{{ chatName }}</a>\n            </h3>\n            <div class="chat-item__message">{{ chatMessage }}</div>\n            <div class="chat-item__time-wrapper">\n                <div class="chat-item__time">{{ date }}</div>\n            </div>\n            {{ newMessage }}\n        </div>\n    </li>\n',Object.assign({},this.props))}}class l extends t{constructor(e){super(e)}render(){return n.compile('\n    <div class="chat-item__new-message">\n        {{ count }}\n    </div>\n',Object.assign({},this.props))}}class c extends t{constructor(e){super(e)}render(){return n.compile('\n    <>\n        <span class="chat-item__you-label">Вы:</span> {{ message }}\n    </>\n',Object.assign({},this.props))}}class h extends t{constructor(e){super(e)}render(){return n.compile('\n    <li class="messages-date">\n        {{ date }}\n    </li>\n',Object.assign({},this.props))}}class d extends t{render(){return n.compile('\n    <svg width="8" height="4" viewBox="0 0 11 5" xmlns="http://www.w3.org/2000/svg">\n        <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33301)" stroke="currentColor" />\n        <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.3584 5)" stroke="currentColor" />\n    </svg>\n')}}class m extends t{render(){return n.compile('\n    <svg width="8" height="4" viewBox="0 0 11 5" xmlns="http://www.w3.org/2000/svg">\n        <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33301)" stroke="currentColor" />\n        <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.3584 5)" stroke="currentColor" />\n        <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01611 5)" stroke="currentColor" />\n    </svg>\n')}}class p extends t{constructor(e){super(e)}prerender(){this.sentIcon=new d({}),this.readIcon=new m({})}render(){const{attach:e,content:t,status:s,time:a,type:o}=this.props,r=e?"message_attach":"",i="outgoing"===o?"read"===s?"message_read":"sent"===s?"message_sent":"":"",l="incoming"===o?"message_incoming":"outgoing"===o?"message_outgoing":"";return n.compile('\n    <li class="message {{ className }}">\n        {{ content }}\n        <span class="message__time">\n            {{ timeIcon }}\n            <time>{{ time }}</time>\n        </span>\n    </li>\n',{className:`${r} ${i} ${l}`,content:t,time:a,timeIcon:"outgoing"===o?"read"===s?this.readIcon:"sent"===s?this.sentIcon:"":""})}}class u extends t{constructor(e){super(e)}render(){const{text:e,last:t}=this.props;return n.compile('\n    <div class="message__content">{{ text }}<span class="{{ timeHolderClassName }}"></span></div>\n',{text:e,timeHolderClassName:t?"message__time-holder":""})}}class g extends t{constructor(e){super(e)}render(){return n.compile('\n    <picture>\n        <source srcset="{{ srcset }}" />\n        <img src="{{ src }}" alt="{{ alt }}" />\n    </picture>\n',Object.assign({},this.props))}}class v extends t{render(){return n.compile('\n    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.187 13.5l7.576-7.576.943.943-7.577 7.576-.942-.943zM9.7 16.014l7.577-7.576.943.943-7.576 7.576-.943-.943zm5.343 5.343l7.577-7.577.942.943-7.576 7.576-.943-.942zm2.514 2.513l7.576-7.576.943.943-7.576 7.576-.943-.942z" fill="currentColor" />\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.557 23.87c-2.615 2.616-6.845 2.625-9.449.022-2.603-2.604-2.594-6.834.021-9.45l-.942-.942c-3.139 3.138-3.15 8.215-.026 11.339 3.125 3.124 8.201 3.113 11.34-.025l-.944-.943zm5.063-10.09l.942.943c2.441-2.44 2.45-6.389.02-8.819-2.43-2.43-6.379-2.421-8.82.02l.944.943c1.917-1.918 5.02-1.925 6.929-.016 1.91 1.91 1.902 5.012-.016 6.93z" fill="currentColor" />\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7 16.015c-1.743 1.743-1.749 4.563-.013 6.3 1.735 1.735 4.556 1.729 6.3-.015l-.944-.943a3.118 3.118 0 0 1-4.41.01 3.118 3.118 0 0 1 .01-4.41l-.942-.942z" fill="currentColor" />\n    </svg>\n')}}class w extends t{render(){return n.compile('\n    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5h14A2.5 2.5 0 0 1 20.5 4v10l-5.98-1.595A11.998 11.998 0 0 0 11.427 12h-.856c-1.043 0-2.083.136-3.091.405L1.5 14V4A2.5 2.5 0 0 1 4 1.5zM0 4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4zm8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="currentColor" />\n    </svg>\n')}}class _ extends t{render(){return n.compile('\n    <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5h14A2.5 2.5 0 0 1 20.5 4v8H16a4 4 0 0 0-4 4v4.5H4A2.5 2.5 0 0 1 1.5 18V4A2.5 2.5 0 0 1 4 1.5zM12 22H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6z" fill="currentColor" />\n    </svg>\n')}}class f extends t{render(){return n.compile('\n    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 11a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0zm1.5 0c0 6.075-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0s11 4.925 11 11zm-11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" />\n    </svg>\n')}}const b=()=>{N.visibilityToggle("grid"),T.visibilityToggle("grid")},x=new class extends t{render(){return n.compile('\n    <svg width="22" height="19" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg">\n        <path d="M0 19h22v-1.5H0z" fill="currentColor" />\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.26 0L19 2.74l-2.055 2.055-2.74-2.74L16.26 0zm-2.74 2.74l2.74 2.74L6.74 15H4v-2.74l9.52-9.52z" fill="currentColor" />\n    </svg>\n')}}({}),y=new class extends t{render(){return n.compile('\n    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <circle cx="11" cy="11" r="10.25" stroke-width="1.5" stroke="currentColor" />\n        <path stroke-width="1.5" d="M7.111 7.111l7.778 7.778m-7.778 0l7.778-7.778" stroke="currentColor" />\n    </svg>\n')}}({}),C=new a({buttons:[new o({icon:x,label:"Переименовать",onClick:b}),new o({icon:y,label:"Удалить",onClick:()=>{A.visibilityToggle("flex")}})]}),M=new r({content:C,x:"right",y:"bottom"}),E=new class extends t{render(){return n.compile('\n    <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <circle cx="1.5" cy="2" r="1.5" fill="currentColor" />\n        <circle cx="1.5" cy="8" r="1.5" fill="currentColor" />\n        <circle cx="1.5" cy="14" r="1.5" fill="currentColor" />\n    </svg>\n')}}({}),S=new s({className:"chat-header__actions",icon:E,onClick:()=>{M.visibilityToggle()},title:"Действия с чатом"}),N=new class extends t{constructor(e){super(e),this.message="",this.message=this.props.title}render(){const{callback:e,title:t}=this.props;return n.compile('\n    <form class="chat-header-form" onSubmit="{{ onSubmit }}">\n        <input type="text" class="chat-header-form__input" value="{{ title }}" onChange="{{ onChange }}" />\n        <button type="submit" class="chat-header-form__button">Сохранить</button>\n    </form>\n',{title:t,onChange:e=>{const{target:t}=e,{value:n}=t;this.message=n},onSubmit:t=>{t.preventDefault(),""!==this.message&&(console.log("chat_name: "+this.message),e())}})}componentDidMount(){this.hide()}componentDidUpdate(){var e;const t=this.getContent();t instanceof HTMLElement&&"none"!==t.style.display&&(null===(e=t.querySelector("input"))||void 0===e||e.select())}}({callback:b,title:"Вадим"}),T=new class extends t{constructor(e){super(e)}render(){return n.compile('\n    <div class="chat-row">\n        <img class="chat-header__avatar" src="{{ avatarSrc }}" alt="{{ avatarAlt }}" width="34" height="34" />\n        <div class="chat-header__information">\n            <div class="chat-header__title">{{ chatName }}</div>\n            <div class="chat-header__status">{{ status }}</div>\n        </div>\n        {{ chatActionsButton }}\n        {{ chatActionsModal }}\n    </div>\n',Object.assign({},this.props))}}({avatarAlt:"Аватар беседы с Вадимом",avatarSrc:"/assets/avatar.jpg",chatActionsButton:S,chatActionsModal:M,chatName:"Вадим",status:"Был 5 минут назад"}),D=new class extends t{constructor(e){super(e)}render(){return n.compile('\n    <header class="chat-header">\n        {{ chatInformation }}\n        {{ chatRenameForm }}\n    </header>\n',Object.assign({},this.props))}}({chatRenameForm:N,chatInformation:T}),k=new class extends t{constructor(){super(...arguments),this.messages=[]}prerender(){this.messages=[new h({date:"19 июня"}),new p({content:[new u({text:"Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой."}),new u({last:!0,text:"Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро."})],time:"11:56",type:"incoming"}),new p({attach:!0,content:[new g({alt:"photo.jpg",src:"/assets/photo.jpg",srcset:"/assets/photo.webp"})],time:"11:56",type:"incoming"}),new p({content:[new u({last:!0,text:"Круто!"})],status:"read",time:"12:00",type:"outgoing"})]}render(){return n.compile('\n    <div class="chat__content">\n        <h2 class="visually-hidden">Список сообщений</h2>\n        <ul class="chat__messages">\n            {{ messages }}\n        </ul>\n    </div>\n',{messages:this.messages})}}({}),O=new class extends t{constructor(e){super(e),this.message=""}prerender(){this.attachFormMessageModal=new r({content:new a({buttons:[new o({icon:new w({}),label:"Фото или Видео",onClick:()=>console.log("Фото или Видео")}),new o({icon:new _({}),label:"Файл",onClick:()=>console.log("Файл")}),new o({icon:new f({}),label:"Локация",onClick:()=>console.log("Локация")})]}),x:"left",y:"top"}),this.buttonFormMessageAttach=new s({className:"message-form__attach",icon:new v({}),onClick:()=>{this.attachFormMessageModal.visibilityToggle()},title:"Добавить вложение"})}render(){return n.compile('\n    <form class="message-form" onSubmit="{{ onSubmit }}">\n        <div class="chat-row">\n            {{ buttonAttach }}\n            {{ attachModal }}\n            <input type="text" class="message-form__input" placeholder="Сообщение" name="message" autocomplete="off" onChange="{{ onChange }}" />\n            <button type="submit" class="message-form__submit" title="Отправить сообщение">\n                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <rect y="5.2002" width="11" height="1.6" fill="currentColor" />\n                    <path d="M7 1L11 6L7 11" stroke-width="1.6" stroke="currentColor" />\n                </svg>\n            </button>            \n        </div>\n    </form>\n',{attachModal:this.attachFormMessageModal,buttonAttach:this.buttonFormMessageAttach,onChange:e=>{const{target:t}=e,{value:n}=t;this.message=n},onSubmit:e=>{e.preventDefault(),""!==this.message&&(console.log("message: "+this.message),this.forceUpdate())}})}}({}),A=new class extends t{constructor(){super(...arguments),this.closeModal=()=>{this.hide()}}render(){return n.compile('\n    <div class="modal-delete js-modal-delete">\n        <div class="modal-delete__content">\n            <div class="modal-delete__title">Вы хотите удалить чат?</div>\n            <button class="modal-delete__button modal-delete__button_confirm" type="button" onClick="{{ onConfirm }}">Удалить</button>\n            <button class="modal-delete__button modal-delete__button-cancel" type="button" onClick="{{ onCancel }}">Отменить</button>\n        </div>\n    </div>\n',{onCancel:()=>{console.log("cancel")},onConfirm:()=>{console.log("confirm")}})}componentDidMount(){this.hide()}componentDidUpdate(){const e=this.getContent();e instanceof HTMLElement&&setTimeout((()=>{"none"===e.style.display?document.removeEventListener("click",this.closeModal):document.addEventListener("click",this.closeModal)}),0)}}({}),L=new class extends t{constructor(e){super(e)}render(){return n.compile('\n    <main class="chat">\n        {{ chatHeader }}\n        {{ messages }}\n        {{ messageForm }}\n        {{ deleteModal }}\n    </main>\n',Object.assign({},this.props))}}({chatHeader:D,deleteModal:A,messages:k,messageForm:O}),j=[{avatarAlt:"Аватар беседы с Андреем",avatarSrc:"/assets/avatar.jpg",incomingMessage:"Изображение",chatName:"Андрей",chatUrl:"/pages/chat",date:"10:49",newMessage:2},{avatarAlt:"Аватар беседы Киноклуб",avatarSrc:"/assets/avatar.jpg",outgoingMessage:"стикер",chatName:"Киноклуб",chatUrl:"/pages/chat",date:"12:00"},{avatarAlt:"Аватар беседы с Илья",avatarSrc:"/assets/avatar.jpg",incomingMessage:"Друзья, у меня для вас особенный выпуск новостей! Тут еще текст, который не влезает",chatName:"Илья",chatUrl:"/pages/chat",date:"15:12",newMessage:4},{avatarAlt:"Аватар беседы с Вадимом",avatarSrc:"/assets/avatar.jpg",outgoingMessage:"Круто!",chatName:"Вадим",chatUrl:"/pages/chat",date:"Пт"},{avatarAlt:"Аватар беседы тет-а-теты",avatarSrc:"/assets/avatar.jpg",incomingMessage:"И Human Interface Guidelines и Material Design рекомендуют и еще текст, который не влезает",chatName:"тет-а-теты",chatUrl:"/pages/chat",date:"Ср"},{avatarAlt:"Аватар беседы 1, 2, 3",avatarSrc:"/assets/avatar.jpg",incomingMessage:"Миллионы россиян ежедневно проводят десятки часов свое и тут тоже есть текст, который не влезает",chatName:"1, 2, 3",chatUrl:"/pages/chat",date:"Пн"},{avatarAlt:"Аватар беседы Design Destroyer",avatarSrc:"/assets/avatar.jpg",incomingMessage:"В 2008 году художник Jon Rafman начал собирать - да-да, и этот текст тоже не влезает",chatName:"Design Destroyer",chatUrl:"/pages/chat",date:"Пн"},{avatarAlt:"Аватар беседы Day.",avatarSrc:"/assets/avatar.jpg",incomingMessage:"Так увлёкся работой по курсу, что совсем забыл его анонсировать - фух, это последний текст, который не влезает",chatName:"Day.",chatUrl:"/pages/chat",date:"31 Мая 2020"}].map((e=>{var{newMessage:t,incomingMessage:n,outgoingMessage:s}=e,a=function(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(n[s[a]]=e[s[a]])}return n}(e,["newMessage","incomingMessage","outgoingMessage"]);const o=Object.assign({},a);return void 0!==t&&(o.newMessage=new l({count:t})),void 0!==n?o.chatMessage=n:void 0!==s&&(o.chatMessage=new c({message:s})),new i(Object.assign({},o))}));((e,t)=>{const n=document.querySelector("#root"),s=t.getContent();null!==n&&null!==s&&(null==n||n.appendChild(s))})(0,new class extends t{constructor(e){super(e)}render(){return n.compile('\n    <div class="chats-wrapper">\n        <h1 class="visually-hidden">{{ pageTitle }}</h1>\n        <aside class="chats-wrapper__aside">\n            <div class="link-profile-wrapper">\n                <a href="/pages/profile" class="link-profile">Профиль</a>\n            </div>\n            <div class="chats-search">\n                <input type="search" class="chats-search__input js-input-search" placeholder="Поиск" name="search"  autocomplete="off" onChange="{{ onChange }}" />\n            </div>\n            <section class="chats-list">\n                <h2 class="visually-hidden">Список чатов</h2>\n                <ul class="chats-list__content">\n                    {{ chatItems }}\n                </ul>\n            </section>\n        </aside>\n        {{ content }}\n    </div>\n',Object.assign({},this.props))}}({chatItems:j,content:L,onChange:e=>{const{target:t}=e,{value:n}=t;console.log("search: "+n)},pageTitle:"Выбор чата"}))})();