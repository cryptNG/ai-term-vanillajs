
async function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default class AiTermChat extends HTMLElement {
    minify(event){
      event.preventDefault();
      event.target.closest('#ai-term-chat-window').classList.add('min-size');
      event.target.closest('#ai-term-chat-window').classList.remove('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('mid-size');
    }
    midify(event){
      event.preventDefault();
      event.target.closest('#ai-term-chat-window').classList.add('mid-size');
      event.target.closest('#ai-term-chat-window').classList.remove('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('min-size');
    }

    maxify(event){
      event.preventDefault();
      event.target.closest('#ai-term-chat-window').classList.add('max-size');
      event.target.closest('#ai-term-chat-window').classList.remove('mid-size');
      event.target.closest('#ai-term-chat-window').classList.remove('min-size');
    }

    optionsChangeListeners=[];
    
    constructor() {
        super();
        this.apiKey='';
        this.apiUrl='https://ai-term.app/api/';
        this.showPrompt='';
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
        @media (max-width: 800px)
        {
          .backdrop{
            width:100dvw;
            height:100dvh;
            position:fixed;
            top: 100dvh;
            left: 0;
            visibility: hidden;
            background-color: #aeaeaecc;
            backdrop-filter: blur(3px);
          }

          .backdrop.active{
            top:0;

            visibility:visible;
          }
        }

        @media (min-width: 800px)
        {
          .backdrop{
            display:none;
          }
        }
        

        
        

        
        #ai-term-chat-window {
          z-index: 9999999999;
          
          height: calc(80dvh);
          max-height: 650px;
          width: min(400px,100dvw);
          background: white;
          position: fixed;
          display:flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          
          border-radius: 15px;
          padding: 0px;
          box-shadow: 4px 4px 8px #00000065;
          transition:all 0.4s ease-in-out;
          overflow: hidden;
          color:black;
          
          transition: all 0.5s ease-in-out;
        }

        @media (max-width: 800px)
        {

          #ai-term-chat-window.active {
            display:flex;
          }

          
          #ai-term-chat-window.active.visible {
            opacity:1;
          }

          #ai-term-chat-window {
            top:calc(50dvh - min(40dvh,325px));
            left: calc(50dvw - min(50dvw,200px));
            border-radius: 15px;
            display:none;
            opacity:0;
          }

          #ai-term-chat-window.max-size{
            top:45px;
          }
        }

        @media (min-width: 801px)
        {
          #ai-term-chat-window.active {
            display:flex;
          }

          
          #ai-term-chat-window.active.visible {
            bottom:8dvh;
          }

          #ai-term-chat-window {
            bottom:-90dvh;
            right:3dvw;
            display:flex;
          }

          

        }

        #ai-term-chat-window.mid-size{
          height: 60dvh;
        }

        #ai-term-chat-window.min-size{
          height: 50px;
          width:50px;
          right:0;
        }

        #ai-term-chat-window.max-size{
          height: calc(100dvh - 95px);
        
        }

        #ai-term-chat-window .title {
          width: calc(100% - 25px);
          padding: 9px 5px 9px 20px;
          color: black;
          font-size: large;
          font-weight: 600;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          color: white;
          background-color: #2196f3c9;
        }

        #ai-term-chat-window .title .window-buttons{
          position: relative;
          right: 6px;
          top: 2px;
          width: 21px;
          height: 21px;
          border-radius: 41px;
          font-family: system-ui;
        }


        #ai-term-chat-window .title .window-buttons span{
          display: inline-block;
          position: relative;
          top: -2px;
          left: 5px;
          cursor: pointer;
          transform: scaleY(0.8);
          transition: all 0.3s ease-in-out;
        }

        #ai-term-chat-window .title .window-buttons span:hover{
          color:black;
          text-shadow: 1px 2px 2px rgba(0,0,0,0.5);
        }
        .backdrop.active #ai-term-chat-window {
          bottom: 0vh;
        }

        
        #ai-term-chat-window form {
          width: min(380px,95dvw);
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: left;
          padding:10px 10px;
          overflow-y: auto;
        }

        #ai-term-chat-window form label{
          line-height:1.5rem;
          color: cornflowerblue;
          border-bottom: 1px solid cornflowerblue;
        }

        #ai-term-chat-window.display-prompt form .prompt-ask{
          display: flex;
        }
        #ai-term-chat-window form .prompt-ask{
          
          flex-direction: row;
          flex-wrap: nowrap;
          position: absolute;
          bottom: 10px;
          width: min(350px,95dvw);
          display:none;
        }

        #ai-term-chat-window form input {
          width: 100%;
          line-height: 1.3rem;
          border: 0;
          border-bottom: 1px solid cornflowerblue;
          height: 2.5rem;
          padding-left: 10px;
          padding-right: 50px;
          outline: none;
        }

        #ai-term-chat-window form input:focus {
          outline: none;
          border-bottom: 2px solid cornflowerblue;
        }

        input#ai-term-prompt:focus-visible {
          outline: none;
        }
        input#ai-term-prompt:-internal-autofill-selected {
          background-color:transparent;
        }

        #ai-term-chat-window form button {
          line-height:2em;
          background-color: transparent;
          border:0;
          cursor: pointer;
          position: absolute;
          right: -6px;
          top: 12px;
        }

        #ai-term-chat-window form button:hover svg path{
      
          stroke:#4675c9 !important;
   
        }

        #ai-term-chat-window form .textarea {
          line-height:1.3em;
          border: 0px solid cornflowerblue;
          color: rgba(0,0,0,0.74);
          padding: 5px;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-end;
        }

        #ai-term-chat-window form .textarea::-webkit-scrollbar {
            width: 6px;
        }
        
        #ai-term-chat-window form .textarea::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: #e7e7e710;
            border: 1px solid #cacaca10;
        }
        
        #ai-term-chat-window form .textarea::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #2196f370;
        }

        #ai-term-chat-window.display-prompt form .textarea {
          height: calc(100% - 60px);
        }

        #ai-term-chat-window form .textarea .ask{
          box-shadow: 1px 2px 8px #00000030;
          border-radius: 8px;
          padding: 4px 8px;
          margin: 2px 1px 5px 0;
          width: 75%;
          background-color: #2196f3;
          color: white;
        }

        #ai-term-chat-window form .textarea .response{
          box-shadow: 1px 1px 5px #00000020;
          border-radius: 8px;
          padding: 4px 8px;
          margin: 5px 1px 15px 1px;
          width: calc(100% - 16px);
          background-color: white;
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

        #ai-term-chat-window form .footer{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          flex-wrap: nowrap;
          font-family: system-ui;
          font-weight: 300;
          font-size: smaller;
          border-top: 1px solid #00000047;
          padding-top: 5px;
          color: rgba(0,0,0,0.6);
        }

        .logo-word{
          color: #3f70c8;
          font-family: monospace;
          white-space: nowrap;
        }

        #ai-term-chat-window form .footer .logo-word{
          margin-left:0.5em;
        }
        `;


        shadowRoot.appendChild(style);
    
        shadowRoot.appendChild(templateContent.cloneNode(true));

        const input = shadowRoot.querySelector('input');
        const textarea = shadowRoot.querySelector('.textarea');

        
        

        document.querySelector('body').aiTermInputRef = shadowRoot.querySelector('input');
        const chatW = shadowRoot.querySelector('#ai-term-chat-window');
        document.querySelector('body').aiTermChatWindowRef = shadowRoot.querySelector('#ai-term-chat-window');
        chatW.show = async ()=>{
          chatW.classList.add('active');
          shadowRoot.querySelector('.backdrop').classList.add('active');
          await Sleep(50);
          chatW.classList.add('visible');
        };

        chatW.close = async ()=>{
    
            chatW.classList.remove('visible');
            await Sleep(500);
            shadowRoot.querySelector('.backdrop').classList.remove('active');
            chatW.classList.remove('active');
            chatW.classList.remove('max-size');
            chatW.classList.remove('min-size');
            chatW.classList.add('mid-size');
         
        };

        //shadowRoot.querySelector('.window-buttons .minify').addEventListener('click', this.minify);
        //shadowRoot.querySelector('.window-buttons .midify').addEventListener('click', this.midify);
        //shadowRoot.querySelector('.window-buttons .maxify').addEventListener('click', this.maxify);
        shadowRoot.querySelector('.window-buttons .close').addEventListener('click', async (event)=>{
          chatW.close();
        });

        shadowRoot.querySelector('.backdrop').onclick = async (event)=>{
          chatW.close();
        };
        document.querySelector('body').aiTermButtonRef = shadowRoot.querySelector('button');
        document.querySelector('body').aiTermRegisterOptionChange = this.onOptionsChange;

        var form = shadowRoot.querySelector("form");
        function handleForm(event) { event.preventDefault(); } 
        document.querySelector('body').aiTermButtonRef.onclick = async (event)=>{
         // event.stopPropagation();
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

          if(_apiKey.length<110){
            console.warn('No valid api-key set. Existing!');
            return;
          }
          if(isNaN(_apiKey.charAt(0))){
            console.warn('Wrong package type in api-key. Existing!');
            return;
          }

          const packageIndex = _apiKey.charAt(0)*1;

          if(packageIndex>3){
            console.warn('No valid api-key set. Existing!');
            return;
          }

          const pkg =['free/dev','free/prod','std/dev','std/prod'][packageIndex];

          if(input.value=='') return;

          let div = document.createElement('div');

          div.innerHTML=`<span>${input.value}</span>`;

          div.classList.add('ask');
          

          textarea.appendChild(div);

          div = document.createElement('div');

          div.classList.add('response');

          textarea.appendChild(div);

          div.innerHTML=`<i>... AI is thinking ...</i>`;
          textarea.scrollTop = textarea.scrollHeight;



          try{
            const response = await fetch(this.apiUrl+pkg+'/generate', {
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
                prompt: input.value
              }) 
            });
            const resp = (await response.json()).response;
            div.innerHTML=`<span>${resp}</span>`;
            
          }catch(e){
            div.innerHTML='<em>AI is overworked :-(</em>';
          }
          input.value='';
          textarea.scrollTop = textarea.scrollHeight;
        };
        
    }

    onOptionsChange=(cb)=>{
      this.optionsChangeListeners.push(cb);
      if(this.options!==undefined){
        cb(this.options);
      }
    }
    updateOptions=()=>{
      this.optionsChangeListeners.forEach((cb)=>cb(this.options));
    }

    static get observedAttributes() {
      return ["api-key","api-url","show-prompt","options"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if(name==='api-key') this.apiKey = newValue;
      if(name==='api-url') this.apiUrl = newValue;
      if(name==='options'){
        this.options = JSON.parse(newValue||{});
        this.updateOptions();
      } 
      if(name==='show-prompt'){
        this.showPrompt = newValue+'';
        if(this.showPrompt!=='' && this.showPrompt !=='false'){
          this.shadowRoot.querySelector('#ai-term-chat-window').classList.add('display-prompt');
        }else this.shadowRoot.querySelector('#ai-term-chat-window').classList.remove('display-prompt');

      } 
    }


}