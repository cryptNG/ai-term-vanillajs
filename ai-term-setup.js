let _aiTermSetup=function (){};

if(typeof document !== 'undefined')
{
  _aiTermSetup =function (){
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


}
export default _aiTermSetup;

