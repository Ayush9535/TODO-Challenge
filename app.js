arr1 = [];
arr2 = [];
obj1 = {};
arr3 = [];

const input = document.querySelector("#input-box")
const addbtn = document.querySelector("#add-btn")
const container = document.querySelector("#container-1")
const list = document.querySelector("#list")
const list2 = document.querySelector("#list2");
const right = document.querySelector(".right")
const left = document.querySelector(".left")


// This function will show the to do list 
function showList(a,b){
    for(let i=0 ; i<a.length ; i++){
        
        let listItem = document.createElement("li")
        let div = document.createElement("div")
        let input = document.createElement("input")
        let label = document.createElement("label")
        let editbtn = document.createElement("button")
        window.listItem = listItem

        input.type = "checkbox"
        input.name = "input"
        label.for = "input"
        label.innerHTML = a[i]
        editbtn.innerHTML = "Edit"

        if (isCompleted(i , a) == false){
            listItem.classList.remove("blur")
            editbtn.disabled = false
        }else{
            listItem.classList.add("blur")
            editbtn.disabled = true
            input.checked = true
        }

        input.onclick = () =>{

            if (isCompleted(i , a)){
                listItem.classList.remove("blur")
                editbtn.disabled = false
                obj1[a[i]] = "not completed"
            }else{
                listItem.classList.add("blur")
                editbtn.disabled = true
                obj1[a[i]] = "completed"
                // console.log(obj1)
            }
            
        }
        editbtn.onclick = () =>{
            editBTN(i , a)
            emptyList()
            showList(a , b) 
        }

        div.append(input)
        div.append(label)
        listItem.append(div)
        listItem.append(editbtn)
        list.append(listItem)
    }

    for(let k=0 ; k<b.length ; k++){
        
        let listItem2 = document.createElement("li")
        let div = document.createElement("div")
        let input = document.createElement("input")
        let label = document.createElement("label")
        let editbtn = document.createElement("button")

        input.type = "checkbox"
        input.name = "input"
        label.for = "input"
        label.innerHTML = b[k]
        editbtn.innerHTML = "Edit"

        if (obj1[b[k]] == "not completed"){
            listItem2.classList.remove("blur")
            editbtn.disabled = false
        }else{
            listItem2.classList.add("blur")
            editbtn.disabled = true
            input.checked = true
        }

        input.onclick = () =>{

            if (isCompleted(k , b)){
                listItem2.classList.remove("blur")
                editbtn.disabled = false
                obj1[b[k]] = "not completed"
                console.log(obj1)
            }else{
                listItem2.classList.add("blur")
                console.log(editbtn.disabled)
                editbtn.disabled = true
                obj1[b[k]] = "completed"
                console.log(obj1)
            }
            
        }

        editbtn.onclick = () =>{
            editBTN(k , b)
            emptyList()
            showList(a , b)
        }

        div.append(input)
        div.append(label)
        listItem2.append(div)
        listItem2.append(editbtn)
        list2.append(listItem2)
    }
}

// This is a function to check whether the task is completed or not 
function isCompleted(i , l){
    if (obj1[l[i]] == "completed"){
        return true
    }else{
        return false
    }
}


// This function will clear the to do list to display the updated list 
function emptyList(){
    list.innerHTML = ""
    list2.innerHTML = ""
}


// This function will edit the name of task 
function editBTN(i , m){
    let result = prompt("Enter New Name")
    if (typeof(result) == "object"){
        m.splice(i,1,m[i])
        console.log(obj1)
    }
    else if ((result != "")){
        let keyValues = Object.entries(obj1)
        keyValues.splice(arr1.indexOf(m[i]),1,[result,obj1[m[i]]])
        obj1 = {}
        for (let g=0 ; g<keyValues.length ; g++){
            obj1[keyValues[g][0]] = keyValues[g][1]
        }
        for (let h=0 ; h<arr1.length ; h++){
            console.log(arr1[h])
            console.log(m[i])
            if (arr1[h] === m[i]){
                arr1[h] = result
            }
        }
        m.splice(i,1,result)
    }
}


// this will add the task to to do list 
addbtn.addEventListener("click",function(){
    if (input.value == ""){
        alert("Please Enter Some Task to Add")
    }else{
        arr1.push(input.value)
        obj1[input.value] = "not completed"
        input.value = ""
        emptyList()
        showList(arr1 , arr2)
    }
})


function move2New(){
    arr2 = []
    arr3 = []
    for (let j=0 ; j<arr1.length;j++){
        if (isCompleted(j , arr1)){
            arr2.push(arr1[j])
        }else{
            arr3.push(arr1[j])
        }
    }
    emptyList()
    showList(arr3 , arr2)
}

function move2old(){
    arr2 = []
    arr3 = []

    for (let i=0 ; i<arr1.length ; i++){
        if (isCompleted(i , arr1)){
            arr2.push(arr1[i])
        }else{
            arr3.push(arr1[i])
        }
    }

    emptyList()
    showList(arr3 , arr2)
}

right.addEventListener("click" , move2New)
left.addEventListener("click" , move2old)


