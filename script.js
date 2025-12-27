/* LOADING */
window.onload=()=>{
 setTimeout(()=>{
  loading.classList.add("hide");
  setTimeout(()=>loading.style.display="none",600);
 },2000);
};

/* SCROLL REVEAL */
const pages=document.querySelectorAll(".page");
window.addEventListener("scroll",()=>{
 pages.forEach(p=>{
  if(p.getBoundingClientRect().top<window.innerHeight-100)
   p.classList.add("show");
 });
});

/* PASSWORD */
const pass={
 ketua:"Ketua Osis",
 sekretaris:"Sekre Osis",
 bendahara:"Bendahara Osis"
};

/* LOGIN */
function login(){
 let role=prompt("Role");
 let pw=prompt("Password");
 if(pass[role]===pw){
  localStorage.setItem("role",role);
  setup();
 }else alert("Password salah");
}

function logout(){
 localStorage.removeItem("role");
 location.reload();
}

function setup(){
 let role=localStorage.getItem("role");
 if(!role)return;
 logoutBtn.style.display="block";
 if(role!=="bendahara")
  newsForm.style.display="block";
}

/* NEWS */
let news=JSON.parse(localStorage.getItem("news")||"[]");

function render(){
 newsList.innerHTML="";
 news.forEach(n=>{
  newsList.innerHTML+=`
   <div class="news">
    <h3>${n.t}</h3>
    <p>${n.c}</p>
   </div>`;
 });
}

function saveNews(){
 news.push({t:title.value,c:content.value});
 localStorage.setItem("news",JSON.stringify(news));
 title.value=content.value="";
 render();
}

setup();
render();
