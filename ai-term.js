import AiTerm from './ai-term-class.js';
import AiTermChat from './ai-term-chat-class.js';
import aiTermSetup from './ai-term-setup.js';



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
  tpl2.innerHTML=`
  <div class="backdrop">
  </div>
  <div id="ai-term-chat-window" draggable=true part="ai-term-chat">
  <div id="ai-term-chat-windowheader" class="title"><svg width="100" viewBox="0 0 76.231392 11.96944" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">

  <g id="layer1" transform="translate(-33.29779,-110.10422)">
  <g id="g1245">
    <text xml:space="preserve" style="font-weight:300;font-size:16.9333px;font-family:Quicksand;fill:#1984ef;fill-opacity:1;stroke-width:0.442;stroke-linecap:round" x="42.026588" y="121.90433" id="text236"><tspan id="tspan234" style="fill:#1984ef;fill-opacity:1;stroke-width:0.442" x="42.026588" y="121.90433"><tspan style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:16.9333px;font-family:Quicksand;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variation-settings:'wght' 500;fill:#1984ef;fill-opacity:1" id="tspan340">ai-term</tspan></tspan></text>
    
    <path style="font-variation-settings:'wght' 500;fill:none;stroke: black;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" d="m 40.392726,113.73502 -6.445001,3.72102 6.44548,3.72131" id="path1133"></path>
    <path style="font-variation-settings:'wght' 500;fill:none;stroke: black;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" d="m 102.43425,113.82621 6.445,3.72102 -6.44548,3.72131" id="path1133-3"></path>
  </g>
  </g>
  </svg>
  <div class="window-buttons"><!--span class="minify"><svg width="14px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect style="fill:transparent;stroke:black;stroke-width:12px;" x="4" y="88" width="92" height="8" rx="5 " />
  </svg></span><span class="midify"><svg width="14px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect style="fill:transparent;stroke:black;stroke-width:12px;" x="4" y="54" width="92" height="42" rx="5 " />
  </svg></span><span class="maxify"><svg width="14px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect style="fill:transparent;stroke:black;stroke-width:12px;" x="4" y="4" width="92" height="92" rx="5  " />
  </svg></span--><span class="close">X</span></div>
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

  <div class="textarea" id="ai-term-bot"></div>
  <div class="prompt-ask">
    <input id="ai-term-prompt" placeholder="Message to ask AI-TERM"/>
    <button id="ai-term-ask"><svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" fill="none">
    <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="cornflowerblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></button>
  </div>
  </form>
  </div>`;


  document.querySelector('body').prepend(tpl2);
  document.querySelector('body').prepend(tpl1);



  customElements.define('ai-term', AiTerm);


//defer loading because of fastboot and similar

  customElements.define('ai-term-chat', AiTermChat);

  }


export {  AiTermChat,  AiTerm, aiTermSetup };