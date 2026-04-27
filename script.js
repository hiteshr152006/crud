loadUsers();

function saveUser() {
    let id = document.getElementById("userId").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if(name === "" || email === ""){
        alert("Fill all fields");
        return;
    }

    let method = id ? "PUT" : "POST";
    let url = id ? "/users/" + id : "/users";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name, email})
    })
    .then(res => res.json())
    .then(() => {
        clearForm();
        loadUsers();
    });
}

function loadUsers(){
    fetch("/users")
    .then(res => res.json())
    .then(data => {

        let html = "";

        data.forEach(user => {
            html += `
                <div class="user-card">
                    <b>${user.name}</b><br>
                    ${user.email}

                    <div class="actions">
                        <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                </div>
            `;
        });

        document.getElementById("users").innerHTML = html;
    });
}

function editUser(id,name,email){
    document.getElementById("userId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
}

function deleteUser(id){
    fetch("/users/" + id,{
        method:"DELETE"
    })
    .then(res => res.json())
    .then(()=>{
        loadUsers();
    });
}

function clearForm(){
    document.getElementById("userId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}