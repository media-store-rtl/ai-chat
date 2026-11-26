const form=document.getElementById('chat-form');
const input=document.getElementById('message');
const conversation=document.getElementById('conversation');
const welcome=document.getElementById('welcome');
const send=document.getElementById('send');
function addMessage(text,role){const node=document.createElement('div');node.className=`message ${role}`;node.textContent=text;conversation.appendChild(node);conversation.scrollTop=conversation.scrollHeight;return node;}
document.querySelectorAll('.suggestion').forEach(button=>button.addEventListener('click',()=>{input.value=button.textContent;input.focus();}));
document.getElementById('new-chat').addEventListener('click',()=>{conversation.innerHTML='';conversation.appendChild(welcome);welcome.hidden=false;input.value='';});
form.addEventListener('submit',async event=>{event.preventDefault();const message=input.value.trim();if(!message)return;if(welcome.isConnected)welcome.remove();addMessage(message,'user');input.value='';send.disabled=true;const pending=addMessage('در حال آماده‌سازی اتصال امن…','assistant');try{const response=await fetch('/api/chat.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message})});if(!response.ok)throw new Error('اتصال API هنوز راه‌اندازی نشده است.');const data=await response.json();pending.textContent=data.response||'پاسخی دریافت نشد.';}catch(error){pending.textContent=error.message||'فعلاً امکان برقراری ارتباط وجود ندارد.';}finally{send.disabled=false;input.focus();}});
