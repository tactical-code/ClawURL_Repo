let myLeads = []
/* fliping back and fouth between string and arrays */
/* let myLeads = ["www.aswom.com"]
/* turn string into an array */
/* myLeads = JSON.parse(myleads) */
/* turn array back into string */
/* myLeads = JSON.stringify(myLeads)
console.log(typeof myLeads) */


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("deletebtn")
const tabbtn = document.getElementById("tab-btn")
/* localStorage.clear() *//* Clear local storage */
/* While retriving data we should convert string it into array because local storage doesn't support complex data type, so data is stored in the form of string */
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  Render(myLeads)
}


tabbtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //console.log(tabs[0].url)
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    Render(myLeads)

    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    /* let activeTab = tabs[0]
    let activeTabId = activeTab.id */
  })

  
})

function Render (Leads){
  let listItems = ""
  for(i=0; i < Leads.length; i++) {
    listItems += `
      <li>
        <a target='_black' href='${Leads[i]}'>
          ${Leads[i]}
        </a>
      </li>`

  /* const li = document.createElement("li")
  li.textContent = myLeads[i]
  ulEl.append(li) */
  }
  ulEl.innerHTML = listItems
}

/* localStorage.clear()
 */
deletebtn.addEventListener("click", function(){
  localStorage.clear()
  myLeads = []
  Render(myLeads)
})

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  /* console.log(myLeads) */
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))/* "myLeads --> is the key value" */
  Render(myLeads)
 /*  console.log(localStorage.getItem("myLeads")) */
})

