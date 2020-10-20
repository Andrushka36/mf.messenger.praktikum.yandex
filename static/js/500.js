(()=>{"use strict";class e{constructor(){this.listeners={}}on(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}off(e,t){if(!this.listeners[e])throw new Error("Нет события: "+e);this.listeners[e]=this.listeners[e].filter((e=>e!==t))}emit(e,...t){if(!this.listeners[e])throw new Error("Нет события: "+e);this.listeners[e].forEach((function(e){e(...t)}))}}class t{constructor(n){this._element=null,this._mounted=!1,this.setProps=e=>{e&&Object.assign(this.props,e)};const s=new e;this.props=this._makePropsProxy(n),this.eventBus=()=>s,this._registerEvents(s),s.emit(t.EVENTS.INIT)}_registerEvents(e){e.on(t.EVENTS.INIT,this.init.bind(this)),e.on(t.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),e.on(t.EVENTS.FLOW_RENDER,this._render.bind(this)),e.on(t.EVENTS.FLOW_SCDU,this._shouldComponentDidUpdate.bind(this)),e.on(t.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this))}init(){this._prerender(),this._render()}_componentDidMount(){this.componentDidMount()}componentDidMount(){}_shouldComponentDidUpdate(e,n){this.shouldComponentUpdate(e,n)&&this.eventBus().emit(t.EVENTS.FLOW_RENDER)}shouldComponentUpdate(e,t){return e!==t}_componentDidUpdate(){this.componentDidUpdate()}componentDidUpdate(){}_render(){const e=this.render();this._mounted&&null!==this._element&&null!==e?this._element instanceof HTMLElement&&(this._element.replaceWith(e),this._element=e):this._element=e,this._mounted?this.eventBus().emit(t.EVENTS.FLOW_CDU):(this.eventBus().emit(t.EVENTS.FLOW_CDM),this._mounted=!0)}render(){return null}get element(){return this._element}getContent(){return this.element}_makePropsProxy(e){return new Proxy(e,{set:(e,n,s)=>(e[n]=s,this.eventBus().emit(t.EVENTS.FLOW_SCDU),!0)})}show(e="block"){this._element instanceof HTMLElement&&"none"===this._element.style.display&&(this._element.style.display=e,this.eventBus().emit(t.EVENTS.FLOW_CDU))}hide(){this._element instanceof HTMLElement&&"none"!==this._element.style.display&&(this._element.style.display="none",this.eventBus().emit(t.EVENTS.FLOW_CDU))}visibilityToggle(e="block"){this._element instanceof HTMLElement&&("none"===this._element.style.display?this.show(e):this.hide())}forceUpdate(){this.eventBus().emit(t.EVENTS.FLOW_RENDER)}_prerender(){this.prerender()}prerender(){}}t.EVENTS={INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_SCDU:"flow:should-component-did-update",FLOW_CDU:"flow:component-did-update"};const n=new class extends class{constructor(){this._allowed=null,this.EVENTS={onBlur:"blur",onChange:"input",onClick:"click",onSubmit:"submit"},this.SVG_TAGS=["svg","circle","path","stroke","rect","line"]}_createNode(e,t){if("string"==typeof e){let n=e;const s=(e.match(/{{ (\w+) }}/g)||[]).reduce(((e,t)=>e.includes(t)?e:[...e,t.replace(/({)|(})|( )/g,"")]),[]),i=document.createDocumentFragment();for(const e of s){const s=new RegExp(`{{ ${e} }}`,"g");if(null!==this._allowed){if(t[e]instanceof this._allowed){const n=t[e].getContent();null!==n&&i.appendChild(n)}Array.isArray(t[e])&&t[e].forEach((e=>{const t=e.getContent();null!==t&&i.appendChild(t)}))}n=n.replace(s,t[e]||"")}return Array.from(i.children).length>0?i:document.createTextNode(n)}const{children:n,fullTag:s,tag:i}=e;if("<>"===i){const e=document.createDocumentFragment();return n.forEach((n=>{e.appendChild(this._createNode(n,t))})),e}const r=this.SVG_TAGS.includes(i)?document.createElementNS("http://www.w3.org/2000/svg",i):document.createElement(i),o=s.match(/([a-zA-Z0-9-]+)="(.*?)"/g);if(null!==o){const e=/(?<prop>[a-zA-Z0-9-]+)(="(?<value>.*?)")?/;o.forEach((n=>{var s;const{prop:i,value:o=""}=null===(s=n.match(e))||void 0===s?void 0:s.groups;let l=o;const c=null==o?void 0:o.match(/{{ (\w+) }}/);if(null!=c&&void 0!==c[1])if("function"==typeof t[c[1]])l=t[c[1]];else{const e=new RegExp(`{{ ${c[1]} }}`);l=null==l?void 0:l.replace(e,t[c[1]]||"")}"function"==typeof l&&i in this.EVENTS?r.addEventListener(this.EVENTS[i],l):"class"===i&&void 0!==l&&r instanceof HTMLElement?r.className=String(l):void 0===o?r.setAttribute(i,"true"):r.setAttribute(i,String(l))}))}return n.forEach((e=>{r.appendChild(this._createNode(e,t))})),r}_createTree(e){const t=e.shift();if(/<([a-zA-Z]+.*?)|(\/[a-zA-Z]+)>/gi.test(t)){const n=t.replace(/(<)|(( .*?)?\/?>)/g,""),s=[],i=`</${n}>`;if(!(e=>/<[a-zA-Z]+.*?\/>/gi.test(e))(t)){for(;0!==e.length&&e[0]!==i;)s.push(this._createTree(e));e.shift()}return{tag:n,fullTag:t,children:s}}if("<>"===t){const n=[];for(;"</>"!==e[0];)n.push(this._createTree(e));return{tag:t,fullTag:t,children:n}}return t}_parseTemplate(e){return e.replace(/([\r\n]+)/g,"").replace(/ {2,}/g,"").match(/(<.*?>)|([^<]+)/gi).filter((e=>""!==e))}compile(e,t={}){const n=this._parseTemplate(e),s=this._createTree(n);return this._createNode(s,t)}}{constructor(){super(...arguments),this._allowed=t}};((e,t)=>{const n=document.querySelector("#root"),s=t.getContent();null!==n&&null!==s&&(null==n||n.appendChild(s))})(0,new class extends t{constructor(e){super(e)}render(){return n.compile('\n        <main class="wrapper-center">\n        <h1 class="visually-hidden">Ошибка</h1>\n        <div class="error">\n            <div class="error__title">{{ code }}</div>\n            <div class="error__description">Мы уже фиксим</div>\n            <a href="/pages/chats" class="error__link">Назад к чатам</a>\n        </div>\n    </main>\n',Object.assign({},this.props))}}({code:500}))})();