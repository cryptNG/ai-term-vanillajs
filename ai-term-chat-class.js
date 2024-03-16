
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
          
          height: 400px;
          width: min(400px,100dvw);
          background: white;
          position: fixed;
          display:flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-start;
    
          padding: 0px;
          box-shadow: -5px 5px 10px #00000085;
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
            top:calc(50dvh - 200px);
            left: calc(50dvw - min(50dvw,200px));
            border-radius: 20px;
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
            bottom:0px;
          }

          #ai-term-chat-window {
            bottom:-440px;
            right:0;
            border-radius: 20px 20px 0 0;
            display:flex;
          }

          

        }

        #ai-term-chat-window.mid-size{
          height: 400px;
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
          width: calc(100% - 19px);
          border-radius: 20px 20px 0 0;
          padding: 2px 5px 4px 14px;
          color: black;
          font-size: large;
          font-weight: 600;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          color: black;
          background-color: #dddddd;
        }

        #ai-term-chat-window .title .window-buttons{
          position: relative;
          right: 6px;
          top: 2px;
          background-color: white;
          width: 21px;
          height: 21px;
          border-radius: 41px;
          font-family: sans-serif;
        }


        #ai-term-chat-window .title .window-buttons span{
          display: inline-block;
          position: relative;
          top: -2px;
          left: 5px;
          cursor: pointer;
          color: #2f2f2f;
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
          height: 340px;
          line-height:1.5em;
          margin-bottom:9px;
          border-radius:10px;
          border: 0px solid cornflowerblue;
          color: black;
          padding: 5px;
          overflow-x: hidden;
          overflow-y: auto;
        }

        #ai-term-chat-window.display-prompt form .textarea {
          height: 290px;
        }

        #ai-term-chat-window form .textarea b{
          margin-top: 0.5em;
          color: #4675c9;
          display: inline-block;
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

          div.innerHTML=`<b>${input.value}</b>`;
          

          textarea.appendChild(div);

          div = document.createElement('div');

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
            div.innerHTML=`<em>${resp}</em>`;
            
          }catch(e){
            div.textContent='AI is overworked :-(';
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