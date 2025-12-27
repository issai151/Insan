/* LOADING + TRANSISI */
window.onload=()=>{
 document.getElementById("loadSound").play();
 setTimeout(()=>{
  const l=document.getElementById("loading");
  l.classList.add("hide");
  setTimeout(()=>l.style.display="none",600);
 },2800);
};

/* PASSWORD RESMI */
const pass={
 ketua:"InsanT_Chair25",
 sekretaris:"InsanT_Secre25",
 bendahara:"InsanT_Treas25"
};

let editIndex=null;

/* LOGIN */
function login(){
 let role=prompt("Role (ketua / sekretaris / bendahara)");
 let pw=prompt("Password");
 if(pass[role]===pw){
  localStorage.setItem("role",role);
  alert("Login sebagai "+role);
  setupRole();
 }else alert("Password salah");
}

/* LOGOUT */
function logout(){
 if(confirm("Logout admin?")){
  localStorage.removeItem("role");
  location.reload();
 }
}

/* ROLE */
function setupRole(){
 let role=localStorage.getItem("role");
 if(!role)return;
 document.getElementById("logoutBtn").style.display="block";
 if(role!=="bendahara")
  document.getElementById("newsForm").style.display="block";
}

/* NEWS */
let news=JSON.parse(localStorage.getItem("news")||"[]");

function render(){
 let html="";
 news.forEach((n,i)=>{
  html+=`
  <div class="news">
   <h3>${n.t}</h3>
   <p>${n.c}</p>
   ${localStorage.getItem("role")!=="bendahara"?
   `<button class="edit" onclick="edit(${i})">Edit</button>
    <button class="del" onclick="del(${i})">Hapus</button>`:""}
  </div>`;
 });
 document.getElementById("newsList").innerHTML=html;
}

function saveNews(){
 let t=title.value,c=content.value;
 if(editIndex!==null){
  news[editIndex]={t,c}; editIndex=null;
 }else news.push({t,c});
 localStorage.setItem("news",JSON.stringify(news));
 title.value=content.value="";
 render();
}

function edit(i){
 title.value=news[i].t;
 content.value=news[i].c;
 editIndex=i;
}

function del(i){
 if(confirm("Hapus berita?")){
  news.splice(i,1);
  localStorage.setItem("news",JSON.stringify(news));
  render();
 }
}

setupRole();
render();
