


var conditions = {
    keySearch: "",
    currentPage: 1,
    perPage: 3,
    sort: {
        field: "",
        type: ""
    }
}
console.log(conditions);




var students = [
    { id: 1, name: "anh", age: 12, email: "ags@gmail.com", score: 20 },
    { id: 2, name: "hai", age: 15, email: "bs@gmail.com", score: 23 },
    { id: 3, name: "đạt", age: 13, email: "fs@gmail.com", score: 12 },
    { id: 4, name: "mạnh", age: 24, email: "es@gmail.com", score: 19 },
    { id: 5, name: "nam", age: 43, email: "bs@gmail.com", score: 24 },
    { id: 6, name: "hưng", age: 12, email: "ds@gmail.com", score: 21 },
    { id: 7, name: "tiến", age: 29, email: "cs@gmail.com", score: 27 },
    { id: 8, name: "tùng", age: 19, email: "gs@gmail.com", score: 10 },
    { id: 9, name: "trung", age: 20, email: "is@gmail.com", score: 9 },
    { id: 10, name: "định", age: 33, email: "ks@gmail.com", score: 14 },
    { id: 11, name: "trọng", age: 29, email: "sds@gmail.com", score: 27 },
    { id: 12, name: "sơn", age: 19, email: "gs@gmail.com", score: 18 },
    { id: 13, name: "chính", age: 24, email: "êrs@gmail.com", score: 15 },
    { id: 14, name: "thái", age: 32, email: "dfdf@gmail.com", score: 14 },
];


renderListStudent()


function condition(){
    let newStudent = JSON.parse(JSON.stringify(students))
    if(conditions.keySearch){
        newStudent = newStudent.filter(student => student.name.includes(conditions.keySearch))
    }
    if(conditions.sort.field){
        let listNumber = ["age","score"]
        let listString = ["name","email"]
        if(listNumber.includes(conditions.sort.field)){
            newStudent = newStudent.sort((a,b)=>{
                if(conditions.sort.type === "ASC"){
                    return a[conditions.sort.field] -b[conditions.sort.field]
                }
                if(conditions.sort.type === "DESC"){
                    return b[conditions.sort.field] -a[conditions.sort.field]
                }
            })
            if (listString.includes(conditions.sort.field)) {
                resultStudents = resultStudents.sort((a, b) => {
                    if (conditions.sort.type === "ASC") {
                        return a[conditions.sort.field].localeCompare(b[conditions.sort.field])
                    }
                    if (conditions.sort.type === "DESC") {
                        return b[conditions.sort.field].localeCompare(a[conditions.sort.field])
                    }
                })
            }

    }

    }
    var totalStudent = newStudent.length
        renderNumberPage(totalStudent)

        document.getElementById("totalitem").innerHTML = `${totalStudent} student `

        newStudent = newStudent.slice(
            (conditions.currentPage - 1) * conditions.perPage,
            (conditions.currentPage - 1) * conditions.perPage + conditions.perPage
        )

    return newStudent
}


function renderListStudent(){
    var array = condition()
    var data = array.map((item)=>{
        data = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.email}</td>
                    <td>${item.score}</td>
                    <td>
                    <button class="btn btn-warning" onclick="editStudent(${item.id})">
                        Edit
                    </button>
                    </td>
                    <td>
                    <button class="btn btn-danger" onclick="deleteStudent(${item.id})">
                        Delete
                    </button>
                    </td>
                </tr>`
        return data;
    })
    document.getElementById("tableStudent").innerHTML = data.join("")

}

function addStudent (){
    var id = Date.now()
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var email = document.getElementById("email").value
    var score = document.getElementById("score").value
    var data = {
        id: id,
        name: name,
        age: age?Number(age):age,
        email: email,
        score: score?Number(score):score
    }

    var isValid = validate(data)
        if(!isValid){
            return };

            students.unshift(data);
            renderListStudent()
            clear

    
}

function validateEmail(email) {
    console.log("hi",email)
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};




function validate({name,age,email,score}){
    var isValidEmail = validateEmail(email);
    if(name !== ""){
        if(name.length <1 || name.length >20){
            alert("tên phải lớn hơn 0 và nhỏ hơn 20 ký tự")
            return false
        }
    } else{
        alert("chưa nhập tên")
        return false
    }
    if(age !== ""){
        if(age <10 || age >70){
            alert("tuổi phải lớn hơn 10 và nhỏ hơn 70")
            return false
        }
    } else{
        alert("chưa nhập tuổi")
        return false
    }
    if(email !== ""){
        if(!isValidEmail){
            alert("email không hợp lệ")
            return false
        }
    } else{
        alert("chưa nhập email")
        return false
    }
    if(score !== ""){
        if(score <0 || score >31){
            alert("điểm phải lớn hơn bằng 0 và nhỏ hơn 31")
            return false
        }
    } else{
        alert("chưa nhập điểm")
        return false
    }

    return true
}

function clear(){ 
       id = null
    document.getElementById("name").value=""
    document.getElementById("age").value=""
    document.getElementById("email").value=""
    document.getElementById("score").value=""
}

function deleteStudent(id){
var student = students.filter(item => item.id === id)
students.splice(students.indexOf(student),1)
renderListStudent()



}

var idUpdate;
function editStudent(id){
    idUpdate=id;
    var student = students.find(item => item.id === id)
    document.getElementById("name").value = student.name
    document.getElementById("age").value = student.age
    document.getElementById("email").value = student.email
    document.getElementById("score").value = student.score


}

function updateStudent(){
var student = students.find(item => item.id === idUpdate)
    student.id = student.id
    student.name = document.getElementById("name").value
    student.age = document.getElementById("age").value
    student.email = document.getElementById("email").value
    student.score = document.getElementById("score").value
renderListStudent()
clear()
}


function searchStudent(){
conditions.keySearch = document.getElementById("search").value
console.log(conditions.keySearch)
renderListStudent()
getElementPage(1)

}

function sort(field,type){

    conditions.sort.field = field
    conditions.sort.type = type
    renderListStudent()

}


function renderNumberPage(total){
var totalPage = total/conditions.perPage
totalPage = Math.ceil(totalPage)
var list =""
for(let i=1; i<=totalPage;i++){
    list += `<li ${(i === conditions.currentPage ? 'style="color:red"' : "")} onclick="getElementPage(${i})">${i}</li></li>`
}
document.getElementById("numberPage").innerHTML=list

}


function getElementPage(i){
    conditions.currentPage = i
    renderListStudent()
}