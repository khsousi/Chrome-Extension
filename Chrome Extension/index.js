// Variables
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.querySelector("#tab-btn")
const ulEl = document.getElementById("ul-el");
let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// Deal With LocalStorage 
  if(leadsFromLocalStorage){
      myLeads = leadsFromLocalStorage ;
      render(myLeads);
  }
// Event Listeners

// Input Button
inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  inputEl.focus();
  ulEl.innerHTML = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});


// Delete Button
deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear();
  myLeads.length = 0;
  ulEl.innerHTML = "";
});

// Tab Button
tabBtn.addEventListener("click" , function (){
  chrome.tabs.query({active: true , currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
  })
})


// functions
function render(leads){
  ulEl.innerHTML = "";
  leads.forEach((lead) => {
    const li = document.createElement("li");
    li.innerHTML =`<a class="lead-link" href="${lead}" target="_blank">${lead}</a>`;
    li.classList.add("item");
    ulEl.appendChild(li);
  })
};
