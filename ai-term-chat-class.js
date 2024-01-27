
export default class AiTermChat extends HTMLElement {
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
        this.apiUrl='https://ai-term.app/api/';
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
          z-index: 100;
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

          if(_apiKey.length<10){
            console.warn('No valid api-key set. Existing!');
            return;
          }
          if(isNaN(_apiKey.charAt(0))){
            console.warn('Wrong package type in api-key. Existing!');
            return;
          }

          const packageIndex = _apiKey.charAt(0)*1;

          if(packageIndex>1){
            console.warn('No valid api-key set. Existing!');
            return;
          }

          const pkg =['free/dev','free/prod','std/dev','std/prod'][packageIndex];

          if(input.value=='') return;

          let div = document.createElement('div');

          div.innerHTML=`<b>Me</b>: ${input.value}`;
          

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
            div.innerHTML=`<b>AI</b>: ${resp}`;
            
          }catch(e){
            div.textContent='AI is overworked :-(';
          }
          input.value='';
          textarea.scrollTop = textarea.scrollHeight;
        });
    }

    static get observedAttributes() {
      return ["api-key","api-url"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if(name==='api-key') this.apiKey = newValue;
      if(name==='api-url') this.apiUrl = newValue;
    }


}
  