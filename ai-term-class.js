//defer loading because of fastboot and similar

export default class AiTerm extends HTMLElement {
  shadowRoot=null
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
      this.shadowRoot=shadowRoot;

      const style = document.createElement('style');
      style.textContent = `
          :host{
            --underline-color:inherited;
            --underline-style:dashed;
            --underline-width:0.1em;
            --text-color:inherited;
            --text-family:revert;
            --text-size:auto;
            --text-cursor:pointer;
            --underline-rgb:linear-gradient(90deg, #e50b58,#b29d23,#55ddbd);
            --underline-rgb-1:linear-gradient(90deg, #ae1ffd,#ff3c34,#9bbf24);
            --underline-rgb-2:linear-gradient(130deg,#2E3192,#1BFFFF 76.05%);
            --underline-rgb-3:linear-gradient(130deg,#ff7a18,#af002d 41.07%,#319197 76.05%);
            --underline-rgb-5:linear-gradient(130deg,#ff7a18,#af002d 41.07%,#319197 76.05%);
          }

          span.ai-term {
            position:relative;
            font-size:var(--text-size);
            font-family:var(--text-family);
            cursor:var(--text-cursor);
            color:var(--text-color);
          }

          :host(:not(.rgb)) :not(.ai-term-container.rgb) span.ai-term { 
            padding: 0px;
            border-bottom: var(--underline-width) var(--underline-style) var(--underline-color);
            cursor: pointer;
          }

          .ai-term-container.rgb span.ai-term:after,
          :host(.rgb) span.ai-term:after {
            content: "";
            position: absolute;
            top: 1.5em;
            width: 100%;
            left: 0;
            height:  max(2px,calc(var(--underline-width) / 2));
            border-radius: 2px;
            background: var(--underline-rgb);
          }
          .ai-term-container.asterisk span.ai-term:before,
          :host(.asterisk) span.ai-term:before {
            content: "*";
            position: absolute;
            top: -0.3em;
            width: 1em;
            color: var(--underline-color);
            left: calc(100% - 0.1em);
          }
      `;

      
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
      
      this.registerOptionsChange();
      shadowRoot.querySelector('.ai-term').addEventListener('click', (event) =>{
        event.stopPropagation();
        document.querySelector('body').aiTermInputRef.value=(this.prompt||null)===null?this.textContent:this.prompt;
        document.querySelector('body').aiTermChatWindowRef.show();
        document.querySelector('body').aiTermButtonRef.click();

      });

      
  }

  registerOptionsChange = async ()=>{
    const body = document.querySelector('body');
    while(body.aiTermRegisterOptionChange === undefined){
      await Sleep(100);
    }
    body.aiTermRegisterOptionChange(this.handleOptionsChange);
  }

  handleOptionsChange=(options)=>{
    if((options?.highlight||null)!==null){
      options.highlight.split(',').forEach(hl=> this.shadowRoot.querySelector('.ai-term-container').classList.add(hl));
    }
  }

  static get observedAttributes() {
    return ["prompt"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if(name==='prompt') this.prompt = newValue;
  }


}
  
async function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}