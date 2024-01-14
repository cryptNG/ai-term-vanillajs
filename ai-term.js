

const tpl1 = document.createElement('template');
tpl1.id='ai-term';
tpl1.innerHTML=`<div style="display: inline-flex;">
<span class="ai-term">
  <slot>
  </slot>
  
    </span>

</div>`;

const tpl2 = document.createElement('template');
tpl2.id='ai-term-chat';
tpl2.innerHTML=`<div id="ai-term-chat-window">
<div class="title">AI Wiki Chat</div>
<form>
<label for="ai-term-prompt">Ask Prompt</label>
<div class="prompt-ask">
  <input id="ai-term-prompt"/>
  <button id="ai-term-ask">Ask AI</button>
</div>
<label for="ai-term-bot">Wiki AI Answer</label>
<div class="textarea" id="ai-term-bot"></div>
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
          document.querySelector('body').aiTermInputRef.value=this.prompt;
          document.querySelector('body').aiTermChatWindowRef.classList.toggle("active");
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
    constructor() {
        super();

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
          height: 400px;
          width: 400px;
          background: white;
          position: absolute;
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

        #ai-term-chat-window .title {
          width: 100%;
          height: 2rem;
          border-radius: 20px 20px 0 0;
          background-color: burlywood;
          padding: 10px 0 10px 30px;
          color: black;
          font-size: large;
          box-shadow: 5px 5px 10px #0000005c;
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
        }

        #ai-term-chat-window form .prompt-ask{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: left;
          margin-bottom:20px;
        }

        #ai-term-chat-window form input {
          width: 290px;
          line-height:1.1em;
          border-radius:10px;
          border: 1px solid cornflowerblue;
        }

        #ai-term-chat-window form input:focus {
          border: 2px solid cornflowerblue;
        }

        #ai-term-chat-window form button {
          width: calc(100% - 300px);
          line-height:2em;
          margin-left:10px;
          border-radius:10px;
          background-color: #c0d7ff;
          border: 2px solid cornflowerblue;
          box-shadow: 5px 5px 8px #36568f59;
          cursor:pointer;
        }

        #ai-term-chat-window form button:hover {
      
          background-color: #c0d7ffa0;
          box-shadow: 5px 5px 8px #36568f69;
   
        }

        #ai-term-chat-window form .textarea {
          width: 100%;
          height: 200px;
          line-height:1.5em;
          margin-bottom:20px;
          border-radius:10px;
          border: 1px solid cornflowerblue;
          color: black;
          padding: 5px;
          overflow: scroll;
        }

        #ai-term-chat-window form .textarea>div{
          width:100%;
        }
        `;


        shadowRoot.appendChild(style);
    
        shadowRoot.appendChild(templateContent.cloneNode(true));

        const input = shadowRoot.querySelector('input');
        const textarea = shadowRoot.querySelector('.textarea');

        document.querySelector('body').aiTermInputRef = shadowRoot.querySelector('input');
        document.querySelector('body').aiTermChatWindowRef = shadowRoot.querySelector('#ai-term-chat-window');
        document.querySelector('body').aiTermButtonRef = shadowRoot.querySelector('button');

        var form = shadowRoot.querySelector("form");
      function handleForm(event) { event.preventDefault(); } 
      form.addEventListener('submit', async (event)=>{
        event.preventDefault();

        if(input.value=='') return;

        let div = document.createElement('div');

        div.textContent="Me: " + input.value;
        

        textarea.appendChild(div);

        div = document.createElement('div');

        textarea.appendChild(div);

        div.textContent='... AI is thinking ...';

        try{
          const response = await fetch('https://obscuranet.com/api/request', {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            headers: {
              "Content-Type": "application/json",
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
          div.textContent='AI: '+(await response.json()).response;
        }catch(e){
          div.textContent='AI is overworked :-(';
        }
        input.value='';
      });
    }


}
    
customElements.define('ai-term-chat', AiTermChat);