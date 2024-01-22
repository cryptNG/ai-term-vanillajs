import AiTerm from './ai-term-class.js';
import AiTermChat from './ai-term-chat-class.js';

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



  customElements.define('ai-term', AiTerm);


//defer loading because of fastboot and similar

  customElements.define('ai-term-chat', AiTermChat);


const aiTermSetup =function (){
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


}else{
  function AiTermChat(){}
  function AiTerm(){}
  function aiTermSetup(){}
  
}

export {  AiTermChat,  AiTerm };