(()=>{"use strict";class e{constructor(){this.listeners={}}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}off(e,t){if(!this.listeners[e])throw new Error("Нет события: "+e);this.listeners[e]=this.listeners[e].filter((e=>e!==t))}emit(e,...t){if(!this.listeners[e])throw new Error("Нет события: "+e);this.listeners[e].forEach((function(e){e(...t)}))}}class t{constructor(n){this._element=null,this._mounted=!1,this.setProps=e=>{e&&Object.assign(this.props,e)};const s=new e;this.props=this._makePropsProxy(n),this.eventBus=()=>s,this._registerEvents(s),s.emit(t.EVENTS.INIT)}_registerEvents(e){e.on(t.EVENTS.INIT,this.init.bind(this)),e.on(t.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),e.on(t.EVENTS.FLOW_RENDER,this._render.bind(this)),e.on(t.EVENTS.FLOW_SCDU,this._shouldComponentDidUpdate.bind(this)),e.on(t.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this))}init(){this._prerender(),this._render()}_componentDidMount(){this.componentDidMount()}componentDidMount(){}_shouldComponentDidUpdate(e,n){this.shouldComponentUpdate(e,n)&&this.eventBus().emit(t.EVENTS.FLOW_RENDER)}shouldComponentUpdate(e,t){return e!==t}_componentDidUpdate(){this.componentDidUpdate()}componentDidUpdate(){}_render(){const e=this.render();this._mounted&&null!==this._element&&null!==e?this._element instanceof HTMLElement&&(this._element.replaceWith(e),this._element=e):this._element=e,this._mounted?this.eventBus().emit(t.EVENTS.FLOW_CDU):(this.eventBus().emit(t.EVENTS.FLOW_CDM),this._mounted=!0)}render(){return null}get element(){return this._element}getContent(){return this.element}_makePropsProxy(e){return new Proxy(e,{set:(e,n,s)=>(e[n]=s,this.eventBus().emit(t.EVENTS.FLOW_SCDU),!0)})}show(e="block"){this._element instanceof HTMLElement&&"none"===this._element.style.display&&(this._element.style.display=e,this.eventBus().emit(t.EVENTS.FLOW_CDU))}hide(){this._element instanceof HTMLElement&&"none"!==this._element.style.display&&(this._element.style.display="none",this.eventBus().emit(t.EVENTS.FLOW_CDU))}visibilityToggle(e="block"){this._element instanceof HTMLElement&&("none"===this._element.style.display?this.show(e):this.hide())}forceUpdate(){this.eventBus().emit(t.EVENTS.FLOW_RENDER)}_prerender(){this.prerender()}prerender(){}}t.EVENTS={INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_SCDU:"flow:should-component-did-update",FLOW_CDU:"flow:component-did-update"};const n=new class extends class{constructor(){this._allowed=null,this.EVENTS={onBlur:"blur",onChange:"input",onClick:"click",onSubmit:"submit"},this.SVG_TAGS=["svg","circle","path","stroke","rect","line"]}_createNode(e,t){if("string"==typeof e){let n=e;const s=(e.match(/{{ (\w+) }}/g)||[]).reduce(((e,t)=>e.includes(t)?e:[...e,t.replace(/({)|(})|( )/g,"")]),[]),r=document.createDocumentFragment();for(const e of s){const s=new RegExp(`{{ ${e} }}`,"g");if(null!==this._allowed){if(t[e]instanceof this._allowed){const n=t[e].getContent();null!==n&&r.appendChild(n)}Array.isArray(t[e])&&t[e].forEach((e=>{const t=e.getContent();null!==t&&r.appendChild(t)}))}n=n.replace(s,t[e]||"")}return Array.from(r.children).length>0?r:document.createTextNode(n)}const{children:n,fullTag:s,tag:r}=e;if("<>"===r){const e=document.createDocumentFragment();return n.forEach((n=>{e.appendChild(this._createNode(n,t))})),e}const i=this.SVG_TAGS.includes(r)?document.createElementNS("http://www.w3.org/2000/svg",r):document.createElement(r),o=s.match(/([a-zA-Z0-9-]+)="(.*?)"/g);if(null!==o){const e=/(?<prop>[a-zA-Z0-9-]+)(="(?<value>.*?)")?/;o.forEach((n=>{var s;const{prop:r,value:o=""}=null===(s=n.match(e))||void 0===s?void 0:s.groups;let l=o;const a=null==o?void 0:o.match(/{{ (\w+) }}/);if(null!=a&&void 0!==a[1])if("function"==typeof t[a[1]])l=t[a[1]];else{const e=new RegExp(`{{ ${a[1]} }}`);l=null==l?void 0:l.replace(e,t[a[1]]||"")}"function"==typeof l&&r in this.EVENTS?i.addEventListener(this.EVENTS[r],l):"class"===r&&void 0!==l&&i instanceof HTMLElement?i.className=String(l):void 0===o?i.setAttribute(r,"true"):i.setAttribute(r,String(l))}))}return n.forEach((e=>{i.appendChild(this._createNode(e,t))})),i}_createTree(e){const t=e.shift();if(/<([a-zA-Z]+.*?)|(\/[a-zA-Z]+)>/gi.test(t)){const n=t.replace(/(<)|(( .*?)?\/?>)/g,""),s=[],r=`</${n}>`;if(!(e=>/<[a-zA-Z]+.*?\/>/gi.test(e))(t)){for(;0!==e.length&&e[0]!==r;)s.push(this._createTree(e));e.shift()}return{tag:n,fullTag:t,children:s}}if("<>"===t){const n=[];for(;"</>"!==e[0];)n.push(this._createTree(e));return{tag:t,fullTag:t,children:n}}return t}_parseTemplate(e){return e.replace(/([\r\n]+)/g,"").replace(/ {2,}/g,"").match(/(<.*?>)|([^<]+)/gi).filter((e=>""!==e))}compile(e,t={}){const n=this._parseTemplate(e),s=this._createTree(n);return this._createNode(s,t)}}{constructor(){super(...arguments),this._allowed=t}};class s extends t{constructor(e){super(e)}render(){const e=this.props,{writable:t}=e,s=function(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(s=Object.getOwnPropertySymbols(e);r<s.length;r++)t.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(e,s[r])&&(n[s[r]]=e[s[r]])}return n}(e,["writable"]);return t?n.compile('\n    <div class="profile__row profile-row">\n        <div class="profile-row__title">{{ title }}</div>\n        <input type="{{ type }}" class="profile-row__value" value="{{ value }}" name="{{ name }}" />\n    </div>\n',Object.assign({},s)):n.compile('\n    <div class="profile__row profile-row">\n        <div class="profile-row__title">{{ title }}</div>\n        <div class="profile-row__value">{{ value }}</div>\n    </div>\n',Object.assign({},s))}}class r{constructor({onSubmit:e,wrapper:t,validator:n={},exclude:s}){var r;this.errors={},this.touched=[],this.form="FORM"===t.tagName?t:t.querySelector("form"),this.formData=new FormData(this.form||void 0),this.formData.forEach(((e,t)=>{var s;const r=null===(s=this.form)||void 0===s?void 0:s.querySelector(`[name="${t}"`);null==r||r.addEventListener("input",(e=>{const{target:s}=e,{value:r}=s;this.setFieldValue(t,r),this.validate(n),this.showErrors()})),null==r||r.addEventListener("blur",(()=>{this.setFieldTouched(t),this.validate(n),this.showErrors()}))})),null===(r=this.form)||void 0===r||r.addEventListener("submit",(t=>{t.preventDefault(),0===Object.keys(this.errors).length?this.submit(e,s):this.showErrors(!0)})),this.validate(n),this.touched=[]}setFieldValue(e,t){this.formData.set(e,t)}setFieldTouched(e){this.touched.push(e)}showErrors(e=!1){this.formData.forEach(((t,n)=>{var s;const r=null===(s=this.form)||void 0===s?void 0:s.querySelector(`[name="${n}"`),i=null==r?void 0:r.parentElement,o=(null==i?void 0:i.querySelector(".form-error"))||document.createElement("div");o.textContent="",null==r||r.classList.remove("form-input-error");const l=this.touched.includes(n)||e,a=this.errors[n];l&&a&&(null==r||r.classList.add("form-input-error"),o.textContent=a,null===o.parentElement&&(o.classList.add("form-error"),null==i||i.appendChild(o)))}))}validate(e){let t={};this.formData.forEach(((e,n)=>{t=Object.assign(Object.assign({},t),{[n]:e})})),this.errors=(e=>{const t={};for(const n in e)e.hasOwnProperty(n)&&null!=e[n]&&(t[n]=e[n]);return t})(Object.entries(e).reduce(((e,[n,s])=>Object.assign(Object.assign({},e),{[n]:s(t)})),{}))}submit(e,t){void 0!==t&&("string"==typeof t?this.formData.delete(t):Array.isArray(t)&&t.forEach((e=>{this.formData.delete(e)})));let n={};this.formData.forEach(((e,t)=>{n[t]=e})),e(n)}}((e,t)=>{const n=document.querySelector("#root"),s=t.getContent();null!==n&&null!==s&&(null==n||n.appendChild(s))})(0,new class extends t{constructor(e){super(e)}render(){const e=this.props,{long:t}=e,s=function(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(s=Object.getOwnPropertySymbols(e);r<s.length;r++)t.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(e,s[r])&&(n[s[r]]=e[s[r]])}return n}(e,["long"]);return n.compile('\n    <div class="profile-page">\n        <div class="profile__back-link-wrapper">\n            <a href="/pages/chats" class="profile-back-link" title="Вернуться к выбору чата">\n                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white" />\n                    <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6" />\n                </svg>\n            </a>\n        </div>\n        <main class="profile {{ className }}">\n            <h1 class="visually-hidden">\n                {{ pageTitle }}\n            </h1>\n            <img src="{{ avatarSrc }}" alt="Аватар пользователя {{ displayName }}" width="131" height="131" />\n            <div class="profile__title">\n                {{ displayName }}\n            </div>\n            {{ content }}\n        </main>\n    </div>\n',Object.assign(Object.assign({},s),{className:t?"profile_long":""}))}}({avatarSrc:"/assets/avatar.jpg",content:new class extends t{constructor(){super({}),this.onSubmit=e=>{console.log(e)},this.validator={email:({email:e})=>{if(!/^\S+@\S+$/.test(e))return"Укажите валидный email"},newPassword:({newPassword:e})=>{if(e.length<8)return"Максимальная длина пароля - 8 символов"},phone:({phone:e})=>{if(!/^((8|\+7)[- ]?)?((\d{3})?[- ]?)?[\d- ]{7,10}$/.test(e))return"Укажите телефон в формате +7 XXX XXX XXXX"},repeatNewPassword:({newPassword:e,repeatNewPassword:t})=>{if(e!==t)return"Пароли не совпадают"}},this.content=[],this.element instanceof HTMLElement&&new r({onSubmit:this.onSubmit,validator:this.validator,wrapper:this.element,exclude:"repeatNewPassword"})}prerender(){const e=new s({name:"first_name",title:"Имя",type:"text",value:"Вася",writable:!0}),t=new s({name:"second_name",title:"Фамилия",type:"text",value:"Васин",writable:!0}),n=new s({name:"display_name",title:"Отображаемое имя",type:"text",value:"Васян",writable:!0}),r=new s({name:"login",title:"Логин",type:"text",value:"username",writable:!0}),i=new s({name:"email",title:"Почта",type:"email",value:"pochta@yandex.ru",writable:!0}),o=new s({name:"phone",title:"Телефон",type:"tel",value:"+7 903 123 4567",writable:!0}),l=new s({name:"oldPassword",title:"Текущий пароль",type:"password",value:"password",writable:!0}),a=new s({name:"newPassword",title:"Новый пароль",type:"password",value:"password",writable:!0}),c=new s({name:"repeatNewPassword",title:"Новый пароль (еще раз)",type:"password",value:"зфыыцщкв",writable:!0}),h=new s({name:"avatar",title:"Загрузить аватар",type:"file",value:"",writable:!0});this.content=[e,t,n,r,i,o,l,a,c,h]}render(){return n.compile('\n    <form class="profile-section">\n        {{ content }}\n        <button type="submit" class="profile__submit">Сохранить</button>\n    </form>\n',{content:this.content})}},displayName:"Васян",long:!0,pageTitle:"Редактирование профиля"}))})();