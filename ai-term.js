//defer loading because of fastboot and similar
if(typeof document !== 'undefined')
{
  const tpl1 = document.createElement('template');
  tpl1.id='ai-term';
  tpl1.innerHTML=`<div style="display: inline-flex;">
  <span class="ai-term" part="ai-term-tag">
    <slot>
    </slot>
    
      </span>

  </div>`;

  const tpl2 = document.createElement('template');
  tpl2.id='ai-term-chat';
  tpl2.innerHTML=`<div id="ai-term-chat-window" part="ai-term-chat">
  <div class="title"><svg
  width="120"
  viewBox="0 0 76.231392 11.96944"
  version="1.1"
  id="svg5"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg">

  <g
    id="layer1"
    transform="translate(-33.29779,-110.10422)">
  <g
      id="g1245">
    <text
        xml:space="preserve"
        style="font-weight:300;font-size:16.9333px;font-family:Quicksand;fill:#1984ef;fill-opacity:1;stroke-width:0.442;stroke-linecap:round"
        x="42.026588"
        y="121.90433"
        id="text236"><tspan
          id="tspan234"
          style="fill:#1984ef;fill-opacity:1;stroke-width:0.442"
          x="42.026588"
          y="121.90433"><tspan
            style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:16.9333px;font-family:Quicksand;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variation-settings:'wght' 500;fill:#1984ef;fill-opacity:1"
            id="tspan340">ai-term</tspan></tspan></text>
    <path
        style="font-variation-settings:'wght' 500;fill:none;stroke-width:1;stroke-linecap:round;stroke-dasharray:none"
        d="m 39.938875,110.10422 -6.33762,3.65902 6.363017,3.67369"
        id="path469" />
    <path
        style="font-variation-settings:'wght' 500;fill:none;stroke:#ffffff;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
        d="m 40.392726,113.73502 -6.445001,3.72102 6.44548,3.72131"
        id="path1133" />
    <path
        style="font-variation-settings:'wght' 500;fill:none;stroke:#ffffff;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
        d="m 102.43425,113.82621 6.445,3.72102 -6.44548,3.72131"
        id="path1133-3" />
  </g>
  </g>
  </svg>
  <div class="window-buttons"><span class="minify"><svg width="16px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect style="fill:transparent;stroke:white;stroke-width:12px;" x="4" y="88" width="92" height="8" rx="5 " />
  </svg></span><span class="midify"><svg width="16px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect style="fill:transparent;stroke:white;stroke-width:12px;" x="4" y="54" width="92" height="42" rx="5 " />
  </svg></span><span class="maxify"><svg width="16px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect style="fill:transparent;stroke:white;stroke-width:12px;" x="4" y="4" width="92" height="92" rx="5  " />
  </svg></span><span class="close">X</span></div>
  </div>
  <style>
    div.window-buttons>span{
      display:inline-block;
      width:20px;
      margin-left:5px;
      cursor:pointer;
    }
    

    
  </style>
  <form>

  <label for="ai-term-bot">Ai Term Chat</label>
  <div class="textarea" id="ai-term-bot"></div>
  <div class="prompt-ask">
    <input id="ai-term-prompt" placeholder="Message to ask AI-TERM"/>
    <button id="ai-term-ask">Ask</button>
  </div>
  </form>
  </div>`;


  document.querySelector('body').prepend(tpl2);
  document.querySelector('body').prepend(tpl1);


class AiTerm extends HTMLElement {
          
    constructor() {
        super();
        this.prompt = '';
        const template = document.getElementById('ai-term');
        const templateContent = template.content;
        //const span = document.createElement('span');
        //const slot = document.createElement('slot');
        //span.classList="ai-term";
        //span.appendChild(slot);
        //templateContent.appendChild(span)

        const shadowRoot = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
            span.ai-term { padding: 0px;border-bottom: 0.1em dashed color(display-p3 1.000000 0.270588 0.000000 / 0.701961);cursor: pointer;}
        `;

        
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(templateContent.cloneNode(true));
        

        shadowRoot.querySelector('.ai-term').addEventListener('click', () =>{
          document.querySelector('body').aiTermInputRef.value=(this.prompt||null)===null?this.textContent:this.prompt;
          document.querySelector('body').aiTermChatWindowRef.classList.add("active");
          document.querySelector('body').aiTermButtonRef.click();

        });
    }

    static get observedAttributes() {
      return ["prompt"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if(name==='prompt') this.prompt = newValue;
    }


}
    

  customElements.define('ai-term', AiTerm);


class AiTermChat extends HTMLElement {
    minify(event){
      event.target.closest('#ai-term-chat-window').classList.add('min-size');
      event.target.closest('#ai-term-chat-window').classList.remove('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('mid-size');
    }
    midify(event){
      event.target.closest('#ai-term-chat-window').classList.add('mid-size');
      event.target.closest('#ai-term-chat-window').classList.remove('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('min-size');
    }

    maxify(event){
      event.target.closest('#ai-term-chat-window').classList.add('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('mid-size');
      event.target.closest('#ai-term-chat-window').classList.remove('min-size');
    }

    close(event){
      event.target.closest('#ai-term-chat-window').classList.remove('active');
      event.target.closest('#ai-term-chat-window').classList.remove('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('min-size');
      event.target.closest('#ai-term-chat-window').classList.add('mid-size');
    }
    constructor() {
        super();
        this.apiKey='';
        const template = document.getElementById('ai-term-chat');
        const templateContent = template.content;
        //const span = document.createElement('span');
        //const slot = document.createElement('slot');
        //span.classList="ai-term";
        //span.appendChild(slot);
        //templateContent.appendChild(span)

        

        

        const shadowRoot = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
        #ai-term-chat-window {
          z-index: 1;
          height: 400px;
          width: 400px;
          background: white;
          position: fixed;
          bottom: -410px;
          right: 0vw;
          display:flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-start;
          border-radius: 20px 20px 0 0;
          padding: 0px;
          box-shadow: -5px 5px 10px #00000085;
          transition:all 0.4s ease-in-out;
          overflow: hidden;
          color:black;
        }

        #ai-term-chat-window.mid-size{
          height: 400px;
        }

        #ai-term-chat-window.min-size{
          height: 50px;
        }

        #ai-term-chat-window.max-size{
          height: calc(100dvh - 95px);
        }

        #ai-term-chat-window .title {
          width: calc(100% - 50px);
          border-radius: 20px 20px 0 0;
          background-color: black;
          padding: 14px 20px 14px 30px;
          color: black;
          font-size: large;
          box-shadow: 5px 5px 10px #0000005c;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        #ai-term-chat-window .title .window-buttons .span{
          cursor:pointer;
        }

        #ai-term-chat-window.active {
          bottom: 0vh;
        }

        
        #ai-term-chat-window form {
          width: 350px;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: left;
          padding:10px 20px;
        }

        #ai-term-chat-window form label{
          line-height:1.5rem;
          color: cornflowerblue;
          border-bottom: 1px solid cornflowerblue;
        }

        #ai-term-chat-window form .prompt-ask{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          margin-bottom:20px;
          position: relative;
        }

        #ai-term-chat-window form input {
          width: 100%;
          line-height: 1.3rem;
          border-radius: 10px;
          border: 1px solid cornflowerblue;
          height: 2.5rem;
          padding-left: 10px;
          padding-right: 50px;
        }

        #ai-term-chat-window form input:focus {
          border: 2px solid cornflowerblue;
        }

        #ai-term-chat-window form button {
          line-height:2em;
          border-radius: 10px;
          background-color: #c0d7ff;
          border: 2px solid cornflowerblue;
          box-shadow: 5px 5px 8px #36568f59;
          cursor: pointer;
          position: absolute;
          right: 6px;
          top: 5px;
        }

        #ai-term-chat-window form button:hover {
      
          background-color: #c0d7ffa0;
          box-shadow: 5px 5px 8px #36568f69;
   
        }

        #ai-term-chat-window form .textarea {
          height: 240px;
          line-height:1.5em;
          margin-bottom:20px;
          border-radius:10px;
          border: 0px solid cornflowerblue;
          color: black;
          padding: 5px;
          overflow-x: hidden;
          overflow-y: scroll;
        }

        #ai-term-chat-window.max-size form .textarea{
          height:calc(80dvh - 2.5rem - 5dvh);
        }


        #ai-term-chat-window form .textarea>div{
          width:100%;
        }

        #ai-term-chat-window form .textarea>div i{
          color:cornflowerblue;
        }
        `;


        shadowRoot.appendChild(style);
    
        shadowRoot.appendChild(templateContent.cloneNode(true));

        const input = shadowRoot.querySelector('input');
        const textarea = shadowRoot.querySelector('.textarea');

        shadowRoot.querySelector('.window-buttons .minify').addEventListener('click', this.minify);
        shadowRoot.querySelector('.window-buttons .midify').addEventListener('click', this.midify);
        shadowRoot.querySelector('.window-buttons .maxify').addEventListener('click', this.maxify);
        shadowRoot.querySelector('.window-buttons .close').addEventListener('click', this.close);

        document.querySelector('body').aiTermInputRef = shadowRoot.querySelector('input');
        document.querySelector('body').aiTermChatWindowRef = shadowRoot.querySelector('#ai-term-chat-window');
        document.querySelector('body').aiTermButtonRef = shadowRoot.querySelector('button');

        var form = shadowRoot.querySelector("form");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', async (event)=>{
          event.preventDefault();

          let _apiKey=this.apiKey;
          if(_apiKey===''){
            const meta = document.querySelector('head meta[name="ai-term_apiKey"]');
            if(meta===null){
              console.warn('No api-key set to ai-term-chat component. Existing!');
              return;
            }

            _apiKey=meta.getAttribute('content');
            
          }

          if(input.value=='') return;

          let div = document.createElement('div');

          div.innerHTML=`<b>Me</b>: ${input.value}`;
          

          textarea.appendChild(div);

          div = document.createElement('div');

          textarea.appendChild(div);

          div.innerHTML=`<i>... AI is thinking ...</i>`;
          textarea.scrollTop = textarea.scrollHeight;



          try{
            const response = await fetch('https://obscuranet.com/api/request', {
              method: "POST", 
              mode: "cors", 
              cache: "no-cache", 
              headers: {
                "Content-Type": "application/json",
                "Authorization":_apiKey
              },
              redirect: "follow", 
              referrerPolicy: "no-referrer", 
              body: JSON.stringify({ 
                authkey: 'xxx',
                url: window.location.href,
                model: "phi",
                prompt: input.value,
                refresh: false
              }) 
            });
            const resp = (await response.json()).response;
            div.innerHTML=`<b>AI</b>: ${resp}`;
            
          }catch(e){
            div.textContent='AI is overworked :-(';
          }
          input.value='';
          textarea.scrollTop = textarea.scrollHeight;
        });
    }

    static get observedAttributes() {
      return ["api-key"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if(name==='api-key') this.apiKey = newValue;
    }


}
   
//defer loading because of fastboot and similar

  customElements.define('ai-term-chat', AiTermChat);


function aiTermSetup(){
  //defer loading because of fastboot and similar
  if(typeof document !== 'undefined')
  {
    if(document.querySelector('template#ai-term')!==null){
      console.log('Found <template>: ai-term');
    }
    if(document.querySelector('template#ai-term-chat')!==null){
      console.log('Found <template>: ai-term-chat');
    }
  }
}

module.exports = {
  AiTermChat,
  AiTerm,
  aiTermSetup
};
}else{
  function AiTermChat(){}
  function AiTerm(){}
  function aiTermSetup(){}
  module.exports = {
    AiTermChat,
    AiTerm,
    aiTermSetup
  };
}