//defer loading because of fastboot and similar

export default class AiTerm extends HTMLElement {
          
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
    