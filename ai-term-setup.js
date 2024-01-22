
if(typeof document !== 'undefined')
{
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
  const aiTermSetup =function (){}
  
}

export default aiTermSetup;

